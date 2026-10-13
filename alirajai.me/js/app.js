const header = document.querySelector("[data-header]");
const loader = document.querySelector(".loader");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

window.addEventListener("load", () => {
  if (window.gsap) {
    gsap.to(loader, { autoAlpha: 0, duration: 0.7, delay: 0.35, ease: "power2.out" });
    gsap.from(".hero .reveal", { y: 36, opacity: 0, duration: 0.85, stagger: 0.12, delay: 0.5, ease: "power3.out" });
    bootGsap();
    setTimeout(() => {
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }, 400);
  } else {
    loader.style.display = "none";
  }
});

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
});

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Contact floating menu logic
const contactMenu = document.querySelector(".contact-menu");
const contactToggle = document.querySelector(".whatsapp-float");

if (contactMenu && contactToggle) {
  contactToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isActive = contactMenu.classList.toggle("is-active");
    contactToggle.setAttribute("aria-expanded", String(isActive));
  });

  document.addEventListener("click", (event) => {
    if (!contactMenu.contains(event.target)) {
      contactMenu.classList.remove("is-active");
      contactToggle.setAttribute("aria-expanded", "false");
    }
  });
}

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Dynamic Active Nav Indicator (ScrollSpy)
const siteNavLinks = document.querySelectorAll(".site-nav a:not(.nav-cta)");
const trackedSections = Array.from(siteNavLinks)
  .map((link) => {
    const hash = link.getAttribute("href");
    if (hash && hash.startsWith("#")) {
      const section = document.querySelector(hash);
      return section ? { link, section } : null;
    }
    return null;
  })
  .filter(Boolean);

const updateActiveNav = () => {
  const scrollY = window.scrollY;
  const triggerPoint = scrollY + 220;
  let activeEntry = null;

  for (let i = 0; i < trackedSections.length; i++) {
    const { section } = trackedSections[i];
    const top = section.offsetTop;
    const height = section.offsetHeight;

    if (triggerPoint >= top && triggerPoint < top + height) {
      activeEntry = trackedSections[i];
      break;
    }
  }

  // If user reaches the bottom of page, activate Contact
  const isAtBottom = (window.innerHeight + scrollY) >= (document.documentElement.scrollHeight - 70);
  if (isAtBottom && trackedSections.length > 0) {
    activeEntry = trackedSections[trackedSections.length - 1];
  }

  siteNavLinks.forEach((link) => link.classList.remove("is-active"));
  if (activeEntry) {
    activeEntry.link.classList.add("is-active");
  }
};

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("resize", updateActiveNav, { passive: true });
updateActiveNav();

if (window.matchMedia("(pointer: fine)").matches) {
  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let isTicking = false;

  const updateCursor = () => {
    ringX += (mouseX - ringX) * 0.22;
    ringY += (mouseY - ringY) * 0.22;

    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

    if (Math.abs(mouseX - ringX) > 0.1 || Math.abs(mouseY - ringY) > 0.1) {
      requestAnimationFrame(updateCursor);
    } else {
      isTicking = false;
    }
  };

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursorDot.style.opacity = "1";
    cursorRing.style.opacity = "1";

    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(updateCursor);
    }
  });

  document.addEventListener("mouseleave", () => {
    cursorDot.style.opacity = "0";
    cursorRing.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursorDot.style.opacity = "1";
    cursorRing.style.opacity = "1";
  });

  // Magnetic hover effect on buttons & links
  document.querySelectorAll("a, button, .magnetic").forEach((item) => {
    item.addEventListener("mouseenter", () => cursorRing.classList.add("is-active"));
    item.addEventListener("mouseleave", () => {
      cursorRing.classList.remove("is-active");
      item.style.transform = "";
    });
    item.addEventListener("mousemove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      item.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });
  });

  // Tilt Card effect with smooth recovery
  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${y * -6}deg) rotateY(${x * 8}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });
  });
}

