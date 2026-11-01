// ==========================================================================
// SORCERESS AVATAR COMPANION CONTROLLER
// Interactive guide across the Multiverse with portal interactions & spells
// ==========================================================================

import { soundFx } from "./audio.js";
import { MagicParticles } from "./components/MagicParticles.js";
import { portalTransition } from "./components/PortalTransition.js";

export class SorceressAvatarController {
  constructor() {
    this.container = document.getElementById("mystic-companion");
    this.speechBubble = document.getElementById("companion-speech");
    this.avatarImg = document.getElementById("companion-avatar-img");
    this.sparkRing = document.getElementById("companion-spark-ring");
    this.quoteIndex = 0;
    this.currentSection = "nexus";

    this.quotes = [
      "Every line of code weaves a new branch across the Multiverse.",
      "Hardware telemetry, conversational AI, and modern web architectures united.",
      "Notice the peeking companion exploring the dimensions below?",
      "Need an interdimensional collaborator? Transmit your frequency in the Gateway!",
      "Clean architecture is the true alchemy of modern computing."
    ];

    this.sectionDialogues = {
      nexus: "Welcome to the Multiverse Nexus. I am your guide through Binethma's creations.",
      about: "Earth-616 origin: Computer Science undergraduate at IIT Sri Lanka & University of Westminster.",
      skills: "The Technical Arsenal! Eight disciplines of code, hardware telemetry, and AI systems.",
      dimensions: "Six flagship dimensions. Each realm tackles real-world challenges with IoT, AI, and web engineering.",
      timeline: "The Temporal Chronology. Track each milestone of Binethma's engineering trajectory.",
      lore: "Multiverse chronicles! In-depth post-mortems on Adorix and the Smart Tail Pod.",
      gateway: "Initiate transmission. Reach out for collaborations and software engineering opportunities."
    };

    this.init();
  }

  init() {
    if (!this.container) return;

    // Click companion triggers spell burst & quote
    this.container.addEventListener("click", () => {
      this.triggerMagicSpell();
    });

    this.setupIntersectionObserver();

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

    // Trigger magic particle burst from avatar
    MagicParticles.triggerSparkBurst(this.container, 30);

    if (this.sparkRing) {
      this.sparkRing.classList.add("ring-burst");
      setTimeout(() => this.sparkRing.classList.remove("ring-burst"), 800);
    }

    this.quoteIndex = (this.quoteIndex + 1) % this.quotes.length;
    this.setDialogue(this.quotes[this.quoteIndex]);
  }

  // Avatar triggers a magical portal transition to a destination section (Instruction #4)
  summonPortalTo(sectionId) {
    soundFx.playPortalHum();
    this.setDialogue("Opening dimensional portal...");
    portalTransition.transitionTo(sectionId);
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
    if (sectionId === "timeline") {
      this.container.classList.add("timestone-mode");
    } else {
      this.container.classList.remove("timestone-mode");
    }

    if (this.avatarImg) {
      if (sectionId === "skills" || sectionId === "dimensions") {
        this.avatarImg.src = "/assets/avatar_spellcast.jpg";
      } else {
        this.avatarImg.src = "/assets/avatar_meditating.jpg";
      }
    }
  }
}
