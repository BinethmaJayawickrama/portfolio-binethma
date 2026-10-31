// Ultra-High-Performance Doctor Strange Sling-Ring Spark & Portal Engine

class PortalEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d", { alpha: true });
    this.particles = [];
    this.portalCenter = { x: 0, y: 0 };
    this.portalRadius = 160;
    this.baseAngle = 0;
    this.angularSpeed = 0.045;
    this.mouse = { x: -1000, y: -1000, isHovering: false };
    this.isVisible = true;
    this.animId = null;

    this.sparkColors = [
      "#ffffff", // Core white
      "#fff3b0", // Warm white
      "#ffbe0b", // Gold
      "#fb5607", // Fiery orange
      "#ff0055"  // Eldritch crimson
    ];
    this.timeStoneActive = false;
    this.timeStoneColors = [
      "#ffffff",
      "#00ffaa",
      "#00e676",
      "#1de9b6"
    ];

    this.resize();
    window.addEventListener("resize", () => this.resize(), { passive: true });
    this.bindEvents();
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    // Only animate when the portal is visible in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;
        if (this.isVisible) {
          if (!this.animId) {
            this.animate = this.animate.bind(this);
            this.animId = requestAnimationFrame(this.animate);
          }
        } else {
          if (this.animId) {
            cancelAnimationFrame(this.animId);
            this.animId = null;
          }
        }
      });
    }, { threshold: 0.05 });

    observer.observe(this.canvas);
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    // Cap pixel ratio to 1.5 to prevent 4K lagging on integrated GPUs
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.canvas.width = Math.floor(rect.width * dpr);
    this.canvas.height = Math.floor(rect.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.width = rect.width;
    this.height = rect.height;
    this.portalCenter = {
      x: this.width / 2,
      y: this.height / 2
    };
    this.portalRadius = Math.min(this.width, this.height) * 0.35;
  }

  bindEvents() {
    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;

      const dx = this.mouse.x - this.portalCenter.x;
      const dy = this.mouse.y - this.portalCenter.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      this.mouse.isHovering = Math.abs(dist - this.portalRadius) < 55;
      if (this.mouse.isHovering && Math.random() > 0.4) {
        this.emitSparksAt(this.mouse.x, this.mouse.y, 2, 2);
      }
    }, { passive: true });

    this.canvas.addEventListener("mouseleave", () => {
      this.mouse.isHovering = false;
    }, { passive: true });

    this.canvas.addEventListener("click", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      this.triggerBurst(clickX, clickY, 35);
    });
  }

  setTimeStoneMode(enabled) {
    this.timeStoneActive = enabled;
  }

  emitSparksAt(x, y, count = 2, speedMult = 1) {
    const colors = this.timeStoneActive ? this.timeStoneColors : this.sparkColors;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 2.5 + 1) * speedMult;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5,
        size: Math.random() * 2 + 1,
        alpha: 1,
        decay: Math.random() * 0.04 + 0.02,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  triggerBurst(x, y, count = 35) {
    const colors = this.timeStoneActive ? this.timeStoneColors : this.sparkColors;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 2.5 + 1,
        alpha: 1,
        decay: Math.random() * 0.03 + 0.015,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  updateRingSparks() {
    this.baseAngle += this.angularSpeed * (this.mouse.isHovering ? 1.4 : 1.0);
    const colors = this.timeStoneActive ? this.timeStoneColors : this.sparkColors;

    // Optimized spark emission count: 4-6 sparks per frame gives a gorgeous dense ring with 80% less CPU load!
    const spawnPerFrame = this.mouse.isHovering ? 6 : 4;
    for (let i = 0; i < spawnPerFrame; i++) {
      const r = this.portalRadius + (Math.random() * 12 - 6);
      const angle = this.baseAngle + (Math.random() * Math.PI * 2);

      const tangentAngle = angle + (Math.PI / 2) + (Math.random() * 0.3 - 0.15);
      const speed = Math.random() * 2.5 + 1.2;
      const outwardSpeed = Math.random() * 1.2 + 0.3;

      const vx = Math.cos(tangentAngle) * speed + Math.cos(angle) * outwardSpeed;
      const vy = Math.sin(tangentAngle) * speed + Math.sin(angle) * outwardSpeed;

      this.particles.push({
        x: this.portalCenter.x + Math.cos(angle) * r,
        y: this.portalCenter.y + Math.sin(angle) * r,
        vx: vx,
        vy: vy,
        size: Math.random() * 2.2 + 0.8,
        alpha: 1,
        decay: Math.random() * 0.03 + 0.018,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  animate() {
    if (!this.isVisible || !this.ctx || !this.width) return;

    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Additive blending for glow without the laggy shadowBlur
    this.ctx.globalCompositeOperation = "lighter";

    // Draw glowing ring core
    this.drawPortalGlow();

    // Spawn sparks
    this.updateRingSparks();

    // Fast particle batch rendering
    const len = this.particles.length;
    for (let i = len - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.03;
      p.vx *= 0.98;
      p.vy *= 0.98;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;

      // Soft outer glow via dual arc without shadowBlur
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * 1.8, 0, Math.PI * 2);
      this.ctx.fill();

      // Bright white core
      this.ctx.fillStyle = "#ffffff";
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Keep particles capped for silky smooth 60fps
    if (this.particles.length > 220) {
      this.particles.splice(0, this.particles.length - 220);
    }

    this.animId = requestAnimationFrame(this.animate);
  }

  drawPortalGlow() {
    const { x, y } = this.portalCenter;
    const r = this.portalRadius;
    const glowColor = this.timeStoneActive ? "rgba(0, 255, 170, " : "rgba(255, 140, 0, ";

    const grad = this.ctx.createRadialGradient(x, y, r - 20, x, y, r + 30);
    grad.addColorStop(0, "rgba(0, 0, 0, 0)");
    grad.addColorStop(0.7, `${glowColor}0.15)`);
    grad.addColorStop(0.88, `${glowColor}0.35)`);
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");

    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.arc(x, y, r + 30, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

// Background Deep Starfield
class StarfieldEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d", { alpha: false });
    this.stars = [];
    this.animId = null;

    this.resize();
    window.addEventListener("resize", () => this.resize(), { passive: true });
    this.initStars();
    this.animate = this.animate.bind(this);
    this.animId = requestAnimationFrame(this.animate);

    // Pause starfield when tab is in background to save battery
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (this.animId) cancelAnimationFrame(this.animId);
        this.animId = null;
      } else {
        if (!this.animId) this.animId = requestAnimationFrame(this.animate);
      }
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  initStars() {
    this.stars = [];
    const count = 75; // Optimized count
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.12,
        speedY: (Math.random() - 0.5) * 0.12,
        alpha: Math.random() * 0.6 + 0.3,
        color: Math.random() > 0.8 ? "#ffd166" : Math.random() > 0.6 ? "#a0c4ff" : "#ffffff"
      });
    }
  }

  animate() {
    // Fill dark background once
    this.ctx.fillStyle = "#05040a";
    this.ctx.fillRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      star.x += star.speedX;
      star.y += star.speedY;

      if (star.x < 0) star.x = this.width;
      if (star.x > this.width) star.x = 0;
      if (star.y < 0) star.y = this.height;
      if (star.y > this.height) star.y = 0;

      this.ctx.globalAlpha = star.alpha;
      this.ctx.fillStyle = star.color;
      this.ctx.fillRect(star.x, star.y, star.size, star.size);
    }

    this.animId = requestAnimationFrame(this.animate);
  }
}

// Cursor Spark Trail - Event-Driven (Only animates when active particles exist!)
class CursorSparks {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.lastX = null;
    this.lastY = null;
    this.isRunning = false;

    this.resize();
    window.addEventListener("resize", () => this.resize(), { passive: true });

    window.addEventListener("mousemove", (e) => {
      this.addSparks(e.clientX, e.clientY);
    }, { passive: true });

    this.animate = this.animate.bind(this);
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  addSparks(x, y) {
    if (this.lastX !== null) {
      const dist = Math.hypot(x - this.lastX, y - this.lastY);
      if (dist < 8) return; // Throttled distance
    }
    this.lastX = x;
    this.lastY = y;

    // Add just 2 bright sparks
    for (let i = 0; i < 2; i++) {
      this.particles.push({
        x: x + (Math.random() * 6 - 3),
        y: y + (Math.random() * 6 - 3),
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.4,
        alpha: 1,
        decay: 0.045,
        size: Math.random() * 1.8 + 1,
        color: Math.random() > 0.5 ? "#ffbe0b" : "#fb5607"
      });
    }

    if (!this.isRunning) {
      this.isRunning = true;
      requestAnimationFrame(this.animate);
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.globalCompositeOperation = "lighter";

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    }

    if (this.particles.length > 0) {
      requestAnimationFrame(this.animate);
    } else {
      this.isRunning = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

export { PortalEngine, StarfieldEngine, CursorSparks };
