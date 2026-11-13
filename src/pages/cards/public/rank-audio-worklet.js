// Collect small microphone frames into a useful chunk. Outputs stay silent:
// sharing your microphone with friends remains the separate WebRTC job.
class RankAudio extends AudioWorkletProcessor {
  constructor() {
    super();
    this.buffer = new Float32Array(4096);
    this.used = 0;
  }
  process(inputs) {
    const channel = inputs[0]?.[0];
    if (channel)
      for (const sample of channel) {
        this.buffer[this.used++] = sample;
        if (this.used === this.buffer.length) {
          const samples = this.buffer;
          this.port.postMessage({ samples, sampleRate }, [samples.buffer]);
          this.buffer = new Float32Array(4096);
          this.used = 0;
        }
      }
    return true;
  }
}
registerProcessor('rank-audio', RankAudio);
