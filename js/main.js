document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. LIGHT & DARK THEME TOGGLE (BOTANICAL LAB SYSTEM)
  // ==========================================================================
  const themeToggleBtn = document.getElementById("theme-pill-btn");
  
  const getTheme = () => {
    return document.documentElement.getAttribute("data-theme") || "dark";
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    
    const darkMeta = document.querySelector('meta[name="theme-color"][media*="dark"]');
    const lightMeta = document.querySelector('meta[name="theme-color"][media*="light"]');
    if (darkMeta) darkMeta.setAttribute("content", theme === "dark" ? "#070e0a" : "#f2f7f4");
    if (lightMeta) lightMeta.setAttribute("content", theme === "light" ? "#f2f7f4" : "#070e0a");
  };

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = getTheme();
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    });
  }

  // ==========================================================================
  // 2. PATHOSYSTEM LAB DECK (INTERACTIVE TAB SWITCHER)
  // ==========================================================================
  const tabButtons = document.querySelectorAll(".deck-tab-btn");
  const tabContents = document.querySelectorAll(".deck-tab-content");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");

      // Remove active from all buttons & contents
      tabButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      // Activate clicked button and target tab
      btn.classList.add("active");
      const activeContent = document.getElementById(targetTab);
      if (activeContent) {
        activeContent.classList.add("active");
      }
    });
  });

  // ==========================================================================
  // 3. COPY TO CLIPBOARD FOR PHONE & EMAIL
  // ==========================================================================
  const copyButtons = document.querySelectorAll("[data-copy]");
  copyButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute("data-copy");
      navigator.clipboard.writeText(textToCopy).then(() => {
        const hintEl = btn.querySelector(".copy-hint");
        const originalHint = hintEl ? hintEl.textContent : "";
        if (hintEl) {
          hintEl.textContent = "COPIED ✓";
          hintEl.style.background = "var(--accent-spore)";
          hintEl.style.color = "#070e0a";
          setTimeout(() => {
            hintEl.textContent = originalHint;
            hintEl.style.background = "";
            hintEl.style.color = "";
          }, 2000);
        }
      }).catch(err => {
        console.error("Failed to copy:", err);
      });
    });
  });

  // ==========================================================================
  // 4. CONTACT FORM HANDLER
  // ==========================================================================
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector("button[type='submit']");
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = "SENDING TRANSMISSION...";
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = "TRANSMISSION SENT SUCCESSFULLY ✓";
        submitBtn.style.background = "var(--accent-spore)";
        submitBtn.style.color = "#070e0a";
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = "";
          submitBtn.style.color = "";
          submitBtn.disabled = false;
        }, 3000);
      }, 1000);
    });
  }

  // ==========================================================================
  // 5. ACTIVE NAV LINK HIGHLIGHTING
  // ==========================================================================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".capsule-link");

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: "-20% 0px -60% 0px"
  });

  sections.forEach(section => navObserver.observe(section));
});
