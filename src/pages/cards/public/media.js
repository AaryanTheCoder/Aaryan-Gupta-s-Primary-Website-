// The WebSocket exchanges connection details only. Audio/video goes directly
// between players; this server does not record or relay their media.
export class TableCall {
  constructor(send, notify) {
    this.send = send;
    this.notify = notify;
    this.local = typeof MediaStream !== 'undefined' ? new MediaStream() : null;
    this.peers = new Map();
    this.joined = false;
    this.players = [];
    this.selfId = null;
    this.roomId = null;
    this.generation = 0;
    this.busy = new Set();
    document
      .querySelector('#callJoin')
      .addEventListener('click', () => (this.joined ? this.stop(true) : this.join()));
    document.querySelector('#cameraButton').addEventListener('click', () => this.toggle('video'));
    document.querySelector('#micButton').addEventListener('click', () => this.toggle('audio'));
    document.querySelector('#soundButton').addEventListener('click', () => {
      for (const video of document.querySelectorAll('#callGrid video'))
        video.play().catch(() => {});
    });
  }

  publish() {
    this.send({
      type: 'media',
      joined: this.joined,
      camera: !!this.local?.getVideoTracks().length,
      microphone: !!this.local?.getAudioTracks().length
    });
    this.render();
  }

  join() {
    if (!window.RTCPeerConnection || !this.local) {
      this.notify('Your browser does not support calls. You can still play.');
      return;
    }
    this.joined = true;
    this.publish();
    this.syncPeers();
  }

