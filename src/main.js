// ==========================================================================
// MULTI-UNIVERSE PORTFOLIO - CORE APPLICATION CONTROLLER
// Binethma Jayawickrama
// ==========================================================================

import { StarfieldEngine, CursorSparks, PortalEngine } from "./portal-canvas.js";
import { soundFx } from "./audio.js";
import { SorceressAvatarController } from "./avatar.js";
import { projects, skillsData, timelineEvents, articles } from "./projects-data.js";
import confetti from "canvas-confetti";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Canvas Engines
  const starfield = new StarfieldEngine("space-canvas");
  const cursorSparks = new CursorSparks("cursor-canvas");
  const portalEngine = new PortalEngine("portal-canvas");

  // 2. Initialize Companion Avatar
  const companion = new SorceressAvatarController();

  // 3. Dynamic Typewriter Effect for Subtitle
  initTypewriter();

  // 4. Render Dynamic Sections
  renderSkills();
  renderProjects("all");
  renderTimeline();
  renderLore();

  // 5. Setup Interactive Event Listeners
  setupNavigation();
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
    "Full-Stack Sorcerer • IoT Reality Crafter • Creative AI Engineer",
    "Undergraduate Scholar @ IIT Sri Lanka & University of Westminster",
    "Inventor of the Smart Tail Pod • Architect of Adorix AI Kiosks",
    "Bridging Physical Microcontrollers with Multiverse Web Realities"
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
        setTimeout(typeStep, 2200);
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

    const speed = isDeleting ? 30 : 65;
    setTimeout(typeStep, speed);
  }

  typeStep();
}

// Render Skills Section
function renderSkills() {
  const tabsContainer = document.getElementById("skills-tabs");
  const displayContainer = document.getElementById("skills-display-panel");
  if (!tabsContainer || !displayContainer) return;

  tabsContainer.innerHTML = "";
  skillsData.forEach((skillGroup, idx) => {
    const tab = document.createElement("button");
    tab.className = `skill-category-tab ${idx === 0 ? "active" : ""}`;
    tab.setAttribute("data-index", idx);
    tab.innerHTML = `
      <div class="tab-glyph">✨</div>
      <span>${skillGroup.category}</span>
    `;

    tab.addEventListener("click", () => {
      soundFx.playSpellChime(500 + idx * 80);
      document.querySelectorAll(".skill-category-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      showSkillGroup(idx);
    });

    tabsContainer.appendChild(tab);
  });

  function showSkillGroup(idx) {
    const group = skillsData[idx];
    displayContainer.innerHTML = `
      <div class="skill-panel-header">
        <h3 class="panel-title">${group.category}</h3>
        <p class="panel-desc">${group.description}</p>
      </div>
      <div class="skills-list">
        ${group.items.map(item => `
          <div class="skill-row">
            <div class="skill-row-top">
              <span>${item.name}</span>
              <span class="skill-mastery">${item.level} [${item.xp}]</span>
            </div>
            <div class="skill-track">
              <div class="skill-fill" style="width: ${item.xp};"></div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  // Initial render
  showSkillGroup(0);
}

// Render Projects
function renderProjects(filter = "all") {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const filtered = filter === "all" ? projects : projects.filter(p => p.category === filter);

  grid.innerHTML = filtered.map(p => `
    <div class="dimension-card" data-id="${p.id}">
      <div class="card-media-wrapper">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
        <span class="card-dimension-tag">${p.dimension}</span>
        <span class="card-badge">${p.badge}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${p.title}</h3>
        <div class="card-subtitle">${p.subtitle}</div>
        <p class="card-summary">${p.summary}</p>
        <div class="tech-runes">
          ${p.tech.slice(0, 4).map(t => `<span class="tech-rune">${t}</span>`).join("")}
        </div>
        <div class="card-footer">
          <button class="inspect-portal-btn" data-project-id="${p.id}">
            <span>🔮</span>
            <span>Inspect Realm</span>
          </button>
          <div class="card-links">
            <a href="${p.links.github}" target="_blank" rel="noopener noreferrer" class="card-icon-link" title="Source Coordinates">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join("");

  // Attach modal trigger listeners to all inspect buttons
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
          <h3 class="timeline-heading">${evt.title}</h3>
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
        <span>Read Chronicle</span>
        <span>→</span>
      </button>
    </div>
  `).join("");

  grid.querySelectorAll(".read-lore-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const aid = btn.getAttribute("data-article-id");
      openArticleModal(aid);
    });
  });
}

// Project Modal Logic
function openProjectModal(projectId) {
  const p = projects.find(item => item.id === projectId);
  if (!p) return;

  soundFx.playPortalHum();
  soundFx.playSparkCrackle();

  const target = document.getElementById("modal-content-target");
  const modal = document.getElementById("dimension-modal");
  if (!target || !modal) return;

  target.innerHTML = `
    <div class="modal-header-tag">[ ${p.dimension} // ${p.badge} ]</div>
    <h2 class="modal-title">${p.title}</h2>
    <div class="modal-subtitle">${p.subtitle}</div>
    <img src="${p.image}" alt="${p.title}" class="modal-hero-img" />
    <p style="font-size: 1.05rem; line-height: 1.8; color: var(--text-main); margin-bottom: 1.5rem;">
      ${p.summary}
    </p>
    <h4 style="font-family: var(--font-tech); color: var(--portal-gold); margin-bottom: 0.8rem; letter-spacing: 0.05em;">
      ARCHITECTURAL BREAKTHROUGHS
    </h4>
    <ul class="modal-bullets">
      ${p.details.map(d => `
        <li>
          <span class="modal-bullet-glyph">✦</span>
          <span>${d}</span>
        </li>
      `).join("")}
    </ul>
    <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.2rem; margin-bottom: 1.8rem;">
      <h4 style="font-family: var(--font-tech); font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.6rem;">
        DIMENSIONAL TELEMETRY METRICS
      </h4>
      <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
        ${Object.entries(p.metrics).map(([k, v]) => `
          <div>
            <span style="display: block; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase;">${k}</span>
            <strong style="font-family: var(--font-tech); font-size: 1.05rem; color: var(--portal-gold);">${v}</strong>
          </div>
        `).join("")}
      </div>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <a href="${p.links.github}" target="_blank" rel="noopener noreferrer" class="btn-portal-primary" style="padding: 0.7rem 1.6rem; font-size: 0.9rem;">
        <span>🐙</span>
        <span>View Code Coordinates</span>
      </a>
      <button class="btn-portal-secondary modal-close-trigger" style="padding: 0.7rem 1.4rem; font-size: 0.9rem;">
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
    <div style="font-size: 1rem; line-height: 1.8; color: var(--text-main); margin-bottom: 2rem;">
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

// Navigation & Smooth Scroll
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
    link.addEventListener("click", () => {
      soundFx.playSpellChime(700);
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      if (navLinksContainer) navLinksContainer.classList.remove("mobile-open");
    });
  });
}

// Audio Toggle Button
function setupAudioToggle() {
  const btn = document.getElementById("audio-toggle-btn");
  const label = document.getElementById("audio-label");
  const icon = document.getElementById("audio-icon");
  if (!btn || !label) return;

  // Initial state check
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

    // Confetti burst from button position
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

      // Form reset & polite feedback
      setTimeout(() => {
        alert(`🌌 Transmission dispatched to Binethma Jayawickrama across Universe-616!\n\nThank you ${name}. Your message has been logged.`);
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>⚡</span><span>DISPATCH TRANSMISSION SPELL</span>`;
        submitBtn.style.background = "";
        submitBtn.style.color = "";
      }, 600);
    }, 900);
  });
}
