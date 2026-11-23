# AquariumMon – Changelog

Jeden Tag kommt ein neues Feature dazu. Jede Version ist spielbar:

- **Neueste Version:** https://maofoso.github.io/aquariummon/
- **Alle Versionen:** https://maofoso.github.io/aquariummon/versions/
- **Originaldateien:** jede Version als Release `vN` mit der HTML-Datei zum Herunterladen

Format jeder Überschrift: `## vN · JJJJ-MM-TT · Titel` (wird von `scripts/archive.mjs` und `scripts/check.mjs` gelesen).

<!-- NEUE EINTRÄGE HIER OBEN EINFÜGEN -->

## v18 · 2026-11-23 · Angelrekorde

Jeder geangelte Fang bekommt jetzt eine Größe in Zentimetern. Wer fehlerfrei zieht (kein Fehlversuch), bekommt einen Größenbonus. Für jede Art wird der Rekord gespeichert: Das Fangergebnis zeigt ihn an und feiert jeden neuen Rekord, im 📖 Seebuch-Steckbrief steht der „Angelrekord“. Neuer Erfolg **„Rekordangler“** für Rekorde bei 6 verschiedenen Arten.

**So findest du es:** In einer Stadt angeln gehen; danach Menü → 📖 SEEBUCH → Eintrag antippen.

## v17 · 2026-11-18 · Seebuch & ohne fremde Server

Der Aquariumdex heißt jetzt **Seebuch** (📖 SEEBUCH im Menü, Erfolg „Seebuch-Meister“, Seebuch-Belohnungen). Das Zeppelin-Museum in Friedrichshafen heißt jetzt **Luftschiff-Museum**. Schrift, React und three.js liegen jetzt direkt im Spiel (`vendor/`): Beim Spielen werden keine Verbindungen mehr zu Google Fonts oder anderen fremden Servern aufgebaut. Bestehende Spielstände bleiben gültig.

**So findest du es:** Menü → 📖 SEEBUCH.

## v16 · 2026-11-18 · Fangbuch

Jeder Fang wird gezählt. Im 📖 DEX-Steckbrief steht „Gefangen: N×“ je Art, im DEX-Kopf die Gesamtzahl aller Fänge. Neuer Erfolg **„Serienfänger“** für 25 Fänge insgesamt.

**So findest du es:** Menü → 📖 DEX → Eintrag antippen.

## v15 · 2026-11-17 · Wahrzeichen-Wissen

Wer ein Wahrzeichen entdeckt, erfährt dazu einen Wissenshappen. Im 🗺️-Atlas steht der Steckbrief jedes entdeckten Wahrzeichens unter der jeweiligen Stadt.

**So findest du es:** In einer Stadt nah an ein Wahrzeichen laufen (z. B. Münster in Konstanz); danach Menü → 🗺️ Atlas.

## v14 · 2026-11-16 · Schillernde Aquariummon

Jedes wilde Aquariummon (Oberwelt, Angeln, Unterwasser) ist mit 1/16 Chance schillernd (✨, andere Farbe). Gefangene Schillernde behalten ihren Glanz im Team und in der Box, auch nach der Entwicklung. Zähler im 📖 DEX, neuer Erfolg **„Glückspilz“**.

**So findest du es:** Einfach fangen gehen – Schillernde erkennt man am ✨.

## v13 · 2026-11-15 · Tagesauftrag

Prof. Seestern gibt jeden Tag ein Ziel-Aquariummon vor. Wer es fängt (Kampf, Angeln, Unterwasser), bekommt 80 Perlen + 1 Profi-Köder. Neuer Erfolg **„Auftragsprofi“** für 5 erledigte Aufträge.

**So findest du es:** Menü → 🎒-Tab (Auftragskarte); Hinweis auch beim Tagesgeschenk.

## v12 · 2026-11-14 · Dex-Belohnungen

Meilensteine im Aquariumdex: Bei 4, 8, 12 und allen 16 gefangenen Arten gibt es automatisch Perlen und Items (Heiltränke, Supertrank, Beleber, Profi-Köder).

**So findest du es:** Menü → 📖 DEX zeigt die nächste Belohnung.

## v11 · 2026-11-13 · Tageszeit-Gäste

Je nach Tageszeit tauchen besondere Aquariummon auf: Morgenrot – Haubi, Abendrot – Läufi, Dämmerung – Zanderan, Nacht – Welsio. Sie erscheinen in der Oberwelt und beißen beim Angeln. Neuer Erfolg **„Zeitreisender“** für alle 4.

