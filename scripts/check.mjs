#!/usr/bin/env node
// Prüft eine AquariumMon-HTML-Datei, bevor sie veröffentlicht wird:
//  1. Jedes Inline-<script> muss syntaktisch gültiges JavaScript sein (node --check).
//  2. GAME_VERSION muss gesetzt sein und im CHANGELOG-Kommentar als letzter Eintrag stehen.
//  3. (nur für index.html im Repo-Root) CHANGELOG.md muss einen Abschnitt für diese Version haben.
// Aufruf: node scripts/check.mjs [datei.html]   (Standard: index.html)
import { readFileSync, writeFileSync, mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const file = resolve(process.argv[2] || "index.html");
const html = readFileSync(file, "utf8");
const errors = [];

const scripts = [...html.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
  .filter((m) => !/\bsrc\s*=/.test(m[1] || ""))
  .map((m) => m[2]);
if (scripts.length === 0) errors.push("Kein Inline-Skript gefunden.");

const dir = mkdtempSync(join(tmpdir(), "aqm-check-"));
try {
  scripts.forEach((code, i) => {
    const f = join(dir, `script${i}.js`);
    writeFileSync(f, code);
    try {
      execFileSync(process.execPath, ["--check", f], { stdio: "pipe" });
    } catch (e) {
      errors.push(`Syntaxfehler in Skript ${i}:\n${String(e.stderr || e.message)}`);
    }
  });
} finally {
  rmSync(dir, { recursive: true, force: true });
}

const ver = (html.match(/const\s+GAME_VERSION\s*=\s*"(v\d+)"/) || [])[1];
if (!ver) errors.push("GAME_VERSION nicht gefunden.");

const log = (html.match(/\/\*\s*CHANGELOG([\s\S]*?)\*\//) || [])[1];
if (!log) errors.push("CHANGELOG-Kommentar nicht gefunden.");
const entries = log ? [...log.matchAll(/^\s*(v\d+)\s*·\s*(\d{4}-\d{2}-\d{2})/gm)] : [];
const last = entries[entries.length - 1];
if (ver && last && last[1] !== ver)
  errors.push(`GAME_VERSION ist ${ver}, letzter CHANGELOG-Eintrag aber ${last[1]}.`);

const root = resolve(".");
if (file === join(root, "index.html") && ver && existsSync("CHANGELOG.md")) {
  const md = readFileSync("CHANGELOG.md", "utf8");
  if (!new RegExp(`^## ${ver} · `, "m").test(md))
    errors.push(`CHANGELOG.md hat keinen Abschnitt "## ${ver} · …".`);
}

if (errors.length) {
  console.error(`✗ ${file}\n- ` + errors.join("\n- "));
  process.exit(1);
}
console.log(`✓ ${file}: ${scripts.length} Skript(e) ok, Version ${ver}${last ? " vom " + last[2] : ""}`);
