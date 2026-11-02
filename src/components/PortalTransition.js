// ==========================================================================
// PORTAL TRANSITION COMPONENT
// Full-screen cinematic circular orange/golden magical portal transition
// ==========================================================================

import gsap from "gsap";
import { soundFx } from "../audio.js";

export class PortalTransition {
  constructor() {
    this.overlay = null;
    this.canvas = null;
    this.ctx = null;
    this.isTransitioning = false;
    this.particles = [];
    this.animId = null;

    this.sparkColors = [
      "#ffffff",
      "#fff4cc",
      "#ffbe0b",
      "#fb5607",
      "#ff0055",
      "#ffaa00"
    ];

    this.initDOM();
  }

  initDOM() {
    // Create dedicated full-screen overlay for portal transition
    this.overlay = document.createElement("div");
    this.overlay.id = "portal-transition-layer";
    this.overlay.className = "portal-transition-layer";
    this.overlay.style.cssText = `
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      z-index: 99999;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      overflow: hidden;
    `;

    // Canvas for fiery sparks and spinning ring
    this.canvas = document.createElement("canvas");
    this.canvas.className = "portal-transition-canvas";
    this.canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    `;
    this.overlay.appendChild(this.canvas);

    // Glowing core element that expands to mask the screen
    this.coreCircle = document.createElement("div");
    this.coreCircle.className = "portal-transition-core";
    this.coreCircle.style.cssText = `
      position: absolute;
      width: 0px;
      height: 0px;
      border-radius: 50%;
      background: radial-gradient(circle, #05040a 0%, #120e24 60%, rgba(255, 119, 0, 0.95) 95%, #ffbe0b 100%);
      box-shadow: 0 0 60px rgba(255, 190, 11, 0.9), inset 0 0 80px rgba(255, 119, 0, 0.8);
      pointer-events: none;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      will-change: width, height, box-shadow;
    `;
    this.overlay.appendChild(this.coreCircle);

    document.body.appendChild(this.overlay);

    this.ctx = this.canvas.getContext("2d", { alpha: true });
    this.resize();
    window.addEventListener("resize", () => this.resize(), { passive: true });
  }

  resize() {
    if (!this.canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.canvas.width = Math.floor(window.innerWidth * dpr);
    this.canvas.height = Math.floor(window.innerHeight * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  // Trigger the 8-step cinematic sequence
  transitionTo(targetSectionId, onMidpoint = null) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (onMidpoint) onMidpoint();
      const target = document.getElementById(targetSectionId);
      if (target) target.scrollIntoView({ behavior: "smooth" });
      this.isTransitioning = false;
      return;
    }

    soundFx.playPortalHum();
    soundFx.playSparkCrackle();

    this.overlay.style.pointerEvents = "auto";
    this.overlay.style.opacity = "1";
    this.particles = [];

    const centerX = this.width / 2;
    const centerY = this.height / 2;
    // Diagonal distance needed to completely envelope viewport
    const maxRadius = Math.hypot(this.width, this.height) * 1.15;

    const portalState = {
      radius: 20,
      ringSparks: 6,
      spinSpeed: 0.08,
      angle: 0,
      glowAlpha: 0.2
    };

    // Start spark loop
    this.startSparkLoop(portalState, centerX, centerY);

    const tl = gsap.timeline({
      onComplete: () => {
        this.stopSparkLoop();
        this.overlay.style.pointerEvents = "none";
        this.overlay.style.opacity = "0";
        this.isTransitioning = false;
      }
    });

    // Step 1 - 3: Portal appears, sparks rotate, ring intensifies
    tl.to(portalState, {
      radius: 120,
      ringSparks: 14,
      spinSpeed: 0.16,
      glowAlpha: 1,
      duration: 0.35,
      ease: "power2.out"
    });

    // Step 4 - 5: Rapid expansion filling viewport
    tl.to(portalState, {
      radius: maxRadius,
      ringSparks: 22,
      spinSpeed: 0.28,
      duration: 0.45,
      ease: "power3.in",
      onUpdate: () => {
        const d = portalState.radius * 2;
        this.coreCircle.style.width = `${d}px`;
        this.coreCircle.style.height = `${d}px`;
      }
    });

    // Step 6 - 7: Midpoint! Scroll instantly through centre of portal
    tl.call(() => {
      soundFx.playSpellChime(640);
      if (onMidpoint) onMidpoint();

      const target = document.getElementById(targetSectionId) ||
                     (targetSectionId === "projects" ? document.getElementById("dimensions") : null);
      if (target) {
        const navHeight = 85;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: Math.max(0, targetPos), behavior: "instant" });
      }
    });

    // Step 8: Portal dissolves outward and fades smoothly
    tl.to(portalState, {
      glowAlpha: 0,
      duration: 0.35,
      ease: "power2.out",
      onUpdate: () => {
        this.overlay.style.opacity = portalState.glowAlpha.toString();
      }
    });
  }

  startSparkLoop(state, cx, cy) {
    const emitFrame = () => {
      state.angle += state.spinSpeed;

      // Emit whirling sparks along expanding perimeter
      for (let i = 0; i < state.ringSparks; i++) {
        const a = state.angle + (Math.PI * 2 * (i / state.ringSparks)) + (Math.random() * 0.4 - 0.2);
        const r = state.radius + (Math.random() * 24 - 12);
        const speed = Math.random() * 5 + 2;
        const tangent = a + (Math.PI / 2);

        this.particles.push({
          x: cx + Math.cos(a) * r,
          y: cy + Math.sin(a) * r,
          vx: Math.cos(tangent) * speed + (Math.random() - 0.5) * 2,
          vy: Math.sin(tangent) * speed + (Math.random() - 0.5) * 2,
          size: Math.random() * 2.8 + 1.2,
          alpha: 1,
          decay: Math.random() * 0.05 + 0.025,
          color: this.sparkColors[Math.floor(Math.random() * this.sparkColors.length)]
        });
      }

      // Render
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

        // Outer glow
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        this.ctx.fill();

        // Bright core
        this.ctx.fillStyle = "#ffffff";
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.animId = requestAnimationFrame(emitFrame);
    };

    this.animId = requestAnimationFrame(emitFrame);
  }

  stopSparkLoop() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }
}

export const portalTransition = new PortalTransition();
