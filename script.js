window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav a");

  let current = "";
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollY >= sectionTop - 60 &&
      scrollY < sectionTop + sectionHeight - 60
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});
// Smooth scrolling
const links = document.querySelectorAll(".nav a");
links.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    window.scrollTo({
      top: targetSection.offsetTop - 60,
      behavior: "smooth",
    });
  });
});
// Toggle mobile menu
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  menuToggle.classList.toggle("active");
});
// Close mobile menu on link click
const navLinks = document.querySelectorAll(".nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (nav.classList.contains("active")) {
      nav.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
});
// Close mobile menu on outside click
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
    nav.classList.remove("active");
    menuToggle.classList.remove("active");
  }
});
