
document.addEventListener("DOMContentLoaded", function () {
  const feedbackForm = document.getElementById("feedbackForm");
  const feedbackList = document.getElementById('feedbackList');

  // --- NEW: Load saved feedbacks from localStorage ---
  const savedFeedbacks = JSON.parse(localStorage.getItem('feedbackArray')) || [];

  // Remove expired feedbacks (older than 2 minutes)
  const now = new Date().getTime();
  const validFeedbacks = savedFeedbacks.filter(fb => now - fb.timestamp < 120000);
  localStorage.setItem('feedbackArray', JSON.stringify(validFeedbacks));

  // Display valid feedbacks
  validFeedbacks.forEach(fb => displayFeedback(fb));

  feedbackForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    const message = document.getElementById("message").value.trim();
    const ratingInput = document.querySelector('input[name="rating"]:checked');
    const rating = ratingInput ? parseInt(ratingInput.value) : null;


    if (!name ||!email|| !message || !rating) {
      alert('Please fill your name, email,feedback, and give a rating.');
      return;
    }

    const feedbackObj = {
      name,
      email,
      message,
      rating,
      timestamp: new Date().getTime()
    };

    // Add new feedback to localStorage
    let feedbackArray = JSON.parse(localStorage.getItem('feedbackArray')) || [];
    feedbackArray.push(feedbackObj);
    // Keep only the latest 3 feedbacks
    if (feedbackArray.length > 3) feedbackArray.shift();
    localStorage.setItem('feedbackArray', JSON.stringify(feedbackArray));

    // Display new feedback
    displayFeedback(feedbackObj);

    // MongoDB save (your existing code)
    try {
      const response = await fetch('http://localhost:5000/api/users', {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, rating })
      });
      if (!response.ok) throw new Error('Failed to save data');
      const data = await response.json();
      console.log('Data saved in MongoDB:', data);
    } catch (err) {
      console.error('Error saving data:', err);
      alert('Oops! Something went wrong while saving your feedback.');
    }

    feedbackForm.reset();
  });

  // --- Function to display feedback ---
  function displayFeedback(fb) {
    const fbDiv = document.createElement('div');
    fbDiv.className = 'feedback-item';
    fbDiv.innerHTML = `
      <strong>Name:</strong> ${fb.name}<br>
        <strong>Email:</strong> ${fb.email}<br>

      <strong>Feedback:</strong> ${fb.message}<br>
      <strong>🌟 Rating:</strong> ${'★'.repeat(fb.rating)}
    `;
    feedbackList.appendChild(fbDiv);

    // Remove this feedback after 2 minutes (120000ms)
    setTimeout(() => {
      fbDiv.remove();
      // Also remove from localStorage
      let stored = JSON.parse(localStorage.getItem('feedbackArray')) || [];
      stored = stored.filter(item => item.timestamp !== fb.timestamp);
      localStorage.setItem('feedbackArray', JSON.stringify(stored));
    }, 120000);
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
