/* Fixed work per block: counts and checksums must stay fixed for v1 scores. */
(function (root) {
  'use strict';
  function createKernel(kind) {
    if (kind === 'integer') return {
      units: 32768,
      run() {
        let x = 123456789;
        for (let i = 0; i < 32768; i++) {
          x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
          x = Math.imul(x, 1664525) + 1013904223 | 0;
        }
        return x >>> 0;
      }
    };
    if (kind === 'float') return {
      units: 16384,
      run() {
        let x = .5;
        for (let i = 0; i < 16384; i++) x = Math.sqrt(x + 1.25) * .75 + .125;
        return x;
      }
    };
    if (kind === 'memory') {
      const source = new Uint32Array(262144);
      const target = new Uint32Array(source.length);
      for (let i = 0; i < source.length; i++) source[i] = Math.imul(i + 1, 2654435761) >>> 0;
      return {
        units: source.byteLength * 2, // One 1 MiB read and one 1 MiB write.
        run() {
          let sum = 0;
          for (let i = 0; i < source.length; i++) {
            target[i] = source[i] ^ 0x9e3779b9;
            sum = (sum + target[i]) >>> 0;
          }
          return sum;
        }
      };
    }
    throw new Error('Unknown CPU workload');
  }
  const api = { createKernel };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.StressKernels = api;
})(typeof globalThis === 'object' ? globalThis : this);
