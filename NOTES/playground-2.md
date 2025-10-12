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
- .ts macht mich bewusster, was genau ich verwende

## Quellen

- [Node: nodeType property](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType)
- [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)
  - [Array.from()](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)

# 3. Use ESLint and Prettier inside your project

## Fragen
- [ ] Wie verwendet man die `eslint-config-love`?
  - Ich bekomme eine Reihe von Fehler "could not find plugin "n""
    - ich hab einen installiert, aber dann kommt ein anderer

## Schritte
1. eslint init
   - `npm init @eslint/config@latest`
2. Angezeigten Fehler korrigieren
   - ich hatte Probleme mit der Einstellung vom ESLint
3. prettier init
   - `npm install --save-dev --save-exact prettier`
4. `.prettierrc`


## Quellen
- [Getting Starteimage.pngd with ESLint](https://eslint.org/docs/latest/use/getting-started)
- [eslint-config-love](https://www.npmjs.com/package/eslint-config-love)
- [Prettier - Install](prettier.io/docs/install)


# 4. Keep your builds clear and add dependencies to the right build.
- alle Abhängigkeiten, die ich soweit hinzugefügt werden nur während Entwicklung gebraucht, deswegen befinden sich in `devDependencies` in `package.json`


# 5. Define the following tasks within npm scripts

## Gemacht
- `dev`
  - standardmäßige Einstellung
- `build`
  - minification - standardmäßig wird das Projekt vom vite minifiziert
  - obfuscation - es ist nicht "out-of-the-box", ich habe es nicht extra eingestellt
- `lint`
- `lint:fix`
- `format`
- `format:check`