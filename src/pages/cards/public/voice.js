import { parseRank, RANK_GRAMMAR, RANK_NAMES, canDropCards } from './ranks.mjs';

const $ = (selector) => document.querySelector(selector);
let runtimePromise;
function loadRuntime() {
  if (window.Vosk) return Promise.resolve(window.Vosk);
  if (!runtimePromise)
    runtimePromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '/cards/voice-assets/vosk-browser-0.0.8.js';
      script.onload = () => resolve(window.Vosk);
      script.onerror = () => {
        runtimePromise = null;
        script.remove();
        reject(new Error('Voice runtime unavailable.'));
      };
      document.head.append(script);
    });
  return runtimePromise;
}

export class VoiceDeclaration {
  constructor({ game, room, self, now, localStream, submit }) {
    Object.assign(this, { game, room, self, now, localStream, submit });
    this.model = null;
    this.roomId = null;
    this.loadPromise = null;
    this.pending = null;
    this.capture = 0;
    this.generation = 0;
    this.state = 'off';
    this.rank = null;
    $('#voiceRetry').addEventListener('click', () => this.listen());
    $('#voiceCancel').addEventListener('click', () => this.cancel());
    $('#voiceDialog').addEventListener('cancel', (event) => {
      event.preventDefault();
      this.cancel();
    });
    $('#voiceDialog').addEventListener('close', () => {
      this.pending = null;
      this.stopCapture();
    });
    $('#voiceRanks').addEventListener('click', (event) => {
      const button = event.target.closest('[data-rank]');
      if (button) this.recognised(Number(button.dataset.rank));
    });
    $('#voiceDeclare').addEventListener('click', () => {
      if (!this.valid() || !this.game().legalRanks.includes(this.rank)) {
        this.cancel();
        return;
      }
      const move = {
        type: 'move',
        action: 'play',
        cards: this.pending.ids.slice(),
        rank: this.rank,
        turnId: this.pending.turnId
      };
      this.cancel();
      this.submit(move);
    });
  }

  sync(room) {
    const id = room?.type === 'bluff' && room.settings.voiceMode ? room.id : null;
    if (id !== this.roomId) {
      this.dispose();
      this.roomId = id;
      if (id) this.preload();
    }
    this.validate();
  }

  async preload() {
    if (this.loadPromise) return this.loadPromise;
    const generation = this.generation;
    this.state = 'loading';
    this.updateStatus();
    this.loadPromise = (async () => {
      let model;
      try {
        const Vosk = await loadRuntime();
        if (generation !== this.generation) return null;
        model = new Vosk.Model('/cards/voice-assets/vosk-model-small-en-us-0.15.tar.gz', -2);
        this.model = model;
        await new Promise((resolve, reject) => {
          const timer = setTimeout(() => reject(new Error('Model loading timed out.')), 45000);
          this.loadTimer = timer;
          model.on('load', (result) => {
            clearTimeout(timer);
            result.result ? resolve() : reject(new Error('Model unavailable.'));
          });
          model.on('error', () => {
            clearTimeout(timer);
            reject(new Error('Model unavailable.'));
          });
        });
        if (generation !== this.generation) return null;
        this.state = 'ready';
        this.updateStatus();
        return model;
      } catch {
        if (generation === this.generation) {
          this.state = 'failed';
          this.model = null;
          model?.worker?.terminate();
          this.updateStatus();
        }
        return null;
      }
    })();
    return this.loadPromise;
  }

  updateStatus() {
    $('#voiceStatus').hidden = !this.roomId;
    $('#voiceStatus').textContent =
      {
        loading: 'Voice loading…',
        ready: 'Voice ready',
        failed: 'Voice unavailable · rank buttons ready'
      }[this.state] || '';
  }

  valid() {
    return (
      !!this.pending &&
      this.room()?.id === this.pending.roomId &&
      this.game()?.turnId === this.pending.turnId &&
      canDropCards(this.game(), this.self(), this.pending.ids, this.now())
    );
  }

  validate() {
    if (this.pending && !this.valid()) this.cancel();
  }

