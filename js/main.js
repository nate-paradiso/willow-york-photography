// main.js
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav__toggle");
  const navLinks = document.querySelector(".nav__links");

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("nav__links--active");
    navToggle.classList.toggle("open");
  });
});
