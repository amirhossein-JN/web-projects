(function () {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = 0, height = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let particles = [];
  let mouse = { x: -9999, y: -9999, active: false };
  let scrollY = 0, docHeight = 1;
  let time = 0;
  let PARTICLE_COUNT = 4200;

  const PALETTE = ["#ff3fa4", "#a855f7", "#7c5cff", "#3da9ff", "#00e6c3"];

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp01(v) { return Math.max(0, Math.min(1, v)); }

  function hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const PALETTE_RGB = PALETTE.map(hexToRgb);

  function mixColor(t) {
    const seg = t * (PALETTE_RGB.length - 1);
    const i = Math.min(Math.floor(seg), PALETTE_RGB.length - 2);
    const f = seg - i;
    const a = PALETTE_RGB[i], b = PALETTE_RGB[i + 1];
    return [
      Math.round(lerp(a[0], b[0], f)),
      Math.round(lerp(a[1], b[1], f)),
      Math.round(lerp(a[2], b[2], f)),
    ];
  }

  // ---------- shape point generators ----------
  // sample pixel coordinates of rendered text/icons from an offscreen canvas
  function samplePoints(drawFn, w, h, count) {
    const off = document.createElement("canvas");
    off.width = w; off.height = h;
    const octx = off.getContext("2d");
    drawFn(octx, w, h);
    const data = octx.getImageData(0, 0, w, h).data;
    const candidates = [];
    const step = 2;
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const a = data[(y * w + x) * 4 + 3];
        if (a > 80) candidates.push([x, y]);
      }
    }
    const pts = [];
    if (candidates.length === 0) return pts;
    for (let i = 0; i < count; i++) {
      pts.push(candidates[Math.floor(Math.random() * candidates.length)]);
    }
    return pts;
  }

  function nebulaPoints(w, h, count) {
    const clusters = [
      { x: w * 0.15, y: h * 0.20, sx: w * 0.16, sy: h * 0.18 },
      { x: w * 0.82, y: h * 0.16, sx: w * 0.18, sy: h * 0.16 },
      { x: w * 0.55, y: h * 0.55, sx: w * 0.26, sy: h * 0.26 },
      { x: w * 0.12, y: h * 0.78, sx: w * 0.16, sy: h * 0.14 },
      { x: w * 0.88, y: h * 0.82, sx: w * 0.15, sy: h * 0.18 },
      { x: w * 0.50, y: h * 0.10, sx: w * 0.20, sy: h * 0.10 },
    ];
    const pts = [];
    for (let i = 0; i < count; i++) {
      const c = clusters[i % clusters.length];
      const angle = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 1.6);
      pts.push([c.x + Math.cos(angle) * r * c.sx, c.y + Math.sin(angle) * r * c.sy]);
    }
    return pts;
  }

  function textPoints(text, w, h, count, fontSize) {
    return samplePoints((octx, ow, oh) => {
      octx.clearRect(0, 0, ow, oh);
      octx.fillStyle = "#fff";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.font = `800 ${fontSize}px Vazirmatn, sans-serif`;
      octx.fillText(text, ow / 2, oh / 2);
    }, w, h, count);
  }

  function ringPoints(w, h, count) {
    const pts = [];
    const cx = w / 2, cy = h * 0.45;
    const R = Math.min(w, h) * 0.28;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const rr = R + (Math.random() - 0.5) * 30;
      pts.push([cx + Math.cos(angle) * rr, cy + Math.sin(angle) * rr]);
    }
    return pts;
  }

  function starPoints(w, h, count) {
    return samplePoints((octx, ow, oh) => {
      const cx = ow / 2, cy = oh / 2;
      const spikes = 6, outer = Math.min(ow, oh) * 0.34, inner = outer * 0.45;
      octx.fillStyle = "#fff";
      octx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? outer : inner;
        const a = (Math.PI / spikes) * i - Math.PI / 2;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        i === 0 ? octx.moveTo(x, y) : octx.lineTo(x, y);
      }
      octx.closePath();
      octx.fill();
    }, w, h, count);
  }

  function getKeyframes(w, h, count) {
    const small = w < 700;
    return [
      nebulaPoints(w, h, count),
      textPoints("۲۰۲۶", w, h, count, small ? w * 0.32 : Math.min(w * 0.22, h * 0.4)),
      ringPoints(w, h, count),
      starPoints(w, h, count),
      nebulaPoints(w, h, count),
    ];
  }

  function buildParticles() {
    PARTICLE_COUNT = width < 700 ? 2200 : 4200;
    const frames = getKeyframes(width, height, PARTICLE_COUNT);
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const rgb = mixColor(Math.random());
      particles.push({
        frames: frames.map(f => f[i] || f[0]),
        drift: Math.random() * Math.PI * 2,
        driftSpeed: 0.15 + Math.random() * 0.35,
        driftAmp: 4 + Math.random() * 8,
        r: Math.random() * 1.7 + 0.4,
        alpha: 0.3 + Math.random() * 0.55,
        depth: 0.4 + Math.random() * 0.7,
        rgb,
        x: 0, y: 0, inited: false,
      });
    }
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildParticles();
  }

  function updateScroll() {
    scrollY = window.scrollY || window.pageYOffset;
    docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  }

  function frame() {
    time += 0.016;
    ctx.clearRect(0, 0, width, height);

    const frameCount = particles.length ? particles[0].frames.length : 1;
    const progress = clamp01(scrollY / docHeight) * (frameCount - 1);
    const idx = Math.min(Math.floor(progress), frameCount - 2);
    const t = progress - idx;
    const ease = t * t * (3 - 2 * t);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const A = p.frames[idx];
      const B = p.frames[idx + 1];
      const cx = lerp(A[0], B[0], ease);
      const cy = lerp(A[1], B[1], ease);

      const driftX = Math.cos(time * p.driftSpeed + p.drift) * p.driftAmp;
      const driftY = Math.sin(time * p.driftSpeed + p.drift) * p.driftAmp;
      const parallaxY = (scrollY % height) * (p.depth - 0.6) * 0.10;

      let targetX = cx + driftX;
      let targetY = cy + driftY + parallaxY;

      if (mouse.active) {
        const dx = targetX - mouse.x;
        const dy = targetY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 170;
        if (dist < radius) {
          const force = (1 - dist / radius) * 55;
          const nx = dist === 0 ? 0 : dx / dist;
          const ny = dist === 0 ? 0 : dy / dist;
          targetX += nx * force;
          targetY += ny * force;
        }
      }

      if (!p.inited) {
        p.x = targetX; p.y = targetY; p.inited = true;
      } else {
        p.x = lerp(p.x, targetX, 0.07);
        p.y = lerp(p.y, targetY, 0.07);
      }

      ctx.beginPath();
      ctx.fillStyle = `rgba(${p.rgb[0]},${p.rgb[1]},${p.rgb[2]},${p.alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(frame);
  }

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });
  window.addEventListener("mouseleave", () => { mouse.active = false; });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });
  window.addEventListener("scroll", updateScroll, { passive: true });

  resize();
  updateScroll();
  requestAnimationFrame(frame);
})();
