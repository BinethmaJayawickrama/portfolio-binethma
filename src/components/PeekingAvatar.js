// ==========================================================================
// PEEKING AVATAR COMPONENT
// Female sorceress peeking over the ledge, looking around and reacting to cursor
// ==========================================================================

import gsap from "gsap";
import { soundFx } from "../audio.js";

export class PeekingAvatar {
  constructor(containerId = "peeking-avatar-container") {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.wrapper = this.container.querySelector(".peeking-wrapper");
    this.image = this.container.querySelector(".peeking-img");
    this.sparkRing = this.container.querySelector(".peeking-sparks");
    this.isPeeked = false;

    this.init();
  }

  init() {
    // 1. Initial State: only hair/hood top is barely visible (hidden -85% below ledge)
    gsap.set(this.wrapper, { y: 130, rotation: 0 });

    // 2. IntersectionObserver: Trigger peek when scrolled into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isPeeked) {
          this.triggerPeekSequence();
        }
      });
    }, { threshold: 0.35 });

    observer.observe(this.container);

    // 3. Cursor proximity reaction
    this.setupCursorReaction();
  }

  triggerPeekSequence() {
    this.isPeeked = true;
    soundFx.playSpellChime(580);

    const tl = gsap.timeline();

    // Step 1: Slowly peeks upward over the ledge
    tl.to(this.wrapper, {
      y: 10,
      duration: 1.4,
      ease: "power2.out"
    });

    // Step 2: Pauses and looks around (subtle side-to-side rotation)
    tl.to(this.wrapper, {
      rotation: 3,
      x: 6,
      duration: 0.8,
      ease: "sine.inOut"
    })
    .to(this.wrapper, {
      rotation: -3,
      x: -6,
      duration: 1.0,
      ease: "sine.inOut"
    })
    .to(this.wrapper, {
      rotation: 0,
      x: 0,
      duration: 0.7,
      ease: "power1.out"
    });
  }

  setupCursorReaction() {
    this.container.addEventListener("mouseenter", () => {
      soundFx.playSparkCrackle();
      // Peeks up curious and active
      gsap.to(this.wrapper, {
        y: -10,
        scale: 1.04,
        duration: 0.35,
        ease: "back.out(2)"
      });
      if (this.sparkRing) {
        gsap.to(this.sparkRing, { opacity: 1, scale: 1.2, duration: 0.3 });
      }
    });

    this.container.addEventListener("mouseleave", () => {
      gsap.to(this.wrapper, {
        y: 10,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
      if (this.sparkRing) {
        gsap.to(this.sparkRing, { opacity: 0.3, scale: 1, duration: 0.5 });
      }
    });
  }
}
