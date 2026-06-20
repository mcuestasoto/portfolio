const root = document.documentElement;
root.classList.add("js");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!prefersReducedMotion) {
  let mouseX = 0;
  let mouseY = 0;
  let mouseFrameRequested = false;

  const updateMousePosition = () => {
    root.style.setProperty("--mouse-x", `${mouseX}px`);
    root.style.setProperty("--mouse-y", `${mouseY}px`);
    mouseFrameRequested = false;
  };

  window.addEventListener(
    "mousemove",
    (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      if (mouseFrameRequested) return;

      mouseFrameRequested = true;
      window.requestAnimationFrame(updateMousePosition);
    },
    { passive: true },
  );
}

const sections = Array.from(document.querySelectorAll("section[id]"));
const navLinks = Array.from(
  document.querySelectorAll(".nav__link, .mobile-menu__link"),
);

const setActiveNavLink = (sectionId) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;

    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const updateActiveSection = () => {
  if (!sections.length) return;

  const activationPoint =
    window.scrollY + Math.min(window.innerHeight * 0.35, 260);
  let currentSection = sections[0];

  sections.forEach((section) => {
    if (section.offsetTop <= activationPoint) {
      currentSection = section;
    }
  });

  setActiveNavLink(currentSection.id);
};

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetId = link.getAttribute("href")?.replace("#", "");

    if (targetId) {
      setActiveNavLink(targetId);
    }
  });
});

const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");

const setScrollbarCompensation = (isOpen) => {
  const scrollbarWidth = isOpen
    ? Math.max(window.innerWidth - document.documentElement.clientWidth, 0)
    : 0;

  root.style.setProperty("--scrollbar-compensation", `${scrollbarWidth}px`);
};

const setMobileMenuOpen = (isOpen, restoreFocus = false) => {
  if (!mobileMenu || !mobileMenuToggle) return;

  if (isOpen) {
    setScrollbarCompensation(true);
  }

  mobileMenu.classList.toggle("is-open", isOpen);
  mobileMenu.setAttribute("aria-hidden", isOpen ? "false" : "true");
  mobileMenuToggle.setAttribute("aria-expanded", isOpen.toString());
  mobileMenuToggle.setAttribute(
    "aria-label",
    isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación",
  );
  document.body.classList.toggle("is-mobile-menu-open", isOpen);

  if (!isOpen) {
    setScrollbarCompensation(false);
  }

  if (!isOpen && restoreFocus) {
    mobileMenuToggle.focus();
  }
};

if (mobileMenu && mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    const isOpen = mobileMenuToggle.getAttribute("aria-expanded") === "true";

    setMobileMenuOpen(!isOpen);
  });

  mobileMenu.addEventListener("click", (event) => {
    if (event.target === mobileMenu) {
      setMobileMenuOpen(false, true);
    }
  });

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setMobileMenuOpen(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      mobileMenuToggle.getAttribute("aria-expanded") === "true"
    ) {
      setMobileMenuOpen(false, true);
    }
  });

  window.addEventListener("resize", () => {
    if (
      window.innerWidth > 980 &&
      mobileMenuToggle.getAttribute("aria-expanded") === "true"
    ) {
      setMobileMenuOpen(false);
    }
  });
}

const projectCards = document.querySelectorAll("[data-project-card]");

projectCards.forEach((card) => {
  const setProjectCardFlipped = (isFlipped) => {
    card.classList.toggle("is-flipped", isFlipped);
    card.setAttribute("aria-expanded", isFlipped.toString());

    if (!isFlipped) {
      card.blur();
    }
  };

  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;

    setProjectCardFlipped(!card.classList.contains("is-flipped"));
  });

  card.addEventListener("keydown", (event) => {
    if (event.target.closest("a")) return;
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    setProjectCardFlipped(!card.classList.contains("is-flipped"));
  });
});

const revealElements = document.querySelectorAll(".reveal");

if (prefersReducedMotion) {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}

const backToTopButton = document.querySelector(".back-to-top");
let ticking = false;

const updateScrollUI = () => {
  const scrollTop = window.scrollY;
  const documentHeight = root.scrollHeight - window.innerHeight;
  const progress = documentHeight > 0 ? scrollTop / documentHeight : 0;

  root.style.setProperty("--scroll-progress", progress.toString());

  updateActiveSection();

  if (backToTopButton) {
    backToTopButton.classList.toggle("is-visible", scrollTop > 500);
  }

  ticking = false;
};

const requestScrollUpdate = () => {
  if (ticking) return;

  ticking = true;
  window.requestAnimationFrame(updateScrollUI);
};

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", requestScrollUpdate);

updateScrollUI();

if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });
}

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    const mobileHeader = document.querySelector(".mobile-header");
    const headerOffset =
      window.innerWidth <= 980 && mobileHeader
        ? mobileHeader.offsetHeight + 4
        : 24;

    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});
