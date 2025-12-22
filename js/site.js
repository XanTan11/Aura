(() => {
  const qs = (s, p = document) => p.querySelector(s);
  const qsa = (s, p = document) => [...p.querySelectorAll(s)];

  // ===== Mobile nav =====
  const burger = qs("#burger");
  const mobile = qs("#mobileNav");
  if (burger && mobile) {
    const closeMobile = () => {
      mobile.style.display = "none";
      mobile.setAttribute("aria-hidden", "true");
      burger.setAttribute("aria-expanded", "false");
    };

    const openMobile = () => {
      mobile.style.display = "block";
      mobile.setAttribute("aria-hidden", "false");
      burger.setAttribute("aria-expanded", "true");
    };

    closeMobile();

    burger.addEventListener("click", () => {
      const expanded = burger.getAttribute("aria-expanded") === "true";
      if (expanded) closeMobile();
      else openMobile();
    });

    qsa("a", mobile).forEach(a => {
      a.addEventListener("click", () => closeMobile());
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) closeMobile();
    });
  }

  // ===== Reveal on scroll =====
  const revealEls = qsa(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.14 });
  revealEls.forEach(el => io.observe(el));

  // ===== Count-up stats (hero) =====
  const counters = qsa("[data-count]");
  const animateCount = (el) => {
    const to = Number(el.getAttribute("data-count") || "0");
    const dur = 700;
    const start = performance.now();
    const from = 0;

    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const val = Math.round(from + (to - from) * (p * (2 - p)));
      el.textContent = String(val);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const ioCount = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target);
        ioCount.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach(el => ioCount.observe(el));

  // ===== Modal logic (cards -> modal) =====
  const modal = qs("#modal");
  const mTitle = qs("#mTitle");
  const mRole = qs("#mRole");
  const mImg = qs("#mImg");
  const mMeta = qs("#mMeta");
  const mExtra = qs("#mExtra");
  const captainBadge = qs("#captainBadge");

  const openModal = (card) => {
    if (!modal) return;

    const title = card.getAttribute("data-title") || "";
    const role = card.getAttribute("data-role") || "";
    const meta = card.getAttribute("data-meta") || "";
    const extra = card.getAttribute("data-extra") || "";
    const img = card.getAttribute("data-img") || "";

    if (mTitle) mTitle.textContent = title;
    if (mRole) mRole.textContent = role;
    if (mMeta) mMeta.textContent = meta;
    if (mExtra) mExtra.textContent = extra;

    if (mImg) {
      mImg.alt = title || "Фото";
      mImg.src = img;
    }

    const isCaptain = card.getAttribute("data-captain") === "true";
    if (captainBadge) {
      captainBadge.hidden = !isCaptain;
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  // Open modal from button click
  qsa(".card").forEach(card => {
    const btn = qs(".card__btn", card);
    if (btn) {
      btn.addEventListener("click", () => openModal(card));
    }
    // Also allow clicking the card (not the button) if you want:
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter") openModal(card);
    });
    card.tabIndex = 0;
  });

  // Close handlers
  if (modal) {
    modal.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.matches("[data-close='true']")) closeModal();
    });
  }
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // ===== Smooth scroll for anchor links =====
  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = qs(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ===== Logo tilt based on mouse (desktop) =====
  const logo = qs("#auraLogo");
  const frame = logo ? logo.closest(".logoFrame") : null;
  if (logo && frame) {
    const onMove = (e) => {
      const r = frame.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      frame.style.transform = `rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
    };
    const reset = () => (frame.style.transform = "");

    frame.addEventListener("mousemove", onMove);
    frame.addEventListener("mouseleave", reset);
  }
})();