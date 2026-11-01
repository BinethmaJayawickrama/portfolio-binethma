// ==========================================================================
// SCROLL ANIMATIONS COMPONENT
// Smooth, non-aggressive reveals for headings, cards, and sections
// ==========================================================================

import gsap from "gsap";

export function initScrollAnimations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  // Reveal Section Titles and Tags
  const headers = document.querySelectorAll(".section-header");
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const title = entry.target.querySelector(".section-title");
        const tag = entry.target.querySelector(".section-tag");
        const desc = entry.target.querySelector(".section-desc");

        const tl = gsap.timeline();
        if (tag) tl.fromTo(tag, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
        if (title) tl.fromTo(title, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");
        if (desc) tl.fromTo(desc, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");

        headerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  headers.forEach(h => headerObserver.observe(h));

  // Reveal Cards with smooth stagger
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.fromTo(entry.target, 
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }
        );
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".dimension-card, .pillar-card, .lore-card, .timeline-card").forEach(el => {
    cardObserver.observe(el);
  });
}