const bootGsap = () => {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  // Configure ScrollTrigger for maximum stability and zero-lag recovery
  ScrollTrigger.config({ limitCallbacks: true, syncInterval: 100 });

  let mm = gsap.matchMedia();

  // --- DESKTOP 3D SIGNATURE ANIMATIONS (min-width: 821px) ---
  mm.add("(min-width: 821px)", () => {
    // 1. HERO SECTION: Signature 3D Text Slide-Behind & Profile Card Tilt
    gsap.set(".hero__visual", { zIndex: 10 });
    gsap.set(".hero__content", { zIndex: 1 });

    // Ensure hero elements start at exact natural position
    gsap.set(".hero__content > *", { x: 0, opacity: 1 });
    gsap.set(".hero-image-wrapper", { y: 0, x: 0, rotationZ: 0, scale: 1 });

    // Hero Text slides behind profile picture on scroll down
    gsap.to(".hero__content > *", {
      x: 360,
      opacity: 0.22,
      stagger: 0.04,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
        invalidateOnRefresh: true,
        fastScrollEnd: true
      }
    });

    // Hero Profile Card 3D Parallax & Rotation
    gsap.to(".hero-image-wrapper", {
      y: 75,
      x: 25,
      rotationZ: 6,
      scale: 0.96,
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
        invalidateOnRefresh: true,
        fastScrollEnd: true
      }
    });

    // 2. ABOUT SECTION: Signature 3D Door Swing Entrance
    gsap.set(".about", { perspective: 1400 });
    gsap.set([".about__panel", ".about__stack"], { clearProps: "transform,opacity", opacity: 1 });

    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about",
        start: "top 90%",
        end: "bottom 15%",
        scrub: 0.9,
        invalidateOnRefresh: true,
        fastScrollEnd: true
      }
    });

    // Phase 1: Panels swing open dramatically in 3D as section enters
    aboutTl.fromTo(".about__panel",
      { rotationY: -45, x: -65, opacity: 0.15, transformOrigin: "right center" },
      { rotationY: 0, x: 0, opacity: 1, transformOrigin: "right center", ease: "power2.out", duration: 1.2 },
      0
    );
    aboutTl.fromTo(".about__stack",
      { rotationY: 45, x: 65, opacity: 0.15, transformOrigin: "left center" },
      { rotationY: 0, x: 0, opacity: 1, transformOrigin: "left center", ease: "power2.out", duration: 1.2 },
      0
    );

    // Skills badges pop in with dynamic spring physics when door opens
    gsap.fromTo(".about__stack span",
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.07,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".about__stack", start: "top 82%", once: true }
      }
    );

    // 3. SERVICES SECTION: 3D Stagger Entrance
    gsap.fromTo(".service-card",
      { y: 55, opacity: 0, rotationX: 8, transformPerspective: 1000 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: ".services", start: "top 85%", once: true }
      }
    );

    // 4. PORTFOLIO SECTION: Signature 3D Scrub Card Reveal with Dynamic Tilt
    gsap.set(".portfolio", { perspective: 1400 });

    const portfolioEnterTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".portfolio",
        start: "top 88%",
        end: "top 20%",
        scrub: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true
      }
    });

    portfolioEnterTl.fromTo(".portfolio .section-heading",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, ease: "power2.out", duration: 0.6 },
      0
    );

    const workCards = gsap.utils.toArray(".work-card");
    workCards.forEach((card, i) => {
      const isLeft = i % 2 === 0;
      portfolioEnterTl.fromTo(card,
        {
          y: 130 + (i >= 2 ? 30 : 0),
          opacity: 0,
          rotationY: isLeft ? -14 : 14,
          rotationX: 8,
          transformPerspective: 1200
        },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          rotationX: 0,
          ease: "power2.out",
          duration: 1
        },
        0.1 + i * 0.1
      );
    });

    // 5. CERTIFICATES SECTION: 3D Floating Reveal
    gsap.set(".certificates", { perspective: 1400 });
    gsap.fromTo(".cert-card",
      { y: 65, opacity: 0, rotationX: 6, transformPerspective: 1000 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: ".certificates", start: "top 85%", once: true }
      }
    );

    // 6. TIMELINE MILESTONES: Smooth Staggered Progression
    gsap.fromTo(".timeline__item",
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: { trigger: ".timeline", start: "top 85%", once: true }
      }
    );

    // 7. CONTACT SECTION: Cinematic 3D Depth Card
    gsap.fromTo(".contact__card",
      { scale: 0.92, y: 50, rotationX: 5, transformPerspective: 1000, opacity: 0 },
      {
        scale: 1,
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power2.out",
        scrollTrigger: { trigger: ".contact", start: "top 85%", once: true }
      }
    );

    // 8. AMBIENT BACKGROUND BLOBS: Smooth Parallax
    gsap.to(".ambient--one", { yPercent: 18, scrollTrigger: { scrub: true } });
    gsap.to(".ambient--two", { yPercent: -18, scrollTrigger: { scrub: true } });
  });

  ScrollTrigger.refresh();
};

