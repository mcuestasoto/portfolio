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
  document.querySelectorAll(".nav__link, .mobile-nav__link"),
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

  const activationPoint = window.scrollY + Math.min(window.innerHeight * 0.35, 260);
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
        ? mobileHeader.offsetHeight + 12
        : 24;

    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});