**So findest du es:** Zur passenden Uhrzeit spielen; Übersicht im 🗺️ Atlas und in den Dex-Fundorten.

## v10 · 2026-11-12 · Wetterbericht

Im 🗺️-Atlas zeigt eine Vorhersage das Wetter der nächsten 9 Stunden (3-Stunden-Blöcke). Neuer Erfolg **„Wetterfrosch“** für alle 6 Wetter-Gäste.

**So findest du es:** Menü → 🗺️ Atlas.

## v9 · 2026-11-11 · Dex-Steckbriefe

Im 📖 DEX einen Eintrag antippen: Steckbrief, Fundorte (Städte, Wetter, Unterwasser) und Wetter-Hinweis. Gefangene Arten zeigen die ganze Geschichte, nur gesichtete nur die Fundorte.

**So findest du es:** Menü → 📖 DEX → Eintrag antippen.

## v8 · 2026-11-10 · Tagesgeschenk mit Serie

Beim ersten Spielen pro Tag gibt es Perlen (steigend bis 7 Tage in Folge), alle 3 Tage einen Heiltrank, am 7. Tag einen Beleber. Neuer Erfolg **„Stammgast“**.

**So findest du es:** Erscheint automatisch beim ersten Start am Tag; Serie im 🎒-Tab.

## v7 · 2026-11-09 · Wetter-Gäste

Je nach Wetter tauchen besondere Aquariummon auf (Regen: Wurmli/Schnecki, Nebel: Krebsor/Aalwyn, Wolken: Möwix, Klar: Libella). Bei Regen und Nebel beißen sie auch beim Angeln, Regen vergrößert zusätzlich die Fangzone.

**So findest du es:** Oberwelt und Angeln; wer gerade unterwegs ist, steht im 🗺️ Atlas.

## v6 · 2026-11-08 · Wahrzeichen entdecken

Wer in den Städten nah an ein Wahrzeichen (Münster, Imperia, Leuchtturm, Mehlsack …) herangeht, entdeckt es: +25 Perlen, ✓ am Namensschild und im Atlas. Neuer Erfolg **„Weltenbummler“** für alle 10.

**So findest du es:** In den Städten zu den beschrifteten Gebäuden laufen.

## v5 · 2026-11-07 · Bodensee-Atlas

Neuer 🗺️-Tab im Menü: alle Orte mit Wahrzeichen, Boss-/Köder-Status und den dort lebenden Aquariummon (gesehen/gefangen).

**So findest du es:** Menü → 🗺️ Atlas.

## v4 · 2026-11-06 · Wettereffekt

Oberwelt und Städte zeigen wechselnde Bodensee-Wetterlagen (Klar, Wolken, Regen, Nebel), die sich alle 3 Stunden ändern. Anzeige unter der Tageszeit.

**So findest du es:** Oben links in der Oberwelt.

## v3 · 2026-11-05 · Tageszeit-Effekt

Oberwelt und Städte färben sich je nach Uhrzeit (Morgenrot, Tag, Abendrot, Dämmerung, Nacht), mit Anzeige oben links.

**So findest du es:** Oben links in der Oberwelt.

## v2 · 2026-11-04 · Erfolge

Erfolge-Tab (🏅) im Menü mit 14 Achievements und Freischalt-Hinweis; Versionsanzeige auf dem Titelbild.

**So findest du es:** Menü → 🏅 Erfolge.

## v1 · 2026-11-03 · Ausgangsversion

Grundspiel als Claude-Artefakt: Bodensee-Karte von Konstanz bis Bregenz, Ravensburg, Unterwasserwelt mit Tauchplatz, legendärer Walox, Rivale Yuri, Arena-Bosse mit Ködern, Angeln, Entwicklungen, Shop, Chiptune-Musik.

*Die Dateien von v1–v15 wurden damals nur als Artefakt veröffentlicht und sind hier noch nicht archiviert. Wer die täglich verschickten Dateien `aquariummon_vN_JJJJ-MM-TT.html` noch hat, kann sie unter `versions/vN/index.html` nachtragen (siehe README).*

## v0 · 2026-07-24 · Prototyp (Sommer)

Erste Fassung, im Juni/Juli 2026 von Hand hochgeladen (Uploads vom 28.06. bis 24.07.). Liegt spielbar unter `versions/v0/`.
