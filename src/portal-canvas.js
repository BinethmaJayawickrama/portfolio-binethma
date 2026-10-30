// Real-Time Doctor Strange Sling-Ring Spark & Portal Engine

class PortalEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.portalCenter = { x: 0, y: 0 };
    this.portalRadius = 180;
    this.baseAngle = 0;
    this.angularSpeed = 0.045;
    this.mouse = { x: -1000, y: -1000, isHovering: false, lastX: 0, lastY: 0 };
    this.sparkColors = [
      "#fff8db", // White hot
      "#ffbe0b", // Radiant gold
      "#fb5607", // Fiery orange
      "#ff006e", // Eldritch magenta-red
      "#ffaa00", // Amber spark
      "#ffeaa7"  // Bright lemon
    ];
    this.timeStoneActive = false;
    this.timeStoneColors = [
      "#ffffff",
      "#00ffaa",
      "#00e676",
      "#1de9b6",
      "#00b0ff"
    ];

    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.bindEvents();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * (window.devicePixelRatio || 1);
    this.canvas.height = rect.height * (window.devicePixelRatio || 1);
    this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    this.width = rect.width;
    this.height = rect.height;
    this.portalCenter = {
      x: this.width / 2,
      y: this.height / 2
    };
    // Responsive portal radius
    this.portalRadius = Math.min(this.width, this.height) * 0.36;
  }

  bindEvents() {
    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;

      const dx = this.mouse.x - this.portalCenter.x;
      const dy = this.mouse.y - this.portalCenter.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      this.mouse.isHovering = Math.abs(dist - this.portalRadius) < 70;

      // Emit interactive sparks if moving near ring
      if (this.mouse.isHovering) {
        this.emitSparksAt(this.mouse.x, this.mouse.y, 4, 3);
      }
    });

    this.canvas.addEventListener("mouseleave", () => {
      this.mouse.isHovering = false;
    });

    this.canvas.addEventListener("click", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      this.triggerBurst(clickX, clickY, 70);
    });
  }

  setTimeStoneMode(enabled) {
    this.timeStoneActive = enabled;
  }

  emitSparksAt(x, y, count = 2, speedMult = 1) {
    const colors = this.timeStoneActive ? this.timeStoneColors : this.sparkColors;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 3 + 1) * speedMult;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (Math.random() * 1.5),
        size: Math.random() * 2.8 + 1.2,
        alpha: 1,
        decay: Math.random() * 0.03 + 0.018,
        color: colors[Math.floor(Math.random() * colors.length)],
        sparkle: Math.random() > 0.4
      });
    }
  }

  triggerBurst(x, y, count = 60) {
    const colors = this.timeStoneActive ? this.timeStoneColors : this.sparkColors;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3.5 + 1.5,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.012,
        color: colors[Math.floor(Math.random() * colors.length)],
        sparkle: true
      });
    }
  }

  updateRingSparks() {
    this.baseAngle += this.angularSpeed * (this.mouse.isHovering ? 1.6 : 1.0);
    const colors = this.timeStoneActive ? this.timeStoneColors : this.sparkColors;

    // Spawn sparks along the circular sling-ring perimeter
    const spawnPerFrame = this.mouse.isHovering ? 18 : 12;
    for (let i = 0; i < spawnPerFrame; i++) {
      // Slight radial variance for organic fiery spark width
      const r = this.portalRadius + (Math.random() * 16 - 8);
      const angle = this.baseAngle + (Math.random() * Math.PI * 2);

      // Tangential velocity (Doctor Strange circular sling-ring motion)
      const tangentAngle = angle + (Math.PI / 2) + (Math.random() * 0.4 - 0.2);
      const speed = Math.random() * 3.2 + 1.8;

      // Outward flare
      const outwardSpeed = (Math.random() * 1.8 + 0.4);
      const vx = Math.cos(tangentAngle) * speed + Math.cos(angle) * outwardSpeed;
      const vy = Math.sin(tangentAngle) * speed + Math.sin(angle) * outwardSpeed + (Math.random() * 0.6 - 0.3);

      this.particles.push({
        x: this.portalCenter.x + Math.cos(angle) * r,
        y: this.portalCenter.y + Math.sin(angle) * r,
        vx: vx,
        vy: vy,
        size: Math.random() * 2.8 + 1.0,
        alpha: 1,
        decay: Math.random() * 0.025 + 0.015,
        color: colors[Math.floor(Math.random() * colors.length)],
        sparkle: Math.random() > 0.3
      });
    }
  }

  animate() {
    if (!this.ctx || !this.width) return;

    // Soft trail clear for glowing motion blur
    this.ctx.globalCompositeOperation = "destination-out";
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Switch to additive blending for ultra-luminous sparks
    this.ctx.globalCompositeOperation = "lighter";

    // Draw glowing ring core
    this.drawPortalGlow();

    // Spawn new portal sparks
    this.updateRingSparks();

    // Render & update active particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04; // Gentle gravity
      p.vx *= 0.985;
      p.vy *= 0.985;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = p.sparkle ? 12 : 6;
      this.ctx.shadowColor = p.color;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * (p.sparkle && Math.random() > 0.5 ? 1.3 : 1.0), 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // Keep particle count stable
    if (this.particles.length > 900) {
      this.particles.splice(0, this.particles.length - 900);
    }

    requestAnimationFrame(this.animate);
  }

  drawPortalGlow() {
    const { x, y } = this.portalCenter;
    const r = this.portalRadius;
    const glowColor = this.timeStoneActive ? "rgba(0, 255, 170, " : "rgba(255, 140, 0, ";

    // Inner fiery gradient ring
    const grad = this.ctx.createRadialGradient(x, y, r - 30, x, y, r + 40);
    grad.addColorStop(0, "rgba(0, 0, 0, 0)");
    grad.addColorStop(0.65, `${glowColor}0.08)`);
    grad.addColorStop(0.85, `${glowColor}0.38)`);
    grad.addColorStop(0.95, `${glowColor}0.18)`);
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");

    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.arc(x, y, r + 45, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

// Background Deep Starfield & Multiverse Stardust
class StarfieldEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.stars = [];
    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.initStars();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  initStars() {
    this.stars = [];
    const count = Math.min(180, Math.floor(this.width * 0.12));
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 1.8 + 0.4,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.7 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        color: Math.random() > 0.8 ? "#ffd166" : Math.random() > 0.6 ? "#a0c4ff" : "#ffffff"
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (const star of this.stars) {
      star.x += star.speedX;
      star.y += star.speedY;
      star.alpha += Math.sin(Date.now() * star.pulseSpeed) * 0.01;

      if (star.x < 0) star.x = this.width;
      if (star.x > this.width) star.x = 0;
      if (star.y < 0) star.y = this.height;
      if (star.y > this.height) star.y = 0;

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
      this.ctx.fillStyle = star.color;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    requestAnimationFrame(this.animate);
  }
}

// Cursor Spark Trail
class CursorSparks {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.lastX = null;
    this.lastY = null;

    this.resize();
    window.addEventListener("resize", () => this.resize());

    window.addEventListener("mousemove", (e) => {
      this.addSparks(e.clientX, e.clientY);
    });

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  addSparks(x, y) {
    if (this.lastX !== null) {
      const dist = Math.hypot(x - this.lastX, y - this.lastY);
      if (dist < 5) return;
    }
    this.lastX = x;
    this.lastY = y;

    const count = 3;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: x + (Math.random() * 8 - 4),
        y: y + (Math.random() * 8 - 4),
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2 - 0.5,
        alpha: 1,
        decay: Math.random() * 0.04 + 0.025,
        size: Math.random() * 2.2 + 1,
        color: Math.random() > 0.5 ? "#ffbe0b" : "#fb5607"
      });
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

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    requestAnimationFrame(this.animate);
  }
}

export { PortalEngine, StarfieldEngine, CursorSparks };
