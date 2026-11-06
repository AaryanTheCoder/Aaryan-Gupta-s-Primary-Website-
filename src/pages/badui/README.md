# Broken Thermometer at /badui

Start the website with `npm start`, then open `http://localhost:3000/badui`.
After deploying this checkout, open `/badui` on the website's HTTPS address.

The original challenge keeps its temperature generator, moving Convert button,
six arm presses, Peter shooter game, and repair puzzle. Its supplied image and
pose model are copied directly from AARYANGUPTAAAAAAAAAA.zip.

## How the changes work

- `src/server.js` sends requests beginning with `/badui` to `routes.js` and adds
  a homepage link. The site-wide AI widget is skipped on the challenge to keep
  the original page and game appearance.
- `routes.js` serves only the listed public files. A URL cannot be used to read
  arbitrary files from the computer.
- The HTML's `base` tells the browser to find relative files under `/badui/`,
  even when the address has no trailing slash.
- `BrokenThermometer.js` loads MediaPipe Tasks Vision 0.10.21 on demand from
  jsDelivr and reads the bundled pose model. It detects arm positions directly
  on the visitor's device instead of uploading JPEG frames to a Python server.
  The existing counter still checks the elbow angles and counts six presses.
- Cancelling stops camera tracks. An attempt number prevents a delayed camera
  permission response from restarting a cancelled attempt.
- The shooter lives at `/badui/shooter-game/` so it uses the supplied challenge
  version of the game. The existing website shooter route stays separate.

Camera access requires HTTPS or localhost and the visitor's permission. The
first camera use needs an internet connection to load MediaPipe and its WASM.

## Checks

`node tests/baduiRoutes.test.js` checks page routes, asset loading, HEAD requests,
the homepage link, missing files, and rejected write requests. It also runs in
`npm test`. Real camera tracking and the complete interactive challenge require
manual browser testing.

## Checkout recovery

This workspace was missing its server, package files, several route modules,
and assets before this change. Only missing website source/package files and
missing tests named by the test script were restored from the adjacent
`Aaryan-Gupta-s-Primary-Website-.zip` (October 21 backup). Existing files were
preserved. Git metadata was already incomplete and was not reconstructed.
