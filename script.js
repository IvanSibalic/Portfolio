"use strict";
const projects = document.querySelectorAll(".project");

projects.forEach((project) => {
  const cardinner = project.querySelector(".card-inner");
  if (!cardinner) return;

  project.addEventListener("click", function () {
    if (event.target.tagName === "A") return;
    cardinner.classList.toggle("flipped");
  });
});

const smoothScroll = function (className) {
  document.querySelectorAll(className).forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
};

smoothScroll(".nav-links");
smoothScroll(".arrow-link");

document.querySelectorAll(".nav-links").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

const navbar = document.getElementById("navbar");
let lastScroll = window.scrollY;
let downDistance = 0; // accumulated pixels scrolled down since last direction change
let upDistance = 0; // accumulated pixels scrolled up since last direction change
let hideTimer = null; // delayed hide timer

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  const pixelTolerance = 5; // ignore tiny jitters
  const hideThreshold = 24; // require this many px down before considering hide
  const hideDelayMs = 150; // delay before hiding when scrolling down

  // Always show at very top
  if (currentScroll <= 0) {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
    navbar.style.top = "0";
    lastScroll = currentScroll;
    downDistance = 0;
    upDistance = 0;
    return;
  }

  if (currentScroll > lastScroll + pixelTolerance) {
    // Scrolling down
    const delta = currentScroll - lastScroll;
    downDistance += delta;
    upDistance = 0;

    if (downDistance >= hideThreshold) {
      if (!hideTimer) {
        hideTimer = setTimeout(() => {
          navbar.style.top = `-3.5rem`;
          hideTimer = null;
        }, hideDelayMs);
      }
    }
  } else if (currentScroll < lastScroll - pixelTolerance) {
    // Scrolling up
    const delta = lastScroll - currentScroll;
    upDistance += delta;
    downDistance = 0;

    // Cancel any pending hide and show immediately
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
    navbar.style.top = "0";
  }

  lastScroll = currentScroll;
});
