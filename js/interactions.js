document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. SAFE GSAP MINIMALIST HERO ENTRANCE ANIMATION (STATIC TITLE)
  // ==========================================================================
  // We use fromTo for hero elements so they never remain stuck at opacity: 0.
  // All section cards (.edu-card, .objective-card, .exhibition-card, etc.)
  // are kept 100% visible by default without scroll-trigger hiding.
  if (typeof gsap !== 'undefined') {
    gsap.fromTo('.hero-minimal-badge', 
      { opacity: 0, y: -15 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", clearProps: "all" }
    );
    gsap.fromTo('.hero-minimal-name', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, delay: 0.1, ease: "power3.out", clearProps: "all" }
    );
    gsap.fromTo('.hero-minimal-subtitle', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, delay: 0.25, ease: "power3.out", clearProps: "all" }
    );
    gsap.fromTo('.hero-actions-row', 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, duration: 0.7, delay: 0.4, ease: "power2.out", clearProps: "all" }
    );
  }
});
