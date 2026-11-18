#!/usr/bin/env node
// Sichert den aktuellen Stand von index.html als spielbare Kopie unter versions/<vN>/
// und baut die Versionsübersicht versions/index.html aus CHANGELOG.md neu.
// Aufruf: node scripts/archive.mjs
//
// Archivkopien bekommen einen eigenen Spielstand-Schlüssel (aquamon_save_<vN>),
// damit das Ausprobieren einer alten Version nie den aktuellen Spielstand überschreibt.
// Der unveränderte Originalstand liegt in der Git-Historie (Tag vN) und als Release-Datei.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const ver = (html.match(/const\s+GAME_VERSION\s*=\s*"(v\d+)"/) || [])[1];
if (!ver) throw new Error("GAME_VERSION nicht gefunden");

mkdirSync(`versions/${ver}`, { recursive: true });
const archived = html.replaceAll('"aquamon_save"', `"aquamon_save_${ver}"`);
writeFileSync(`versions/${ver}/index.html`, archived);
console.log(`✓ versions/${ver}/index.html gesichert`);

// Übersicht aus CHANGELOG.md: Überschriften "## vN · JJJJ-MM-TT · Titel"
const md = existsSync("CHANGELOG.md") ? readFileSync("CHANGELOG.md", "utf8") : "";
const info = {};
for (const m of md.matchAll(/^## (v\d+) · (\S+) · (.+)$/gm)) info[m[1]] = { date: m[2], title: m[3] };

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const dirs = readdirSync("versions", { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^v\d+$/.test(d.name) && existsSync(`versions/${d.name}/index.html`))
  .map((d) => d.name)
  .sort((a, b) => Number(b.slice(1)) - Number(a.slice(1)));

const rows = dirs
  .map((v) => {
    const i = info[v] || {};
    return `<li><a href="${v}/"><b>${v}</b></a><span class="d">${esc(i.date || "")}</span><span class="t">${esc(i.title || "")}</span></li>`;
  })
  .join("\n");

writeFileSync(
  "versions/index.html",
  `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AquariumMon – Versionen</title>
<style>
:root{--bg:#020c18;--fg:#e2e8f0;--mut:#94a3b8;--acc:#38bdf8;--line:#0e2a44}
body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.5 system-ui,-apple-system,sans-serif}
main{max-width:760px;margin:0 auto;padding:24px 16px 48px}
h1{font-size:22px;margin:0 0 4px}
p{color:var(--mut);margin:0 0 20px}
a{color:var(--acc)}
ul{list-style:none;padding:0;margin:0;border-top:1px solid var(--line)}
li{display:grid;grid-template-columns:56px 100px 1fr;gap:8px;padding:10px 4px;border-bottom:1px solid var(--line)}
.d{color:var(--mut);font-variant-numeric:tabular-nums}
@media (max-width:520px){li{grid-template-columns:48px 1fr}.t{grid-column:1/-1}}
</style>
</head>
<body>
<main>
<h1>🐟 AquariumMon – alle Versionen</h1>
<p><a href="../">▶ Neueste Version spielen</a> · <a href="https://github.com/MaoFoSo/aquariummon/blob/main/CHANGELOG.md">Changelog</a><br>
Archivversionen haben jeweils einen eigenen Spielstand, dein Hauptspielstand bleibt unberührt.</p>
<ul>
${rows}
</ul>
</main>
</body>
</html>
`
);
console.log(`✓ versions/index.html mit ${dirs.length} Versionen erzeugt`);