  async toggle(kind) {
    if (!this.joined || this.busy.has(kind)) return;
    const oldTrack = this.local.getTracks().find((track) => track.kind === kind);
    if (oldTrack) {
      oldTrack.stop();
      this.local.removeTrack(oldTrack);
      await this.replaceTrack(kind, null);
      this.publish();
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      this.notify('Camera/mic requires HTTPS and browser permission.');
      return;
    }
    const generation = this.generation;
    this.busy.add(kind);
    this.render();
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        kind === 'video'
          ? {
              video: {
                width: { ideal: 480 },
                height: { ideal: 270 },
                frameRate: { ideal: 15, max: 20 }
              },
              audio: false
            }
          : { video: false, audio: { echoCancellation: true, noiseSuppression: true } }
      );
      if (!this.joined || generation !== this.generation) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      const track = stream.getTracks()[0];
      this.local.addTrack(track);
      track.onended = () => {
        this.local.removeTrack(track);
        this.replaceTrack(kind, null).catch(() => {});
        if (this.joined) this.publish();
      };
      await this.replaceTrack(kind, track);
      this.publish();
    } catch {
      this.notify(
        'Could not open that camera or microphone. Check browser permission and try again.'
      );
    } finally {
      this.busy.delete(kind);
      this.render();
    }
  }

  async replaceTrack(kind, track) {
    await Promise.all(
      [...this.peers.values()].map((peer) => {
        const transceiver = peer.pc.getTransceivers().find((t) => t.receiver.track.kind === kind);
        return transceiver?.sender.replaceTrack(track).catch(() => {
          peer.state = 'Reconnect the call to share this device';
        });
      })
    );
  }

  sync(room, selfId) {
    if (this.roomId !== room?.id) {
      this.stop(false);
      this.roomId = room?.id || null;
    }
    this.selfId = selfId;
    this.players = room?.players || [];
    this.syncPeers();
    this.render();
  }

  syncPeers() {
    const allowed = new Set(
      this.joined
        ? this.players
            .filter((p) => p.id !== this.selfId && p.connected && p.media.joined)
            .map((p) => p.id)
        : []
    );
    for (const [id, peer] of this.peers)
      if (!allowed.has(id)) {
        peer.pc.close();
        this.peers.delete(id);
      }
    for (const id of allowed) if (!this.peers.has(id)) this.createPeer(id);
  }

  createPeer(id) {
    const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
    const peer = {
      pc,
      stream: new MediaStream(),
      makingOffer: false,
      settingAnswer: false,
      ignoreOffer: false,
      candidates: [],
      queue: Promise.resolve(),
      state: 'Connecting…'
    };
    this.peers.set(id, peer);
    pc.onnegotiationneeded = async () => {
      try {
        peer.makingOffer = true;
        await pc.setLocalDescription();
        this.send({
          type: 'signal',
          to: id,
          signal: { description: pc.localDescription.toJSON() }
        });
      } catch {
        peer.state = 'Could not connect';
        this.render();
      } finally {
        peer.makingOffer = false;
      }
    };
    pc.onicecandidate = ({ candidate }) => {
      if (candidate)
        this.send({ type: 'signal', to: id, signal: { candidate: candidate.toJSON() } });
    };
    pc.ontrack = ({ track }) => {
      peer.stream.addTrack(track);
      track.onunmute = () => this.render();
      this.render();
    };
    pc.onconnectionstatechange = () => {
      peer.state =
        {
          connected: 'Connected',
          connecting: 'Connecting…',
          disconnected: 'Connection interrupted',
          failed: 'Network blocked · rejoin to retry'
        }[pc.connectionState] || 'Connecting…';
      this.render();
    };
    for (const kind of ['audio', 'video']) {
      const track = this.local.getTracks().find((t) => t.kind === kind);
      pc.addTransceiver(track || kind, { direction: 'sendrecv', streams: [this.local] });
    }
    return peer;
  }

  signal(from, signal) {
    if (!this.joined || !this.players.some((p) => p.id === from && p.media.joined && p.connected))
      return;
    const peer = this.peers.get(from) || this.createPeer(from);
    // Serialize incoming messages so a candidate never races its description.
    peer.queue = peer.queue
      .then(async () => {
        const { pc } = peer;
        if (pc.signalingState === 'closed') return;
        if (signal.description) {
          const description = signal.description;
          const ready = !peer.makingOffer && (pc.signalingState === 'stable' || peer.settingAnswer);
          const collision = description.type === 'offer' && !ready;
          peer.ignoreOffer = this.selfId < from && collision;
          if (peer.ignoreOffer) return;
          peer.settingAnswer = description.type === 'answer';
          try {
            await pc.setRemoteDescription(description);
          } finally {
            peer.settingAnswer = false;
          }
          for (const candidate of peer.candidates.splice(0)) await pc.addIceCandidate(candidate);
          if (description.type === 'offer') {
            await pc.setLocalDescription();
            this.send({
              type: 'signal',
              to: from,
              signal: { description: pc.localDescription.toJSON() }
            });
          }
        } else if (signal.candidate && !peer.ignoreOffer) {
          if (pc.remoteDescription) await pc.addIceCandidate(signal.candidate);
          else peer.candidates.push(signal.candidate);
        }
      })
      .catch(() => {
        peer.state = 'Could not connect · you can keep playing';
        this.render();
      });
  }

  stop(publish = false) {
    this.generation++;
    this.joined = false;
    this.local?.getTracks().forEach((track) => {
      track.stop();
      this.local.removeTrack(track);
    });
    for (const peer of this.peers.values()) peer.pc.close();
    this.peers.clear();
    if (publish) this.publish();
    this.render();
  }

  render() {
    const camera = !!this.local?.getVideoTracks().length;
    const microphone = !!this.local?.getAudioTracks().length;
    document.querySelector('#callJoin').textContent = this.joined ? 'Leave call' : 'Join call';
    for (const [selector, enabled, kind, label] of [
      ['#cameraButton', camera, 'video', 'Camera'],
      ['#micButton', microphone, 'audio', 'Mic']
    ]) {
      const button = document.querySelector(selector);
      button.disabled = !this.joined || this.busy.has(kind);
      button.textContent = this.busy.has(kind)
        ? 'Requesting…'
        : `${label} ${enabled ? 'on' : 'off'}`;
      button.setAttribute('aria-pressed', String(enabled));
    }
    document.querySelector('#soundButton').hidden = !this.joined;
    document.querySelector('#callStatus').textContent = this.joined
      ? 'Calls connect directly. Restricted Wi-Fi may block them; the card game keeps working.'
      : 'Join the call to hear friends. Camera and microphone start off.';
    const grid = document.querySelector('#callGrid');
    grid.hidden = !this.joined;
    const participants = this.joined
      ? this.players.filter((p) => p.id === this.selfId || (p.media.joined && p.connected))
      : [];
    const keep = new Set(participants.map((p) => p.id));
    for (const tile of grid.children) if (!keep.has(tile.dataset.player)) tile.remove();
    for (const player of participants) {
      let tile = [...grid.children].find((el) => el.dataset.player === player.id);
      if (!tile) {
        tile = document.createElement('div');
        tile.className = 'call-tile';
        tile.dataset.player = player.id;
        const placeholder = document.createElement('span');
        placeholder.className = 'call-placeholder';
        const video = document.createElement('video');
        video.autoplay = true;
        video.playsInline = true;
        const caption = document.createElement('p');
        tile.append(placeholder, video, caption);
        grid.append(tile);
      }
      const self = player.id === this.selfId;
      const stream = self ? this.local : this.peers.get(player.id)?.stream;
      const video = tile.querySelector('video');
      video.muted = self;
      video.classList.toggle('self', self);
      if (video.srcObject !== stream) {
        video.srcObject = stream || null;
        video.play().catch(() => {});
      }
      // Keep remote audio playing even when its video is visually hidden.
      const showingVideo = self ? camera : player.media.camera;
      video.hidden = !showingVideo;
      tile.querySelector('.call-placeholder').hidden = showingVideo;
      tile.querySelector('.call-placeholder').textContent = player.name[0].toUpperCase();
      const state = self
        ? microphone
          ? 'Mic on'
          : 'Mic off'
        : this.peers.get(player.id)?.state || 'Connecting…';
      tile.querySelector('p').textContent = `${player.name}${self ? ' (you)' : ''} · ${state}`;
    }
  }
}
