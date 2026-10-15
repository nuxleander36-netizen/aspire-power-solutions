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

// Home hero: the highlighted word types itself out, stays for 5 seconds,
// is deleted, then the next word is typed.
const typedEl = document.getElementById("typed-word");

if (typedEl) {
  const words = ["Home", "Business", "School", "Hotel", "Clinic", "Office"];
  const typeSpeed = 120;       // ms per letter while typing
  const deleteSpeed = 60;      // ms per letter while deleting
  const holdTime = 5000;       // how long each word stays (5 seconds)
  const pauseBeforeNext = 400; // short pause before the next word starts
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let wordIndex = 0;
  let letterCount = 0;
  let deleting = false;

  function tick() {
    const word = words[wordIndex];

    // People who turned off animations just get the word swapped every 5 seconds
    if (reduceMotion) {
      typedEl.textContent = word;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(tick, holdTime);
      return;
    }

    if (!deleting) {
      letterCount++;
      typedEl.textContent = word.slice(0, letterCount);
      if (letterCount === word.length) {
        deleting = true;
        setTimeout(tick, holdTime);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      letterCount--;
      typedEl.textContent = word.slice(0, letterCount);
      if (letterCount === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, pauseBeforeNext);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }

  typedEl.textContent = "";
  tick();
}