// Copy Email to Clipboard helper
document.querySelectorAll("[data-copy-email]").forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = btn.getAttribute("data-copy-email") || "alirajai.dev@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      const originalText = btn.innerHTML;
      btn.innerHTML = `<span>Copied to Clipboard! ✓</span>`;
      setTimeout(() => {
        btn.innerHTML = originalText;
      }, 2400);
    } catch (err) {
      window.location.href = `mailto:${email}`;
    }
  });
});

// ==========================================================================
// Certificates Slider & Lightbox Modal Logic
// ==========================================================================
const certSlider = document.getElementById("certSlider");
const certPrevBtn = document.getElementById("certPrevBtn");
const certNextBtn = document.getElementById("certNextBtn");
const certCounter = document.getElementById("certCounter");
const certCards = document.querySelectorAll(".cert-card");

if (certSlider && certCards.length > 0) {
  const updateSliderState = () => {
    const scrollLeft = certSlider.scrollLeft;
    const card = certCards[0];
    const cardWidth = card ? card.offsetWidth : 360;
    const gap = 24;
    const scrollStep = cardWidth + gap;

    const activeIndex = Math.min(
      certCards.length,
      Math.max(1, Math.round(scrollLeft / scrollStep) + 1)
    );

    if (certCounter) {
      certCounter.textContent = `${String(activeIndex).padStart(2, '0')} / ${String(certCards.length).padStart(2, '0')}`;
    }

    const maxScroll = certSlider.scrollWidth - certSlider.clientWidth - 10;
    if (certPrevBtn) certPrevBtn.disabled = scrollLeft <= 10;
    if (certNextBtn) certNextBtn.disabled = scrollLeft >= maxScroll;
  };

  certSlider.addEventListener("scroll", updateSliderState, { passive: true });

  const getScrollAmount = () => {
    const card = certCards[0];
    const gap = 24;
    return card ? card.offsetWidth + gap : 360;
  };

  if (certPrevBtn) {
    certPrevBtn.addEventListener("click", () => {
      certSlider.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    });
  }

  if (certNextBtn) {
    certNextBtn.addEventListener("click", () => {
      certSlider.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    });
  }

  // Keyboard navigation when slider is focused
  certSlider.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      certSlider.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    } else if (e.key === "ArrowRight") {
      certSlider.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    }
  });

  // Initial update
  updateSliderState();
}

// Lightbox Modal
const certModal = document.getElementById("certModal");
const certModalBackdrop = document.getElementById("certModalBackdrop");
const certModalClose = document.getElementById("certModalClose");
const certModalImg = document.getElementById("certModalImg");
const certModalTitle = document.getElementById("certModalTitle");
const certModalIssuer = document.getElementById("certModalIssuer");
const certModalDate = document.getElementById("certModalDate");
const certModalVerifyBtn = document.getElementById("certModalVerifyBtn");

