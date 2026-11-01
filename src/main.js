// ==========================================================================
// MULTI-UNIVERSE PORTFOLIO - CORE APPLICATION CONTROLLER
// Binethma Jayawickrama
// ==========================================================================

import { StarfieldEngine, CursorSparks, PortalEngine } from "./portal-canvas.js";
import { soundFx } from "./audio.js";
import { SorceressAvatarController } from "./avatar.js";
import { PortalTransition, portalTransition } from "./components/PortalTransition.js";
import { FloatingAvatar } from "./components/FloatingAvatar.js";
import { PeekingAvatar } from "./components/PeekingAvatar.js";
import { MagicParticles } from "./components/MagicParticles.js";
import { initScrollAnimations } from "./components/ScrollAnimations.js";
import { projects, skillsCategories, timelineEvents, articles, personalBio } from "./projects-data.js";
import confetti from "canvas-confetti";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Canvas Engines
  const starfield = new StarfieldEngine("space-canvas");
  const cursorSparks = new CursorSparks("cursor-canvas");
  const portalEngine = new PortalEngine("portal-canvas");

  // 2. Initialize Avatar Components (Instructions #2, #3, #4)
  const companion = new SorceressAvatarController();
  const floatingAvatar = new FloatingAvatar("floating-avatar-container");
  const peekingAvatar = new PeekingAvatar("peeking-avatar-container");

  // 3. Dynamic Typewriter Effect for Subtitle
  initTypewriter();

  // 4. Render Dynamic Sections with Complete Details
  renderSkills();
  renderProjects("all");
  renderTimeline();
  renderLore();

  // 5. Scroll-Based Reveals (Instruction #5)
  initScrollAnimations();

  // 6. Setup Interactive Event Listeners & Portal Transitions (Instruction #1)
  setupNavigation();
  setupHeroActions(companion);
  setupAudioToggle();
  setupTimeStoneToggle(portalEngine);
  setupProjectModals();
  setupContactForm();
  setupWhisperButton(companion);
});

// Typewriter Subtitle
function initTypewriter() {
  const el = document.getElementById("typed-subtitle");
  if (!el) return;

  const phrases = [
    "Full-Stack Developer specializing in modern web applications.",
    "BSc (Hons) Computer Science Candidate @ IIT Sri Lanka & University of Westminster.",
    "Architect of Adorix AI Kiosks & Smart Cattle IoT Telemetry.",
    "Passionate about building scalable, user-focused digital experiences."
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeStep() {
    const currentPhrase = phrases[phraseIdx];

    if (!isDeleting) {
      charIdx++;
      el.textContent = currentPhrase.slice(0, charIdx);
      if (charIdx === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeStep, 2400);
        return;
      }
    } else {
      charIdx--;
      el.textContent = currentPhrase.slice(0, charIdx);
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(typeStep, 400);
        return;
      }
    }

    const speed = isDeleting ? 25 : 55;
    setTimeout(typeStep, speed);
  }

  typeStep();
}

