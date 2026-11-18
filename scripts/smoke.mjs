#!/usr/bin/env node
// Startet das Spiel in einem echten Browser (Playwright/Chromium) und prüft,
// dass der Titelbildschirm ohne Fehler erscheint.
// Aufruf: node scripts/smoke.mjs [datei.html] [screenshot.png]
import { resolve, join } from "node:path";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  console.log("⚠ Playwright nicht installiert – Browser-Test übersprungen.");
  process.exit(0);
}

// Bibliotheken von cdnjs werden aus denselben Versionen auf npm bedient,
// damit der Test auch ohne Zugriff auf cdnjs funktioniert (z. B. in Cloud-Umgebungen).
const CDN = {
  "react/18.2.0/umd/react.production.min.js": ["react@18.2.0", "umd/react.production.min.js"],
  "react-dom/18.2.0/umd/react-dom.production.min.js": ["react-dom@18.2.0", "umd/react-dom.production.min.js"],
  "three.js/r128/three.min.js": ["three@0.128.0", "build/three.min.js"],
};
const cacheDir = join(tmpdir(), "aqm-cdn-cache");
function fromNpm(spec, path) {
  const dir = join(cacheDir, spec);
  const f = join(dir, "package", path);
  if (!existsSync(f)) {
    mkdirSync(dir, { recursive: true });
    const tgz = execFileSync("npm", ["pack", spec, "--silent", "--pack-destination", dir], { encoding: "utf8" }).trim().split("\n").pop();
    execFileSync("tar", ["-xzf", join(dir, tgz), "-C", dir]);
  }
  return readFileSync(f);
}

const file = resolve(process.argv[2] || "index.html");
const shot = process.argv[3];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 600 } });
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(e.message));
await page.route("https://cdnjs.cloudflare.com/ajax/libs/**", async (route) => {
  const key = route.request().url().split("/ajax/libs/")[1];
  if (!CDN[key]) return route.continue();
  try {
    await route.fulfill({ body: fromNpm(...CDN[key]), contentType: "application/javascript" });
  } catch {
    await route.continue();
  }
});
await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.abort());

await page.goto(pathToFileURL(file).href, { waitUntil: "load", timeout: 60000 });
await page.waitForTimeout(2500);

const state = await page.evaluate(() => ({
  err: (() => {
    const e = document.getElementById("err");
    return e && getComputedStyle(e).display !== "none" ? e.textContent : "";
  })(),
  rendered: (document.getElementById("root")?.childElementCount || 0) > 0,
  react: typeof window.React !== "undefined",
  text: document.body.innerText.slice(0, 200),
}));
if (shot) await page.screenshot({ path: shot });
await browser.close();

const problems = [];
if (!state.react) problems.push("React wurde nicht geladen (CDN erreichbar?)");
if (state.err) problems.push("Fehleranzeige: " + state.err);
if (!state.rendered) problems.push("#root ist leer – das Spiel wurde nicht gerendert");
problems.push(...pageErrors.map((m) => "JS-Fehler: " + m));

if (problems.length) {
  console.error("✗ Browser-Test fehlgeschlagen:\n- " + problems.join("\n- "));
  process.exit(1);
}
console.log("✓ Browser-Test ok – Titelbildschirm erscheint: " + JSON.stringify(state.text.replace(/\s+/g, " ").slice(0, 80)));
