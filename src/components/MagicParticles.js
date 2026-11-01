// ==========================================================================
// MAGIC PARTICLES COMPONENT
// Lightweight, performance-friendly bursts for hover, avatar spells, and portals
// ==========================================================================

import confetti from "canvas-confetti";

export class MagicParticles {
  static triggerSparkBurst(originElement, count = 25) {
    if (!originElement) return;
    const rect = originElement.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: count,
      spread: 55,
      startVelocity: 22,
      origin: { x, y },
      colors: ["#ffbe0b", "#fb5607", "#fff4cc", "#ffaa00", "#ff0055"],
      ticks: 90,
      gravity: 0.7,
      scalar: 0.85,
      disableForReducedMotion: true
    });
  }

  static triggerEmberFloat(x, y, count = 15) {
    confetti({
      particleCount: count,
      spread: 40,
      startVelocity: 14,
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight
      },
      colors: ["#ffbe0b", "#fb5607", "#fff3b0"],
      ticks: 80,
      gravity: 0.5,
      scalar: 0.7,
      disableForReducedMotion: true
    });
  }
}
