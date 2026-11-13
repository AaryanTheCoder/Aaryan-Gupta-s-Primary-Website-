# Local voice assets

The voice mode recognises a short list of card ranks on the player's device.
It uses no API key and uploads no recordings to a speech service.

## Sources and licences

- Runtime: [vosk-browser 0.0.8](https://registry.npmjs.org/vosk-browser/-/vosk-browser-0.0.8.tgz),
  by Ciaran O'Reilly, Apache 2.0. The checked-in `COPYING` and `NOTICE` include
  upstream and third-party notices.
- Model: [Alpha Cephei's vosk-model-small-en-us-0.15](https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip),
  Apache 2.0. Original ZIP SHA-256:
  `30f26242c4eb449f948e42cb302dd7a686cb29a3423a8367f99ff41780942498`.
- `public/voice-assets/manifest.json` records the shipped file hashes. The real
  worker test verifies them before loading the model.

## Packaging changes

The official ZIP's model files are unchanged. They are packaged in the
`.tar.gz` format required by the browser library, under one `model/` directory.
The tar contains explicit directories with mode `0755` and files with mode
`0644`. Missing directory entries can make the WASM extractor create folders
without read permissions, which breaks its persistent cache.

The runtime's embedded worker was extracted into a same-origin JavaScript file.
Its worker factory points to `/cards/voice-assets/vosk-worker-0.0.8.js`.
The worker's `createNamedFunction` wrapper uses an ordinary computed-name
function instead of `new Function`. This preserves the wrapper's behavior
without allowing arbitrary JavaScript evaluation. The worker permits WASM
compilation in its own response policy; the page's script policy stays strict.
There is no blob-worker allowance or site-wide policy change.

The assets have versioned filenames and immutable caching. Change filenames
and model URLs when replacing their contents in a future release. The browser
runtime also caches the extracted model in IndexedDB.

The root `.gitattributes` keeps model archives binary and fixes voice JavaScript
to LF line endings. The checksum manifest uses those canonical bytes, so Git's
automatic line-ending conversion cannot break verification on another machine.

## Testing

`node tests/cardsVoiceRuntime.test.js` runs the actual shipped WASM worker,
archive extraction, model, and constrained grammar with an in-memory IndexedDB.
It verifies that silence is not a rank. `tests/cardsUi.test.js` tests popup and
device lifecycles using simulated devices.

An optional 16 kHz mono PCM16 WAV sample can be tested with:

```sh
CARDS_VOICE_SAMPLE=/absolute/path/ace.wav CARDS_EXPECT_RANK=1 node tests/cardsVoiceRuntime.test.js
```

Synthetic Ace and Queen samples were checked during implementation. Real
browser microphone, permission, network-call, and phone layout checks require
actual browser/device access.