const openCertModal = (data) => {
  if (!certModal) return;
  if (certModalImg) {
    certModalImg.src = data.img || "";
    certModalImg.alt = data.title || "Certificate Preview";
  }
  if (certModalTitle) certModalTitle.textContent = data.title || "Certificate";
  if (certModalIssuer) certModalIssuer.innerHTML = data.issuer || "";
  if (certModalDate) certModalDate.innerHTML = data.date || "";
  if (certModalVerifyBtn) {
    if (data.link) {
      certModalVerifyBtn.href = data.link;
      certModalVerifyBtn.style.display = "inline-flex";
      const verifyText = document.getElementById("certModalVerifyText") || certModalVerifyBtn;
      if (data.credId) {
        certModalVerifyBtn.setAttribute("data-copy-cred", data.credId);
        verifyText.textContent = `Verify at DigiSkills (Copy ID: ${data.credId}) ↗`;
      } else {
        certModalVerifyBtn.removeAttribute("data-copy-cred");
        verifyText.textContent = "Verify Credential Online ↗";
      }
    } else {
      certModalVerifyBtn.style.display = "none";
    }
  }

  certModal.classList.add("is-open");
  certModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeCertModal = () => {
  if (!certModal) return;
  certModal.classList.remove("is-open");
  certModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

document.querySelectorAll(".cert-media-trigger").forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    const img = trigger.getAttribute("data-img") || trigger.closest("[data-img]")?.getAttribute("data-img");
    const title = trigger.getAttribute("data-title") || trigger.closest("[data-title]")?.getAttribute("data-title");
    const issuer = trigger.getAttribute("data-issuer") || trigger.closest("[data-issuer]")?.getAttribute("data-issuer");
    const date = trigger.getAttribute("data-date") || trigger.closest("[data-date]")?.getAttribute("data-date");
    const link = trigger.getAttribute("data-link") || trigger.closest("[data-link]")?.getAttribute("data-link");
    const credId = trigger.getAttribute("data-cred-id") || trigger.closest("[data-cred-id]")?.getAttribute("data-cred-id");

    openCertModal({ img, title, issuer, date, link, credId });
  });

  trigger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      trigger.click();
    }
  });
});

if (certModalClose) certModalClose.addEventListener("click", closeCertModal);
if (certModalBackdrop) certModalBackdrop.addEventListener("click", closeCertModal);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && certModal && certModal.classList.contains("is-open")) {
    closeCertModal();
  }
});

// ==========================================================================
// Auto-Copy Credential ID & Notification on Verify Click
// ==========================================================================
const showCertToast = (message) => {
  const toast = document.getElementById("certToast");
  const toastText = document.getElementById("certToastText");
  if (!toast) return;
  if (toastText) toastText.textContent = message;
  toast.classList.add("is-active");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove("is-active");
  }, 4000);
};

document.addEventListener("click", async (e) => {
  const copyBtn = e.target.closest("[data-copy-cred]");
  if (!copyBtn) return;
  const credId = copyBtn.getAttribute("data-copy-cred");
  if (!credId) return;

  // 1. Copy credential ID to clipboard
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(credId);
    } else {
      const tempInput = document.createElement("input");
      tempInput.value = credId;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    }
  } catch (err) {
    console.error("Clipboard copy error:", err);
  }

  // 2. Immediate visual feedback on the button
  const labelSpan = copyBtn.querySelector("span") || copyBtn;
  const originalHtml = labelSpan.innerHTML;
  labelSpan.innerHTML = `<span>Copied: ${credId} ✓ (Opening...)</span>`;
  setTimeout(() => {
    labelSpan.innerHTML = originalHtml;
  }, 2800);

  // 3. Show luxury toast notification
  showCertToast(`✓ Credential ID "${credId}" copied to clipboard! Paste it on DigiSkills verification page.`);
});

