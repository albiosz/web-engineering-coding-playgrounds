

# 1. Integrate `npm` and a build management tool into your project.

## Quellen:
- [Vite - Getting Started](vite.dev/guide/)

## Schritte
1. Manual installation
   - `npm install -D vite`


## Erreicht
- man kann das Projekt bauen
  - `npm run build`
- man kann das Projekt "ausführen"
  - mit HotReload
  - `npm run dev`

## Gelernt
`package.json`
- `"type": "module"` - damit werden `imports` erlaubt
- `"private": true` - "npm will refuse to publish the package"



# 2. Configure your project to use Typescript as your primary development language and adapt the code and file extensions respectively.


## Fragen
- [ ] Wie soll ich TS verwenden mit requests von Quellen die keine TS types zur Verfügung stellen?

## Schritte
1. Typescript als `devDependency` in `package.json` in hinzugefügt
2. Ein `tsc` script in `package.json` hinzugefügt, damit ich die Fehler überprüfen kann
3. `*.js` Dateien in `*.ts` Dateien umbenannt
4. TypeScript-Typen in die alten `.js` Dateien hinzugefügt
  


## Aufgefallen
- [ ] Debugging ist mit einem Buildtool viel schwerer als ohne
  - .js Dateien, die ausgeführt werden, sind nicht diejenigen, die ich erstelle
