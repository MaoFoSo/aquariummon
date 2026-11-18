#!/usr/bin/env bash
# Holt den neuesten Stand von AquariumMon (Branch main) in das nginx-Verzeichnis.
# Beim ersten Lauf wird das Repo geklont, danach nur noch aktualisiert.
# Weil es ein vollständiger Git-Klon ist, liegt jeder frühere Stand auch lokal vor
# (git log / git checkout v12 …), zusätzlich zu den spielbaren Kopien unter versions/.
#
# Einstellungen per Umgebungsvariable:
#   AQM_DIR   Zielverzeichnis      (Standard: /var/www/aquariummon)
#   AQM_REPO  Repository-URL       (Standard: https://github.com/MaoFoSo/aquariummon.git)
#   AQM_REF   Branch               (Standard: main)
set -euo pipefail

DIR="${AQM_DIR:-/var/www/aquariummon}"
REPO="${AQM_REPO:-https://github.com/MaoFoSo/aquariummon.git}"
REF="${AQM_REF:-main}"

if [ ! -d "$DIR/.git" ]; then
  mkdir -p "$(dirname "$DIR")"
  git clone --branch "$REF" "$REPO" "$DIR"
fi

cd "$DIR"
OLD=$(git rev-parse HEAD)
git fetch --tags --prune origin "$REF"
git reset --hard "origin/$REF"
NEW=$(git rev-parse HEAD)

VER=$(grep -oE 'const GAME_VERSION = "v[0-9]+"' index.html | grep -oE 'v[0-9]+' || echo "?")
if [ "$OLD" != "$NEW" ]; then
  echo "$(date '+%F %T') AquariumMon aktualisiert auf $VER (${NEW:0:7})"
else
  echo "$(date '+%F %T') AquariumMon unverändert ($VER)"
fi
