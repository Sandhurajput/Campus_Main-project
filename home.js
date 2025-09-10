const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

// Auto-slide every 5 seconds
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000);



const cards = document.querySelectorAll('.destination-card');
  const infoBox = document.getElementById('info-box');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const info = card.getAttribute('data-info');
      infoBox.textContent = info;
      infoBox.scrollIntoView({ behavior: 'smooth' });
    });
  });




  
  function showInfo() {
      const info = document.getElementById('templeInfo');
      // Toggle visibility
      if (info.style.display === 'none') {
        info.style.display = 'block';
      } else {
        info.style.display = 'none';
      }
    }

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".flip-card");

  // sab cards ko animate class do initially
  cards.forEach(card => card.classList.add("animate"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // viewport me aane par show class lagao
        entry.target.classList.add("show");
      } else {
        // viewport se bahar jane par show class hatao
        entry.target.classList.remove("show");
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
});





      fetch("navbar.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("navbar").innerHTML = data;

        // Hamburger activate
        const menuToggle = document.getElementById("menu-toggle");
        const navLinks = document.getElementById("nav-links");

        menuToggle.addEventListener("click", () => {
          navLinks.classList.toggle("show");
        });
      });


    






   
  