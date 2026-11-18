# 🐟 AquariumMon – Bodensee-Abenteuer

Ein Browser-RPG rund um den Bodensee (auf Deutsch): Aquariummon fangen, angeln, tauchen, Arena-Bosse besiegen – von Konstanz bis Bregenz. Eine einzige HTML-Datei, kein Build nötig.

| | |
|---|---|
| ▶ **Spielen (neueste Version)** | https://maofoso.github.io/aquariummon/ |
| 🗂️ **Alle Versionen spielen** | https://maofoso.github.io/aquariummon/versions/ |
| 📜 **Was ist neu?** | [CHANGELOG.md](CHANGELOG.md) |
| 📦 **Originaldateien** | [Releases](https://github.com/MaoFoSo/aquariummon/releases) – je Version eine HTML-Datei |

## Wie die tägliche Weiterentwicklung abläuft

Eine geplante Claude-Aufgabe („AquariumMon täglich“) baut jeden Morgen **ein** neues Feature ein:

```
feature/v17-2026-11-19  ──PR──▶  main  ──▶  GitHub Pages (sofort spielbar)
                                   │──▶  Release + Tag v17 (Originaldatei)
                                   └──▶  nginx zu Hause holt sich den Stand
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

## Lokaler Test auf nginx

Die Dateien liegen in [`deploy/nginx/`](deploy/nginx/). Auf dem Rechner mit nginx:

```bash
sudo install -m 755 deploy/nginx/aquariummon-update.sh /usr/local/bin/aquariummon-update.sh
sudo mkdir -p /var/www/aquariummon && sudo chown www-data: /var/www/aquariummon
sudo -u www-data /usr/local/bin/aquariummon-update.sh
sudo cp deploy/nginx/aquariummon.conf /etc/nginx/sites-available/aquariummon
sudo ln -s /etc/nginx/sites-available/aquariummon /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo cp deploy/nginx/aquariummon-update.{service,timer} /etc/systemd/system/
sudo systemctl daemon-reload && sudo systemctl enable --now aquariummon-update.timer
```

Danach holt sich der Server alle 30 Minuten (und um 06:55 Uhr) automatisch den neuesten Stand von `main`. Ohne systemd geht es auch per Cron:

```
*/30 * * * * /usr/local/bin/aquariummon-update.sh >> /var/log/aquariummon-update.log 2>&1
```

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
versions/vN/index.html   spielbare Archivkopien, versions/index.html = Übersicht
CHANGELOG.md             alle Features pro Version
scripts/check.mjs        Prüfung vor jeder Veröffentlichung
scripts/archive.mjs      Archivkopie + Übersicht erzeugen
deploy/nginx/            Update-Skript, nginx-Konfiguration, systemd-Timer
docs/daily-task.md       Anleitung der täglichen Claude-Aufgabe
```