// Render Skills Section with all 8 real categories
function renderSkills() {
  const tabsContainer = document.getElementById("skills-tabs");
  const displayContainer = document.getElementById("skills-display-panel");
  if (!tabsContainer || !displayContainer) return;

  tabsContainer.innerHTML = "";
  skillsCategories.forEach((group, idx) => {
    const tab = document.createElement("button");
    tab.className = `skill-category-tab ${idx === 0 ? "active" : ""}`;
    tab.setAttribute("data-index", idx);
    tab.innerHTML = `
      <div class="tab-glyph">${group.icon}</div>
      <span>${group.title}</span>
    `;

    tab.addEventListener("click", () => {
      soundFx.playSpellChime(480 + idx * 50);
      document.querySelectorAll(".skill-category-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      showSkillGroup(idx);
    });

    tabsContainer.appendChild(tab);
  });

  function showSkillGroup(idx) {
    const group = skillsCategories[idx];
    displayContainer.innerHTML = `
      <div class="skill-panel-header">
        <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.4rem;">
          <span style="font-size: 1.8rem;">${group.icon}</span>
          <h3 class="panel-title">${group.title}</h3>
        </div>
        <p class="panel-desc">${group.description}</p>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 0.85rem; margin-top: 1rem;">
        ${group.skills.map(s => `
          <div style="display: flex; align-items: center; gap: 0.6rem; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-mystic); border-radius: 12px; padding: 0.8rem 1.2rem; font-family: var(--font-tech); font-size: 0.95rem; color: var(--text-main); box-shadow: 0 4px 15px rgba(0,0,0,0.3); transition: transform 0.2s ease, border-color 0.2s ease;"
               onmouseover="this.style.transform='translateY(-2px)'; this.style.borderColor='var(--portal-gold)';"
               onmouseout="this.style.transform='none'; this.style.borderColor='var(--border-mystic)';">
            <span style="color: var(--portal-gold);">✦</span>
            <strong>${s}</strong>
          </div>
        `).join("")}
      </div>
    `;
  }

  showSkillGroup(0);
}

// Render Projects with all details visible
function renderProjects(filter = "all") {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const filtered = filter === "all" ? projects : projects.filter(p => p.category === filter);

  grid.innerHTML = filtered.map(p => `
    <div class="dimension-card" data-id="${p.id}">
      <div class="card-media-wrapper">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
        <span class="card-dimension-tag">${p.dimension}</span>
        <span class="card-badge">${p.emoji} ${p.categoryLabel}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${p.title}</h3>
        <div class="card-subtitle">${p.tagline}</div>
        <p class="card-summary">${p.description}</p>
        
        <!-- Key Features preview -->
        <div style="margin-bottom: 1.2rem; background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 0.85rem;">
          <span style="display: block; font-family: var(--font-mono); font-size: 0.72rem; color: var(--portal-gold); text-transform: uppercase; margin-bottom: 0.4rem; letter-spacing: 0.05em;">
            ${p.challengesLabel}:
          </span>
          <ul style="list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 0.35rem;">
            ${p.challenges.slice(0, 2).map(c => `
              <li style="font-size: 0.82rem; color: var(--text-muted); display: flex; gap: 0.5rem; align-items: flex-start; line-height: 1.4;">
                <span style="color: var(--portal-orange); flex-shrink: 0;">•</span>
                <span>${c}</span>
              </li>
            `).join("")}
          </ul>
        </div>

        <!-- Tech Stack Badges -->
        <div class="tech-runes">
          ${p.tech.map(t => `<span class="tech-rune">${t}</span>`).join("")}
        </div>

        <!-- Action Links -->
        <div class="card-footer">
          <button class="inspect-portal-btn" data-project-id="${p.id}">
            <span>🔮</span>
            <span>View All Details</span>
          </button>
          
          <div class="card-links">
            ${p.links.website ? `
              <a href="${p.links.website}" target="_blank" rel="noopener noreferrer" class="hud-btn" style="padding: 0.4rem 0.8rem; font-size: 0.78rem; text-decoration: none; border-color: var(--portal-gold); color: var(--portal-gold);" title="Visit Live Platform">
                <span>↗</span>
                <span>Live Site</span>
              </a>
            ` : ""}
            ${p.links.github ? `
              <a href="${p.links.github}" target="_blank" rel="noopener noreferrer" class="card-icon-link" title="View Source Code">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              </a>
            ` : ""}
          </div>
        </div>
      </div>
    </div>
  `).join("");

  // Attach modal trigger listeners
  grid.querySelectorAll(".inspect-portal-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const pid = btn.getAttribute("data-project-id");
      openProjectModal(pid);
    });
  });

  // Setup filter chip click listeners
  const filterButtons = document.querySelectorAll(".filter-chip");
  filterButtons.forEach(btn => {
    btn.onclick = () => {
      soundFx.playSpellChime(620);
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const chosenFilter = btn.getAttribute("data-filter");
      renderProjects(chosenFilter);
    };
  });
}