  open(ids) {
    if (!canDropCards(this.game(), this.self(), ids, this.now())) return;
    this.pending = { ids: ids.slice(), turnId: this.game().turnId, roomId: this.room().id };
    this.rank = null;
    $('#voiceTitle').textContent = `Declare ${ids.length} card${ids.length === 1 ? '' : 's'}`;
    $('#voiceRanks').replaceChildren(
      ...this.game().legalRanks.map((rank) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'secondary';
        button.dataset.rank = String(rank);
        button.textContent = RANK_NAMES[rank - 1];
        return button;
      })
    );
    if (!$('#voiceDialog').open) $('#voiceDialog').showModal();
    this.listen();
  }

  async listen() {
    if (!this.valid()) {
      this.cancel();
      return;
    }
    this.stopCapture();
    const capture = this.capture;
    this.rank = null;
    $('#voiceDeclare').disabled = true;
    $('#voiceRank').textContent = '';
    $('#voiceMessage').textContent =
      this.state === 'ready'
        ? 'Say one rank, such as Ace or King.'
        : 'Loading the voice model. You can choose a rank below.';
    $('#voiceManual').open = this.state !== 'ready';
    let temporary;
    try {
      if (this.state === 'failed') {
        this.loadPromise = null;
        this.preload();
      }
      const model = await this.preload();
      if (capture !== this.capture || !this.valid()) return;
      if (!model) throw new Error('Voice is unavailable. Choose a rank below.');
      if (
        !navigator.mediaDevices?.getUserMedia ||
        !(window.AudioContext || window.webkitAudioContext)
      )
        throw new Error('Microphone unavailable. Choose a rank below.');
      let stream = this.localStream();
      if (!stream?.getAudioTracks().some((track) => track.readyState !== 'ended')) {
        temporary = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 },
          video: false
        });
        stream = temporary;
      }
      if (capture !== this.capture || !this.valid()) {
        temporary?.getTracks().forEach((track) => track.stop());
        return;
      }
      this.temporary = temporary;
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const context = new AudioContextClass();
      this.context = context;
      await Promise.race([
        context.resume(),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error('Tap Try again to enable audio, or choose a rank below.')),
            1500
          )
        )
      ]);
      if (context.state !== 'running')
        throw new Error('Tap Try again to enable audio, or choose a rank below.');
      await context.audioWorklet.addModule('/cards/rank-audio-worklet.js');
      if (capture !== this.capture || !this.valid()) return;
      const recognizer = new model.KaldiRecognizer(
        context.sampleRate,
        JSON.stringify(RANK_GRAMMAR)
      );
      this.recognizer = recognizer;
      recognizer.setWords(true);
      recognizer.on('result', (message) => {
        if (capture !== this.capture || !this.valid()) return;
        const text = message.result?.text || '';
        if (!text.trim() && !this.finishing) return;
        const rank = parseRank(text, this.game().legalRanks);
        const words = message.result?.result || [];
        const confident = words.every((word) => Number.isFinite(word.conf) && word.conf >= 0.7);
        if (rank && confident) this.recognised(rank);
        else this.failed('No single allowed rank recognised. Try again, or choose below.');
      });
      recognizer.on('error', () => {
        if (capture === this.capture)
          this.failed('Voice failed. Try again, or choose a rank below.');
      });
      this.source = context.createMediaStreamSource(new MediaStream(stream.getAudioTracks()));
      this.processor = new AudioWorkletNode(context, 'rank-audio');
      this.processor.port.onmessage = (event) => {
        if (capture === this.capture && this.valid())
          recognizer.acceptWaveformFloat(event.data.samples, event.data.sampleRate);
      };
      this.silent = context.createGain();
      this.silent.gain.value = 0;
      this.source.connect(this.processor).connect(this.silent).connect(context.destination);
      $('#voiceMessage').textContent = 'Listening… Say one rank, such as Ace or King.';
      $('#voiceManual').open = false;
      this.listenTimer = setTimeout(
        () => {
          if (capture !== this.capture) return;
          this.finishing = true;
          try {
            recognizer.retrieveFinalResult();
          } catch {
            this.failed('Voice stopped. Try again, or choose a rank below.');
            return;
          }
          this.finishTimer = setTimeout(() => {
            if (capture === this.capture)
              this.failed('Nothing recognised. Try again, or choose below.');
          }, 1000);
        },
        Math.min(6000, Math.max(1, this.game().deadline - this.now()))
      );
    } catch (error) {
      temporary?.getTracks().forEach((track) => track.stop());
      if (capture === this.capture)
        this.failed(error.message || 'Voice unavailable. Choose a rank below.');
    }
  }

  recognised(rank) {
    if (!this.valid() || !this.game().legalRanks.includes(rank)) return;
    this.stopCapture();
    this.rank = rank;
    $('#voiceMessage').textContent = 'Check your declaration before playing.';
    $('#voiceRank').textContent = `Declare ${RANK_NAMES[rank - 1]}?`;
    $('#voiceDeclare').disabled = false;
  }

  failed(message) {
    this.stopCapture();
    $('#voiceMessage').textContent = message;
    $('#voiceManual').open = true;
  }

  stopCapture() {
    this.capture++;
    this.finishing = false;
    clearTimeout(this.listenTimer);
    clearTimeout(this.finishTimer);
    this.processor?.disconnect();
    if (this.processor) this.processor.port.onmessage = null;
    this.source?.disconnect();
    this.silent?.disconnect();
    this.context?.close().catch(() => {});
    this.temporary?.getTracks().forEach((track) => track.stop());
    try {
      this.recognizer?.remove();
    } catch {}
    this.processor =
      this.source =
      this.silent =
      this.context =
      this.temporary =
      this.recognizer =
        null;
  }

  cancel() {
    this.pending = null;
    this.stopCapture();
    if ($('#voiceDialog').open) $('#voiceDialog').close();
  }

  dispose() {
    this.generation++;
    this.cancel();
    clearTimeout(this.loadTimer);
    // The pinned browser runtime exposes its native worker. Terminating it
    // also releases WASM memory when a download has not finished yet.
    this.model?.worker?.terminate();
    this.model = this.loadPromise = null;
    this.roomId = null;
    this.state = 'off';
    this.updateStatus();
  }
}
