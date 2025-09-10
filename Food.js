document.addEventListener('click', function(e){
      const card = e.target.closest('.flip-card');
      if(card){ card.classList.toggle('flipped'); }
    });
    document.addEventListener('keydown', function(e){
      const active = document.activeElement;
      if(active && active.classList.contains('flip-card') && (e.key === 'Enter' || e.key === ' ')){
        e.preventDefault();
        active.classList.toggle('flipped');
      }
    });
    // Recipe buttons open video
    document.addEventListener('click', function(e){
      const btn = e.target.closest('.recipe-btn');
      if(btn){
        e.stopPropagation();
        const url = btn.getAttribute('data-url');
        if(url) window.open(url, '_blank');
      }
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