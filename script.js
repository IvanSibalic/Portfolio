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

document.querySelectorAll(".nav-links").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  const tolerance = 5;

  if (currentScroll > lastScroll + tolerance) {
    navbar.style.top = `-3.5rem`;
  } else {
    navbar.style.top = "0";
  }

  lastScroll = currentScroll;
});
