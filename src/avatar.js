// Interactive Multiverse Sorceress Avatar Companion Controller
import { soundFx } from "./audio.js";
import confetti from "canvas-confetti";

export class SorceressAvatarController {
  constructor() {
    this.container = document.getElementById("mystic-companion");
    this.speechBubble = document.getElementById("companion-speech");
    this.avatarImg = document.getElementById("companion-avatar-img");
    this.sparkRing = document.getElementById("companion-spark-ring");
    this.quoteIndex = 0;
    this.isMuted = false;
    this.currentSection = "hero";

    this.quotes = [
      "Dormammu, I've come to deploy to production!",
      "I examined 14,000,605 timelines... in this one, Binethma's code compiles on the first try.",
      "The language of the Mystic Arts is our code. We harness energy from other dimensions to build reality.",
      "Hardware, IoT, and AI... three sacred relics united in one engineer.",
      "Tap any dimension card to expand its dimensional blueprint!",
      "Need a cross-universe collaborator? Transmit a frequency in the Contact Gateway!"
    ];

    this.sectionDialogues = {
      hero: "Welcome to the Multiverse Nexus. I am your guide through Binethma's creations. Step through any portal!",
      about: "Earth-616 origin: Computer Science scholar at IIT Sri Lanka & University of Westminster. Full-Stack + IoT innovator.",
      skills: "The Mystic Arsenal! Five disciplines of arcane code, hardware telemetry, and synthetic cognition.",
      projects: "Six flagship dimensions. Each realm tackles real-world challenges with IoT, AI, and resilient architecture.",
      timeline: "The Sacred Timeline governed by the Eye of Agamotto. Track each epoch of Binethma's engineering journey.",
      lore: "Multiverse chronicles! Read in-depth architectural journals on Adorix and the Smart Tail Pod.",
      contact: "An interdimensional gateway awaits. Transmit your message across space-time."
    };

    this.init();
  }

  init() {
    if (!this.container) return;

    // Click on companion triggers spell burst & quote
    this.container.addEventListener("click", () => {
      this.triggerMagicSpell();
    });

    // Listen to section scroll changes
    this.setupIntersectionObserver();

    // Hover sound effect
    this.container.addEventListener("mouseenter", () => {
      soundFx.playSpellChime(640);
    });
  }

  setDialogue(text) {
    if (!this.speechBubble) return;
    this.speechBubble.style.opacity = "0";
    setTimeout(() => {
      this.speechBubble.textContent = text;
      this.speechBubble.style.opacity = "1";
    }, 200);
  }

  triggerMagicSpell() {
    soundFx.playPortalHum();
    soundFx.playSparkCrackle();

    // Trigger golden/amber confetti sparks
    const rect = this.container.getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { x: originX, y: originY },
      colors: ["#ffbe0b", "#fb5607", "#ff006e", "#fff3b0", "#ffd166"],
      ticks: 120,
      gravity: 0.8,
      scalar: 0.9,
      disableForReducedMotion: true
    });

    // Rotate companion ring with quick pulse
    if (this.sparkRing) {
      this.sparkRing.classList.add("ring-burst");
      setTimeout(() => this.sparkRing.classList.remove("ring-burst"), 800);
    }

    // Cycle quote
    this.quoteIndex = (this.quoteIndex + 1) % this.quotes.length;
    this.setDialogue(this.quotes[this.quoteIndex]);
  }

  setupIntersectionObserver() {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            const sectionId = entry.target.id;
            if (this.currentSection !== sectionId && this.sectionDialogues[sectionId]) {
              this.currentSection = sectionId;
              this.setDialogue(this.sectionDialogues[sectionId]);
              this.updateAvatarStance(sectionId);
            }
          }
        });
      },
      { threshold: [0.3, 0.6] }
    );

    sections.forEach((s) => observer.observe(s));
  }

  updateAvatarStance(sectionId) {
    // If in timeline, glow emerald time stone green
    if (sectionId === "timeline") {
      this.container.classList.add("timestone-mode");
    } else {
      this.container.classList.remove("timestone-mode");
    }

    // Change avatar icon depending on section
    if (this.avatarImg) {
      if (sectionId === "skills" || sectionId === "projects") {
        this.avatarImg.src = "/assets/avatar_spellcast.jpg";
      } else {
        this.avatarImg.src = "/assets/avatar_meditating.jpg";
      }
    }
  }
}
