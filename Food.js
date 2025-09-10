// Flip card
document.addEventListener("click", e => {
  const card = e.target.closest(".flip-card");
  if (card) card.classList.toggle("flipped");
});

// Recipe button
document.addEventListener("click", e => {
  const btn = e.target.closest(".recipe-btn");
  if (btn) {
    e.stopPropagation();
    window.open(btn.dataset.url, "_blank");
  }
});

// Inject Navbar dynamically
fetch("navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    // Hamburger activate
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
      });
    }
  });
