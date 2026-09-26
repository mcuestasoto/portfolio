const root = document.documentElement;
root.classList.add("js");

const sections = Array.from(document.querySelectorAll("main section[id]"));
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

let scrollTicking = false;

const updateActiveSection = () => {
  if (!sections.length) return;

  const activationPoint =
    window.scrollY + Math.min(window.innerHeight * 0.3, 220);
  let currentSection = sections[0];

  sections.forEach((section) => {
    if (section.offsetTop <= activationPoint) {
      currentSection = section;
    }
  });

  setActiveNavLink(currentSection.id);
  scrollTicking = false;
};

const requestActiveSectionUpdate = () => {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(updateActiveSection);
};

window.addEventListener("scroll", requestActiveSectionUpdate, {
  passive: true,
});
window.addEventListener("resize", requestActiveSectionUpdate);
updateActiveSection();

const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");
const pageLayout = document.querySelector(".page-layout");
const mobileHeaderBrand = document.querySelector(".mobile-header__brand");
const firstMobileMenuLink = mobileMenu?.querySelector("a");

const setMobileMenuOpen = (isOpen, restoreFocus = false) => {
  if (!mobileMenu || !mobileMenuToggle) return;

  mobileMenu.classList.toggle("is-open", isOpen);
  mobileMenu.setAttribute("aria-hidden", isOpen ? "false" : "true");
  mobileMenu.inert = !isOpen;

  if (pageLayout) {
    pageLayout.inert = isOpen;
  }

  if (mobileHeaderBrand) {
    mobileHeaderBrand.inert = isOpen;
  }

  mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
  mobileMenuToggle.setAttribute(
    "aria-label",
    isOpen ? "Cerrar menú" : "Abrir menú",
  );
  document.body.classList.toggle("is-mobile-menu-open", isOpen);

  if (isOpen && firstMobileMenuLink) {
    window.requestAnimationFrame(() => firstMobileMenuLink.focus());
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
