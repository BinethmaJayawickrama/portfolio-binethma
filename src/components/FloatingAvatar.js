// ==========================================================================
// FLOATING MEDITATION AVATAR COMPONENT
// Female sorceress sitting cross-legged and levitating with rotating rings
// ==========================================================================

import gsap from "gsap";

export class FloatingAvatar {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.sparkCanvas = null;
    this.ctx = null;
    this.particles = [];
    this.animId = null;

    this.init();
  }

  init() {
    // 1. Setup floating up-and-down smooth GSAP loop (14px, 3.8s, easeInOut)
    const card = this.container.querySelector(".avatar-portrait-card");
    if (card) {
      gsap.to(card, {
        y: -16,
        duration: 3.6,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });
    }

    // 2. Setup rotating glowing magical rings around her
    const outerRing = this.container.querySelector(".avatar-magic-ring-outer");
    const innerRing = this.container.querySelector(".avatar-magic-ring-inner");

    if (outerRing) {
      gsap.to(outerRing, {
        rotation: 360,
        duration: 24,
        ease: "none",
        repeat: -1
      });
    }

    if (innerRing) {
      gsap.to(innerRing, {
        rotation: -360,
        duration: 18,
        ease: "none",
        repeat: -1
      });
    }

    // 3. Ambient floating orange sparks
    this.sparkCanvas = this.container.querySelector(".avatar-sparks-canvas");
    if (this.sparkCanvas) {
      this.ctx = this.sparkCanvas.getContext("2d");
      this.resizeCanvas();
      window.addEventListener("resize", () => this.resizeCanvas(), { passive: true });
      this.startSparks();
    }
  }

  resizeCanvas() {
    if (!this.sparkCanvas) return;
    const rect = this.sparkCanvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.sparkCanvas.width = Math.floor(rect.width * dpr);
    this.sparkCanvas.height = Math.floor(rect.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.width = rect.width;
    this.height = rect.height;
  }

  startSparks() {
    const colors = ["#ffbe0b", "#fb5607", "#fff4cc", "#ffaa00"];

    const loop = () => {
      // Spawn subtle ambient spark occasionally
      if (Math.random() > 0.6 && this.particles.length < 18) {
        this.particles.push({
          x: Math.random() * this.width,
          y: this.height - 10,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -(Math.random() * 1.2 + 0.6),
          size: Math.random() * 2 + 1,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.012,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      this.ctx.clearRect(0, 0, this.width, this.height);
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

      this.animId = requestAnimationFrame(loop);
    };

    this.animId = requestAnimationFrame(loop);
  }
}
