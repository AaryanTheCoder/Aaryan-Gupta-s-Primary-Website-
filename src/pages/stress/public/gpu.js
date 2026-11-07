'use strict';
(function () {
  const RESOLUTIONS = { compatibility: [320, 180], standard: [1280, 720], maximum: [1920, 1080] };
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
    uniform vec2 uResolution;
    out vec4 color;
    float scene(vec3 p) {
      float a = uTime * 0.25;
      p.xz = mat2(cos(a), -sin(a), sin(a), cos(a)) * p.xz;
      p.xy = mat2(0.8, -0.6, 0.6, 0.8) * p.xy;
      vec2 q = vec2(length(p.xz) - 0.85, p.y);
      return length(q) - 0.28 + 0.035 * sin(p.x * 18.0) * sin(p.z * 18.0);
    }
    void main() {
      vec2 uv = (gl_FragCoord.xy - uResolution * 0.5) / uResolution.y;
      if (uMode == 1) {
        vec3 sum = vec3(0.0);
        vec2 p = gl_FragCoord.xy / uResolution;
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
    constructor(canvas, options = {}) {
      this.canvas = canvas;
      const attributes = { antialias: false, depth: false, stencil: false,
        alpha: false, preserveDrawingBuffer: true, powerPreference: 'high-performance', failIfMajorPerformanceCaveat: false };
      // Allow software rasterizers. Some drivers expose WebGL1 only.
      let gl;
      try { gl = canvas.getContext('webgl2', attributes); } catch { /* Try WebGL1 below. */ }
      this.api = gl ? 'WebGL2' : 'WebGL1';
      if (!gl) {
        try { gl = canvas.getContext('webgl', attributes) || canvas.getContext('experimental-webgl', attributes); }
        catch { /* The browser may disable every WebGL context. */ }
      }
      if (!gl) throw new Error('WebGL is unavailable in this browser, including software rendering. CPU benchmark still works. Check chrome://gpu for driver or browser restrictions.');
      this.gl = gl;
      this.shaders = [];
      try {
        const debug = gl.getExtension('WEBGL_debug_renderer_info');
        this.renderer = String(debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
        this.rendererType = /swiftshader|llvmpipe|softpipe|swrast|lavapipe|software rasterizer|basic render driver|gdi generic/i.test(this.renderer)
          ? 'software' : 'driver';
        this.tiled = this.rendererType === 'software' || this.api === 'WebGL1';
        const requested = options.profile || 'auto';
        if (requested !== 'auto' && !Object.hasOwn(RESOLUTIONS, requested)) throw new Error('Unknown graphics resolution profile.');
        this.resolutionPreset = requested === 'auto' ? this.tiled ? 'compatibility' : 'standard' : requested;
        [this.width, this.height] = RESOLUTIONS[this.resolutionPreset];
        canvas.width = this.width; canvas.height = this.height;
        const highp = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
        this.precision = highp?.precision > 0 ? 'highp' : 'mediump';
        this.timingMethod = this.tiled ? 'tiled-readback-64' : 'fence';
        this.profile = `${this.api} / ${this.rendererType} / ${this.width}×${this.height} / ${this.precision} / ${this.timingMethod}`;
        this.program = gl.createProgram();
        const vertexSource = this.api === 'WebGL2' ? vertex
          : 'attribute vec2 aPosition; void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }';
        let fragmentSource = fragment.replace('precision highp float;', `precision ${this.precision} float;`);
        if (this.api === 'WebGL1') fragmentSource = fragmentSource.replace('#version 300 es', '')
          .replace('out vec4 color;', '').replace(/\btexture\(/g, 'texture2D(').replace(/\bcolor =/g, 'gl_FragColor =');
        for (const [type, source] of [[gl.VERTEX_SHADER, vertexSource], [gl.FRAGMENT_SHADER, fragmentSource]]) {
          const shader = gl.createShader(type);
          this.shaders.push(shader);
          gl.shaderSource(shader, source); gl.compileShader(shader);
          if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(`${this.api} shader compilation failed. CPU benchmark still works.`);
          gl.attachShader(this.program, shader);
        }
        gl.linkProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) throw new Error('GPU shader linking failed.');
        gl.useProgram(this.program);
        this.time = gl.getUniformLocation(this.program, 'uTime');
        this.mode = gl.getUniformLocation(this.program, 'uMode');
        if (this.api === 'WebGL2') { this.vao = gl.createVertexArray(); gl.bindVertexArray(this.vao); }
        else {
          this.vertices = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, this.vertices);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
          const position = gl.getAttribLocation(this.program, 'aPosition');
          gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        }
        this.texture = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, this.texture);
        const pixels = new Uint8Array(512 * 512 * 4);
        for (let i = 0; i < pixels.length; i++) pixels[i] = (Math.imul(i + 7, 1664525) >>> 16) & 255;
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 512, 512, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.viewport(0, 0, this.width, this.height);
        gl.uniform2f(gl.getUniformLocation(this.program, 'uResolution'), this.width, this.height);
        this.timer = !this.tiled && this.api === 'WebGL2' ? gl.getExtension('EXT_disjoint_timer_query_webgl2') : null;
      } catch (error) { this.dispose(); throw error; }
    }

    async run(kind, duration, signal, onSample, onWarmup) {
      if (this.tiled) return this.runTiled(kind, duration, signal, onSample, onWarmup);
      const gl = this.gl;
      const WIDTH = this.width, HEIGHT = this.height;
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
          gl.uniform1f(this.time, (frameStart / 1000) % 120);
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
        gl.readPixels(Math.floor(WIDTH / 2), Math.floor(HEIGHT / 2), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
        if (gl.getError() !== gl.NO_ERROR || pixel[3] !== 255) throw new Error('GPU output check failed.');
        return { kind, rate: frames * WIDTH * HEIGHT / elapsed / 1000, frames, elapsed,
          frameTimes, gpuTimes, discardedTimers, samples, outputCheck: 'Center pixel readable; not an artifact detector',
          ...this.metadata(), timing: 'Completed frames / wall time (includes browser and fence polling overhead)' };
      } finally { pendingQueries.forEach(q => gl.deleteQuery(q)); }
    }

    metadata() {
      return { resolution: [this.width, this.height], api: this.api, renderer: this.renderer,
        rendererType: this.rendererType, precision: this.precision, profile: this.profile,
        timingMethod: this.timingMethod, resolutionPreset: this.resolutionPreset };
    }

    async runTiled(kind, duration, signal, onSample, onWarmup) {
      const gl = this.gl;
      const samples = [], frameTimes = [], tileTimes = [];
      const pixel = new Uint8Array(64 * 64 * 4);
      let start = null, last = 0, completedPixels = 0, lastPixels = 0, completedTiles = 0, frames = 0;
      let x = 0, y = 0, frameStart = null;
      const warmupEnd = performance.now() + 500;
      const check = () => {
        signal.throwIfAborted();
        if (gl.isContextLost()) throw new Error('Graphics context lost. No final score saved.');
      };
      gl.uniform1i(this.mode, kind === 'texture' ? 1 : 0);
      gl.enable(gl.SCISSOR_TEST);
      try {
        // Read back each small tile to prove it completed. Yield at least every ~8 ms
        // so a slow software renderer does not lock the page for a whole large frame.
        while (start === null || performance.now() - start < duration) {
          check();
          const chunkStart = performance.now();
          do {
            check();
            const tileStart = performance.now();
            if (start === null && tileStart >= warmupEnd) {
              start = tileStart; last = start; x = 0; y = 0; frameStart = tileStart; onWarmup();
            }
            if (start !== null && tileStart - start >= duration) break;
            if (x === 0 && y === 0) {
              frameStart = tileStart;
              gl.uniform1f(this.time, (tileStart / 1000) % 120);
            }
            const width = Math.min(64, this.width - x), height = Math.min(64, this.height - y);
            gl.scissor(x, y, width, height);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            // WebGL1 has no core fence API. readPixels must return up-to-date pixels.
            gl.readPixels(x, y, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
            if (gl.getError() !== gl.NO_ERROR || pixel[3] !== 255) throw new Error('Graphics tile output check failed.');
            const now = performance.now();
            if (start !== null) {
              completedPixels += width * height; completedTiles++;
              if (tileTimes.length < 10000) tileTimes.push(now - tileStart);
              if (now - last >= 500) {
                const rate = (completedPixels - lastPixels) / (now - last) / 1000;
                samples.push({ elapsed: now - start, rate });
                onSample(rate); last = now; lastPixels = completedPixels;
              }
            }
            x += width;
            if (x >= this.width) {
              x = 0; y += height;
              if (y >= this.height) {
                y = 0;
                if (start !== null) { frames++; frameTimes.push(now - frameStart); }
              }
            }
          } while (performance.now() - chunkStart < 8);
          await new Promise(resolve => setTimeout(resolve, 0));
        }
        check();
        const elapsed = performance.now() - start;
        if (!completedPixels || !Number.isFinite(elapsed) || elapsed <= 0) throw new Error('No completed graphics tiles.');
        return { kind, rate: completedPixels / elapsed / 1000, completedPixels, completedTiles, frames, elapsed,
          frameTimes, tileTimes, tileTimingSampleLimit: 10000, gpuTimes: [], discardedTimers: 0, samples, ...this.metadata(),
          outputCheck: 'Each completed tile readable; not an artifact detector',
          timing: 'Completed tile pixels / wall time (includes readback and browser scheduling); partial final frame counted by pixels' };
      } finally { gl.disable(gl.SCISSOR_TEST); }
    }

    dispose() {
      const gl = this.gl;
      if (!gl) return;
      if (this.texture) gl.deleteTexture(this.texture);
      if (this.vao) gl.deleteVertexArray(this.vao);
      if (this.vertices) gl.deleteBuffer(this.vertices);
      if (this.program) gl.deleteProgram(this.program);
      this.shaders.forEach(s => gl.deleteShader(s));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    }
  }
  window.StressGPU = GPU;
})();
