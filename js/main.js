// ── Sticky navbar ───────────────────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// ── Scroll reveal ───────────────────────────────────────────
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
revealEls.forEach((el) => observer.observe(el));

// ── Newsletter submit ───────────────────────────────────────
document.querySelectorAll(".footer-newsletter button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = btn.previousElementSibling;
    if (input.value.trim()) {
      btn.textContent = "✓ Sent";
      btn.classList.add("newsletter-sent");
      input.value = "";
      setTimeout(() => {
        btn.textContent = "Submit";
        btn.classList.remove("newsletter-sent");
      }, 3000);
    }
  });
});

// ── Smooth highlight active nav link ───────────────────────
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${current}`;
    link.classList.toggle("nav-link-active", isActive);
  });
});

// ── FAQ plus/minus icon state (Bootstrap collapse) ──────────
const faqAccordion = document.getElementById("faqAccordion");
if (faqAccordion) {
  faqAccordion.querySelectorAll(".accordion-button").forEach((btn) => {
    const plus = btn.querySelector(".faq-plus-icon");
    const minus = btn.querySelector(".faq-minus-icon");

    const sync = () => {
      const expanded = !btn.classList.contains("collapsed");
      if (plus) plus.style.display = expanded ? "none" : "inline-flex";
      if (minus) minus.style.display = expanded ? "inline-flex" : "none";
    };

    sync();

    btn.addEventListener("show.bs.collapse", sync);
    btn.addEventListener("hide.bs.collapse", sync);
  });

  // Also listen on the collapse elements (more reliable across Bootstrap versions)
  faqAccordion.querySelectorAll(".accordion-collapse").forEach((collapseEl) => {
    collapseEl.addEventListener("show.bs.collapse", () => {
      const targetId = collapseEl.getAttribute("id");
      const btn = faqAccordion.querySelector(
        `.accordion-button[data-bs-target="#${targetId}"]`,
      );
      if (!btn) return;
      const plus = btn.querySelector(".faq-plus-icon");
      const minus = btn.querySelector(".faq-minus-icon");
      if (plus) plus.style.display = "none";
      if (minus) minus.style.display = "inline-flex";
    });
    collapseEl.addEventListener("hide.bs.collapse", () => {
      const targetId = collapseEl.getAttribute("id");
      const btn = faqAccordion.querySelector(
        `.accordion-button[data-bs-target="#${targetId}"]`,
      );
      if (!btn) return;
      const plus = btn.querySelector(".faq-plus-icon");
      const minus = btn.querySelector(".faq-minus-icon");
      if (plus) plus.style.display = "inline-flex";
      if (minus) minus.style.display = "none";
    });
  });
}
