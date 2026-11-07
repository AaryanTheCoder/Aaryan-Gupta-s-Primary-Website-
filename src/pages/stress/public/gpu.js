'use strict';
(function () {
  const WIDTH = 1280;
  const HEIGHT = 720;
  const vertex = `#version 300 es
    void main() {
      vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
      gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
    }`;
  const fragment = `#version 300 es
    precision highp float;
    uniform float uTime;
    uniform int uMode;
    uniform sampler2D uTexture;
    out vec4 color;
    float scene(vec3 p) {
      float a = uTime * 0.25;
      p.xz = mat2(cos(a), -sin(a), sin(a), cos(a)) * p.xz;
      p.xy = mat2(0.8, -0.6, 0.6, 0.8) * p.xy;
      vec2 q = vec2(length(p.xz) - 0.85, p.y);
      return length(q) - 0.28 + 0.035 * sin(p.x * 18.0) * sin(p.z * 18.0);
    }
    void main() {
      vec2 uv = (gl_FragCoord.xy - vec2(640.0, 360.0)) / 720.0;
      if (uMode == 1) {
        vec3 sum = vec3(0.0);
        vec2 p = gl_FragCoord.xy / vec2(1280.0, 720.0);
        for (int i = 0; i < 32; i++) {
          p = fract(p * 1.013 + vec2(0.037, 0.071) + sum.xy * 0.003);
          sum += texture(uTexture, p + uTime * 0.001).rgb;
        }
        color = vec4(sum / 32.0, 1.0);
        return;
      }
      vec3 ray = normalize(vec3(uv, -1.25));
      float t = 0.0;
      float glow = 0.0;
      for (int i = 0; i < 64; i++) {
        vec3 p = vec3(0.0, 0.0, 3.0) + ray * t;
        float d = abs(scene(p));
        glow += exp(-d * 30.0) * 0.025;
        t += clamp(d, 0.004, 0.20);
      }
      vec3 ink = vec3(0.015, 0.025, 0.04);
      color = vec4(ink + glow * vec3(0.24, 0.95, 0.69), 1.0);
    }`;

  class GPU {
    constructor(canvas) {
      this.canvas = canvas;
      canvas.width = WIDTH; canvas.height = HEIGHT;
      const gl = canvas.getContext('webgl2', { antialias: false, depth: false, stencil: false,
        alpha: false, preserveDrawingBuffer: true, powerPreference: 'high-performance', failIfMajorPerformanceCaveat: true });
      if (!gl) throw new Error('WebGL2 hardware acceleration is unavailable. Enable graphics acceleration in Chromium and check chrome://gpu. CPU tests still work.');
      this.gl = gl;
      this.shaders = [];
      this.program = gl.createProgram();
      try {
        for (const [type, source] of [[gl.VERTEX_SHADER, vertex], [gl.FRAGMENT_SHADER, fragment]]) {
          const shader = gl.createShader(type);
          this.shaders.push(shader);
          gl.shaderSource(shader, source); gl.compileShader(shader);
          if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('GPU shader compilation failed.');
          gl.attachShader(this.program, shader);
        }
        gl.linkProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) throw new Error('GPU shader linking failed.');
        gl.useProgram(this.program);
        this.time = gl.getUniformLocation(this.program, 'uTime');
        this.mode = gl.getUniformLocation(this.program, 'uMode');
        this.vao = gl.createVertexArray(); gl.bindVertexArray(this.vao);
        this.texture = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, this.texture);
        const pixels = new Uint8Array(512 * 512 * 4);
        for (let i = 0; i < pixels.length; i++) pixels[i] = (Math.imul(i + 7, 1664525) >>> 16) & 255;
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 512, 512, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.viewport(0, 0, WIDTH, HEIGHT);
        this.timer = gl.getExtension('EXT_disjoint_timer_query_webgl2');
        const debug = gl.getExtension('WEBGL_debug_renderer_info');
        this.renderer = debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
        if (/swiftshader|llvmpipe|softpipe|software rasterizer/i.test(this.renderer)) throw new Error('A software renderer was detected. Enable hardware graphics acceleration for a GPU score.');
      } catch (error) { this.dispose(); throw error; }
    }

    async run(kind, duration, signal, onSample, onWarmup) {
      const gl = this.gl;
      const ext = this.timer;
      const frameTimes = [];
      const gpuTimes = [];
      const samples = [];
      let pendingQueries = [];
      let discardedTimers = 0;
      let frames = 0;
      let lastFrames = 0;
      let start = null;
      let last = 0;
      const warmupEnd = performance.now() + 500;
      const check = () => {
        signal.throwIfAborted();
        if (gl.isContextLost()) throw new Error('GPU context lost. This run is incomplete; no final score was saved.');
      };
      try {
        gl.uniform1i(this.mode, kind === 'texture' ? 1 : 0);
        while (start === null || performance.now() - start < duration) {
          check();
          const frameStart = performance.now();
          const measuring = frameStart >= warmupEnd;
          if (measuring && start === null) { start = frameStart; last = start; onWarmup(); }
          if (ext && gl.getParameter(ext.GPU_DISJOINT_EXT)) {
            discardedTimers += pendingQueries.length;
            pendingQueries.forEach(q => gl.deleteQuery(q)); pendingQueries = [];
          }
          for (let i = pendingQueries.length - 1; i >= 0; i--) {
            const q = pendingQueries[i];
            if (gl.getQueryParameter(q, gl.QUERY_RESULT_AVAILABLE)) {
              const ms = gl.getQueryParameter(q, gl.QUERY_RESULT) / 1e6;
              if (Number.isFinite(ms) && ms > 0) gpuTimes.push(ms);
              gl.deleteQuery(q); pendingQueries.splice(i, 1);
            }
          }
          const query = ext && measuring && pendingQueries.length < 16 ? gl.createQuery() : null;
          if (query) gl.beginQuery(ext.TIME_ELAPSED_EXT, query);
          gl.uniform1f(this.time, frameStart / 1000);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
          if (query) { gl.endQuery(ext.TIME_ELAPSED_EXT); pendingQueries.push(query); }
          const fence = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
          if (!fence) throw new Error('Could not synchronize GPU work.');
          gl.flush();
          // Poll a fence instead of blocking the UI with gl.finish(). At most one frame is queued.
          try {
            const waitStart = performance.now();
            while (true) {
              await new Promise(resolve => setTimeout(resolve, 0));
              check();
              const status = gl.clientWaitSync(fence, 0, 0);
              if (status === gl.WAIT_FAILED) throw new Error('GPU synchronization failed.');
              if (status !== gl.TIMEOUT_EXPIRED) break;
              if (performance.now() - waitStart > 5000) throw new Error('GPU frame timed out.');
            }
          } finally { gl.deleteSync(fence); }
          if (gl.getError() !== gl.NO_ERROR) throw new Error('A WebGL error occurred; result discarded.');
          const now = performance.now();
          if (measuring) {
            frames++; frameTimes.push(now - frameStart);
            if (now - last >= 500) {
              const rate = (frames - lastFrames) * WIDTH * HEIGHT / (now - last) / 1000;
              samples.push({ elapsed: now - start, rate });
              onSample(rate); last = now; lastFrames = frames;
            }
          }
        }
        const elapsed = performance.now() - start;
        if (!frames || !Number.isFinite(elapsed)) throw new Error('No completed GPU frames.');
        // Confirm that rendering produced output. This is a liveness check, not a GPU artifact test.
        const pixel = new Uint8Array(4);
        gl.readPixels(640, 360, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
        if (gl.getError() !== gl.NO_ERROR || pixel[3] !== 255) throw new Error('GPU output check failed.');
        return { kind, rate: frames * WIDTH * HEIGHT / elapsed / 1000, frames, elapsed,
          frameTimes, gpuTimes, discardedTimers, samples, outputCheck: 'Center pixel readable; not an artifact detector',
          resolution: [WIDTH, HEIGHT], timing: 'Completed frames / wall time (includes browser and fence polling overhead)' };
      } finally { pendingQueries.forEach(q => gl.deleteQuery(q)); }
    }

    dispose() {
      const gl = this.gl;
      if (!gl) return;
      if (this.texture) gl.deleteTexture(this.texture);
      if (this.vao) gl.deleteVertexArray(this.vao);
      if (this.program) gl.deleteProgram(this.program);
      this.shaders.forEach(s => gl.deleteShader(s));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    }
  }
  window.StressGPU = GPU;
})();