// Render Timeline
function renderTimeline() {
  const container = document.getElementById("timeline-spine");
  if (!container) return;

  container.innerHTML = timelineEvents.map((evt, idx) => {
    const isLeft = idx % 2 === 0;
    return `
      <div class="timeline-node ${isLeft ? "left" : "right"}">
        <div class="timeline-orb"></div>
        <div class="timeline-card">
          <div class="timeline-epoch">${evt.year}</div>
          <h3 class="timeline-heading">${evt.icon} ${evt.title}</h3>
          <div class="timeline-inst">${evt.institution}</div>
          <p class="timeline-desc">${evt.description}</p>
          <div class="timeline-tags">
            ${evt.tags.map(t => `<span class="timeline-tag">${t}</span>`).join("")}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Render Lore
function renderLore() {
  const grid = document.getElementById("lore-grid");
  if (!grid) return;

  grid.innerHTML = articles.map(art => `
    <div class="lore-card">
      <div class="lore-meta">
        <span>📅 ${art.date}</span>
        <span>⏳ ${art.readTime}</span>
        <span style="color: var(--portal-orange);">• ${art.category}</span>
      </div>
      <h3 class="lore-title">${art.title}</h3>
      <p class="lore-excerpt">${art.excerpt}</p>
      <button class="read-lore-btn" data-article-id="${art.id}">
        <span>Read Full Chronicle</span>
        <span>→</span>
      </button>
    </div>
  `).join("");

  grid.querySelectorAll(".read-lore-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const aid = parseInt(btn.getAttribute("data-article-id"), 10);
      openArticleModal(aid);
    });
  });
}

// Project Modal Logic with complete details
function openProjectModal(projectId) {
  const p = projects.find(item => item.id === projectId);
  if (!p) return;

  soundFx.playPortalHum();
  soundFx.playSparkCrackle();

  const target = document.getElementById("modal-content-target");
  const modal = document.getElementById("dimension-modal");
  if (!target || !modal) return;

  target.innerHTML = `
    <div class="modal-header-tag">[ ${p.dimension} // ${p.categoryLabel} ]</div>
    <h2 class="modal-title">${p.emoji} ${p.title}</h2>
    <div class="modal-subtitle">${p.tagline}</div>
    <img src="${p.image}" alt="${p.title}" class="modal-hero-img" />
    
    <div style="font-size: 1.05rem; line-height: 1.8; color: var(--text-main); margin-bottom: 1.8rem; background: rgba(0,0,0,0.25); padding: 1.2rem; border-radius: 14px; border: 1px solid var(--border-subtle);">
      ${p.longDescription}
    </div>

    <!-- Key Features & Challenges -->
    <h4 style="font-family: var(--font-tech); color: var(--portal-gold); margin-bottom: 0.8rem; letter-spacing: 0.05em; font-size: 1.1rem;">
      ⚡ ${p.challengesLabel}
    </h4>
    <ul class="modal-bullets">
      ${p.challenges.map(d => `
        <li>
          <span class="modal-bullet-glyph">✦</span>
          <span>${d}</span>
        </li>
      `).join("")}
    </ul>

    <!-- Key Deliverables & Results -->
    ${p.results && p.results.length > 0 ? `
      <h4 style="font-family: var(--font-tech); color: var(--timestone-neon); margin-top: 1.5rem; margin-bottom: 0.8rem; letter-spacing: 0.05em; font-size: 1.1rem;">
        🏆 ${p.resultsLabel || "Key Results & Deliverables"}
      </h4>
      <ul class="modal-bullets">
        ${p.results.map(r => `
          <li>
            <span class="modal-bullet-glyph" style="color: var(--timestone-neon);">✔</span>
            <span>${r}</span>
          </li>
        `).join("")}
      </ul>
    ` : ""}

    <!-- Tech Stack -->
    <div style="margin-top: 1.8rem; margin-bottom: 1.8rem;">
      <h4 style="font-family: var(--font-tech); font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.6rem; text-transform: uppercase;">
        TECHNOLOGIES & STACK
      </h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        ${p.tech.map(t => `<span class="tech-rune" style="padding: 0.4rem 0.8rem; font-size: 0.82rem;">${t}</span>`).join("")}
      </div>
    </div>

    <!-- Action Links -->
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
      ${p.links.website ? `
        <a href="${p.links.website}" target="_blank" rel="noopener noreferrer" class="btn-portal-primary" style="padding: 0.75rem 1.6rem; font-size: 0.95rem;">
          <span>🌐</span>
          <span>Visit Live Website</span>
        </a>
      ` : ""}
      ${p.links.github ? `
        <a href="${p.links.github}" target="_blank" rel="noopener noreferrer" class="btn-portal-secondary" style="padding: 0.75rem 1.6rem; font-size: 0.95rem;">
          <span>🐙</span>
          <span>View Source Code</span>
        </a>
      ` : ""}
      <button class="btn-portal-secondary modal-close-trigger" style="padding: 0.75rem 1.4rem; font-size: 0.95rem;">
        <span>Return to Nexus</span>
      </button>
    </div>
  `;

  modal.classList.add("active");
  target.querySelector(".modal-close-trigger")?.addEventListener("click", closeModal);
}

// Article Modal Logic
function openArticleModal(articleId) {
  const art = articles.find(a => a.id === articleId);
  if (!art) return;

  soundFx.playSpellChime(680);

  const target = document.getElementById("modal-content-target");
  const modal = document.getElementById("dimension-modal");
  if (!target || !modal) return;

  target.innerHTML = `
    <div class="modal-header-tag">[ MULTIVERSE CHRONICLES // ${art.category} ]</div>
    <h2 class="modal-title">${art.title}</h2>
    <div class="modal-subtitle">Published ${art.date} • ${art.readTime}</div>
    <div style="font-size: 1.05rem; line-height: 1.8; color: var(--text-main); margin-bottom: 2rem;">
      ${art.content.replace(/\n\n/g, "<br/><br/>")}
    </div>
    <button class="btn-portal-primary modal-close-trigger" style="padding: 0.7rem 1.6rem; font-size: 0.9rem;">
      <span>Close Chronicle</span>
    </button>
  `;

  modal.classList.add("active");
  target.querySelector(".modal-close-trigger")?.addEventListener("click", closeModal);
}

function closeModal() {
  const modal = document.getElementById("dimension-modal");
  if (modal) modal.classList.remove("active");
}

function setupProjectModals() {
  const modal = document.getElementById("dimension-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }
}

// Navigation with Main Portal Transition (Instruction #1)
function setupNavigation() {
  const links = document.querySelectorAll(".nav-links a");
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const navLinksContainer = document.getElementById("nav-links");

  if (mobileBtn && navLinksContainer) {
    mobileBtn.addEventListener("click", () => {
      navLinksContainer.classList.toggle("mobile-open");
    });
  }

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      const targetId = href ? href.replace("#", "") : "nexus";

      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      if (navLinksContainer) navLinksContainer.classList.remove("mobile-open");

      // Trigger full-screen circular magical portal transition!
      portalTransition.transitionTo(targetId);
    });
  });
}

// Hero Actions & Avatar Portal Trigger (Instruction #4)
function setupHeroActions(companion) {
  const exploreBtn = document.getElementById("btn-explore-dimensions");
  const summonBtn = document.getElementById("btn-summon-companion");

  if (exploreBtn) {
    exploreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      portalTransition.transitionTo("dimensions");
    });
  }

  if (summonBtn) {
    summonBtn.addEventListener("click", () => {
      companion.summonPortalTo("about");
    });
  }
}

// Audio Toggle Button
function setupAudioToggle() {
  const btn = document.getElementById("audio-toggle-btn");
  const label = document.getElementById("audio-label");
  const icon = document.getElementById("audio-icon");
  if (!btn || !label) return;

  if (soundFx.isMuted) {
    label.textContent = "FX: OFF";
    icon.textContent = "🔇";
  }

  btn.addEventListener("click", () => {
    const isMuted = soundFx.toggleMute();
    label.textContent = isMuted ? "FX: OFF" : "FX: ON";
    icon.textContent = isMuted ? "🔇" : "🔊";
    if (!isMuted) {
      soundFx.playSparkCrackle();
    }
  });
}

// Time Stone Mode Toggle
function setupTimeStoneToggle(portalEngine) {
  const btn = document.getElementById("timestone-mode-btn");
  const dial = document.getElementById("timestone-seal-interactive");

  let isTimeStone = false;

  function toggle() {
    isTimeStone = !isTimeStone;
    soundFx.playTimeStoneGliss();
    portalEngine.setTimeStoneMode(isTimeStone);

    if (isTimeStone) {
      document.body.classList.add("timestone-active");
      btn.style.borderColor = "var(--timestone-neon)";
      btn.style.boxShadow = "0 0 16px var(--timestone-glow)";
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00ffaa", "#1de9b6", "#ffffff", "#00e676"]
      });
    } else {
      document.body.classList.remove("timestone-active");
      btn.style.borderColor = "";
      btn.style.boxShadow = "";
    }
  }

  if (btn) btn.addEventListener("click", toggle);
  if (dial) dial.addEventListener("click", toggle);
}

// Interactive Whisper Button
function setupWhisperButton(companion) {
  const btn = document.getElementById("avatar-whisper-btn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    companion.triggerMagicSpell();
  });
}

// Contact Form Handler
function setupContactForm() {
  const form = document.getElementById("gateway-form");
  const submitBtn = document.getElementById("btn-transmit");
  if (!form || !submitBtn) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    soundFx.playPortalHum();
    soundFx.playSparkCrackle();

    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const subject = document.getElementById("contact-subject").value;
    const message = document.getElementById("contact-message").value;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>⚡</span><span>OPENING RIFT...</span>`;

    const rect = submitBtn.getBoundingClientRect();
    confetti({
      particleCount: 60,
      spread: 80,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      colors: ["#ffbe0b", "#fb5607", "#00ffaa", "#ffffff"]
    });

    setTimeout(() => {
      submitBtn.innerHTML = `<span>✨</span><span>FREQUENCY TRANSMITTED!</span>`;
      submitBtn.style.background = "linear-gradient(135deg, #00b377, #00ffaa)";
      submitBtn.style.color = "#000";

      setTimeout(() => {
        window.location.href = `mailto:binethmad@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Sender: " + name + " (" + email + ")\n\n" + message)}`;
        alert(`🌌 Transmission ready! Thank you ${name}. Your default mail client has been opened to dispatch directly to binethmad@gmail.com.`);
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>⚡</span><span>DISPATCH TRANSMISSION</span>`;
        submitBtn.style.background = "";
        submitBtn.style.color = "";
      }, 500);
    }, 900);
  });
}
