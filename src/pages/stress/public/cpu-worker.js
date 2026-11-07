'use strict';
importScripts('/stress/cpu-kernels.js');
let kernel;
let kind;
// Known answers catch incorrect calculations, rather than just counting loops.
const EXPECTED = { integer: 3454037081, float: 1.3295804189183849, memory: 3833200640 };
function valid(value) {
  return kind === 'float' ? Math.abs(value - EXPECTED[kind]) < 1e-10 : value === EXPECTED[kind];
}
self.onmessage = ({ data }) => {
  try {
    if (data.type === 'prepare') {
      kind = data.kind;
      kernel = StressKernels.createKernel(kind);
      const warmupEnd = performance.now() + 150;
      let check;
      do { check = kernel.run(); } while (performance.now() < warmupEnd);
      if (!valid(check)) throw new Error('CPU calculation check failed');
      self.postMessage({ type: 'ready' });
    } else if (data.type === 'start' && kernel) {
      const startAt = data.startAt - performance.timeOrigin;
      const duration = Math.min(180000, Math.max(100, Number(data.duration) || 100));
      setTimeout(() => {
        const start = performance.now();
        let last = start;
        let blocks = 0;
        let lastBlocks = 0;
        let errors = 0;
        let checksum;
        do {
          checksum = kernel.run();
          if (!valid(checksum)) errors++;
          blocks++;
          const now = performance.now();
          if (now - last >= 500) {
            self.postMessage({ type: 'sample', rate: (blocks - lastBlocks) * kernel.units * 1000 / (now - last),
              elapsed: now - start });
            last = now; lastBlocks = blocks;
          }
        } while (performance.now() - start < duration);
        const elapsed = performance.now() - start;
        self.postMessage({ type: 'done', units: blocks * kernel.units, elapsed, errors, checksum,
          startedAt: performance.timeOrigin + start, endedAt: performance.timeOrigin + performance.now() });
      }, Math.max(0, startAt - performance.now()));
    }
  } catch (error) {
    self.postMessage({ type: 'error', message: error.message });
  }
};
