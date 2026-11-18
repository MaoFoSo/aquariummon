# 🐟 AquariumMon – Bodensee-Abenteuer

Ein Browser-RPG rund um den Bodensee (auf Deutsch): Aquariummon fangen, angeln, tauchen, Arena-Bosse besiegen – von Konstanz bis Bregenz. Eine einzige HTML-Datei, kein Build nötig.

| | |
|---|---|
| ▶ **Spielen (neueste Version)** | https://maofoso.github.io/aquariummon/ |
| 🗂️ **Alle Versionen spielen** | https://maofoso.github.io/aquariummon/versions/ |
| 📜 **Was ist neu?** | [CHANGELOG.md](CHANGELOG.md) |
| 📦 **Originaldateien** | [Releases](https://github.com/MaoFoSo/aquariummon/releases) – je Version eine HTML-Datei |

## Wie die tägliche Weiterentwicklung abläuft

Jeden Morgen kommt **ein** neues Feature dazu, jede Woche zusätzlich ein neues Aquariummon:

```
feature/v17-2026-11-19  ──PR──▶  main  ──▶  GitHub Pages (sofort spielbar)
                                   └──▶  Release + Tag v17 (Originaldatei)
```

1. Neuer Branch `feature/vN-JJJJ-MM-TT` von `main`.
2. Feature in `index.html` einbauen, `GAME_VERSION` und den CHANGELOG-Kommentar im Skript hochzählen, Abschnitt in `CHANGELOG.md` ergänzen.
3. `node scripts/check.mjs` (Syntax + Versionsnummern) und `node scripts/archive.mjs` (spielbare Kopie unter `versions/vN/`, Übersicht neu).
4. Pull Request mit Beschreibung des Features → nach grüner Prüfung in `main` gemergt.
5. GitHub Actions legt Tag `vN` und ein Release mit `aquariummon_vN_JJJJ-MM-TT.html` an.

**Warum so?** `main` ist immer der spielbare Stand (GitHub Pages zeigt ihn). Jeder Tag hat einen eigenen Branch und Pull Request – dort sieht man genau, was sich geändert hat. Tags/Releases sichern jede Version dauerhaft, und `versions/` macht sie direkt im Browser spielbar.

## Gesichert ist jeder Stand dreifach

- **Git-Historie + Tag `vN`** – der exakte Code jedes Tages (`git checkout v12`).
- **Release-Datei** – die Originaldatei zum Herunterladen.
- **`versions/vN/`** – sofort spielbar. Diese Kopien nutzen einen eigenen Spielstand (`aquamon_save_vN`), damit das Ausprobieren alter Versionen den Hauptspielstand (`aquamon_save`) nicht überschreibt.

## Alte Versionen nachtragen

Die Versionen v1–v15 wurden nur als Artefakt veröffentlicht. Wer die verschickten Dateien noch hat:

```bash
mkdir -p versions/v7 && cp ~/Downloads/aquariummon_v7_2026-11-09.html versions/v7/index.html
sed -i 's/"aquamon_save"/"aquamon_save_v7"/g' versions/v7/index.html
```

Danach `node scripts/archive.mjs` ausführen (baut die Übersicht neu) und committen.

## Projektaufbau

```
index.html               das Spiel (neueste Version)
vendor/                  Schrift, React, three.js (lokal, damit keine fremden Server geladen werden)
vendor/licenses/         Lizenzen dieser Bibliotheken (MIT bzw. SIL OFL)
versions/vN/index.html   spielbare Archivkopien, versions/index.html = Übersicht
CHANGELOG.md             alle Features pro Version
scripts/check.mjs        Prüfung vor jeder Veröffentlichung
scripts/archive.mjs      Archivkopie + Übersicht erzeugen
```

## Datenschutz & Lizenzen

Das Spiel lädt nichts von fremden Servern: Schrift (Press Start 2P, SIL Open Font License), React 18 (MIT), three.js r128 (MIT) und für v0 Babel Standalone (MIT) liegen unter `vendor/`, die Lizenztexte unter `vendor/licenses/`. Der Spielstand wird nur im eigenen Browser gespeichert (localStorage). `scripts/check.mjs` und der Browser-Test schlagen fehl, sobald eine externe Ressource auftaucht.

AquariumMon ist ein privates, nicht-kommerzielles Fan-Projekt. Orte und Wahrzeichen sind dem echten Bodensee nachempfunden; Figuren, Namen und Grafiken sind eigene Erfindungen.
