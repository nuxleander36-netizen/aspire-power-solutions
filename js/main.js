// Mobile menu toggle (shared by all pages)
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.getElementById("main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });
}

// Calculator tabs (look only: switches the underlined tab)
document.querySelectorAll(".calc-tabs").forEach((tabs) => {
  tabs.addEventListener("click", (e) => {
    const tab = e.target.closest(".calc-tab");
    if (!tab) return;
    tabs.querySelectorAll(".calc-tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
  });
});