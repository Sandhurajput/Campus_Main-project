// Quiz data - 6 questions
var questions = [
  {
    question: "What is the official language of Bihar?",
    options: ["Hindi", "Bhojpuri", "Maithili", "Magahi"],
    answer: "Hindi",
    detail: "Hindi is the official language of Bihar, though many regional languages like Bhojpuri and Maithili are widely spoken."
  },
  {
    question: "Who was the first woman Chief Minister of Bihar?",
    options: ["Mamata Banerjee", "Sushma Swaraj", "Rabri Devi","Sheila Dikshit"],
    answer: "Rabri Devi",
    detail: "Rabri Devi became the first woman Chief Minister of Bihar in 1997."
  },
  {
    question: "What is the capital of Bihar?",
    options: ["Gaya", "Patna", "Muzaffarpur", "Bhagalpur"],
    answer: "Patna",
    detail: "Patna, situated on the banks of the Ganges River, is the capital and largest city of Bihar."
  },
  {
    question: "Which festival of Bihar is dedicated to the Sun God?",
    options: ["Diwali", "Holi", "Durga Puja", "Chhath Puja"],
    answer: "Chhath Puja",
    detail: "Chhath Puja is a significant festival dedicated to the Sun God, celebrated with fasting and offerings at riverbanks."
  },
  {
    question: "Which sweet is traditionally prepared during Chhath Puja?",
    options: ["Thekua", "Peda", "Jalebi", "Ladoo"],
    answer: "Thekua",
    detail: "Thekua is a traditional Bihari sweet made during Chhath Puja using wheat flour, jaggery, and ghee."
  },
  {
    question: "Where did Buddha attain enlightenment?",
    options: ["Bodh Gaya", "Rajgir", "Nalanda", "Patna"],
    answer: "Bodh Gaya",
    detail: "Bodh Gaya in Bihar is where Buddha attained enlightenment under the Bodhi tree."
  }
];


// Variables
var currentQIndex = 0;
var score = 0;
var answersList = [];

// Start quiz
function startQuiz() {
  currentQIndex = 0;
  score = 0;
  answersList = [];
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-box").style.display = "block";
  showQuestion();
}

// Show question
function showQuestion() {
  var q = questions[currentQIndex];
  document.getElementById("question").textContent = q.question;

  var optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  for (var i = 0; i < q.options.length; i++) {
    var btn = document.createElement("button");
    btn.textContent = q.options[i];
    btn.onclick = (function(option) {
      return function() {
        checkAnswer(option);
      }
    })(q.options[i]);
    optionsDiv.appendChild(btn);
  }

  // Clear previous message
  document.getElementById("answer-message").textContent = "";
}

// Check answer
function checkAnswer(selected) {
  var q = questions[currentQIndex];
  var correct = q.answer;
  var messageDiv = document.getElementById("answer-message");

  if (selected === correct) {
    messageDiv.textContent = "✅ Correct!";
    messageDiv.style.color = "green";
    score++;
  } else {
    messageDiv.textContent = "❌ Wrong! Correct: " + correct;
    messageDiv.style.color = "red";
  }

  answersList.push({
    question: q.question,
    selected: selected,
    correct: correct,
    detail: q.detail
  });

  // Disable all option buttons and color them
  var allBtns = document.getElementById("options").children;
  for (var i = 0; i < allBtns.length; i++) {
    allBtns[i].disabled = true;

    // Correct button green
    if (allBtns[i].textContent === correct) {
      allBtns[i].classList.add('correct');
    }
    // Wrong button red if selected
    else if (allBtns[i].textContent === selected) {
      allBtns[i].classList.add('wrong');
    }
  }
}

// Next question
function nextQuestion() {
  if (currentQIndex < questions.length - 1) {
    currentQIndex++;
    showQuestion();
  } else {
    showResult();
  }
}

// Show result
function showResult() {
  document.getElementById("quiz-box").style.display = "none";
  document.getElementById("result-screen").style.display = "block";

  document.getElementById("score").textContent = "You scored " + score + " out of " + questions.length;

  var summaryDiv = document.getElementById("quiz-summary");
  summaryDiv.innerHTML = "<h3>Review:</h3>";

  for (var i = 0; i < answersList.length; i++) {
    var block = document.createElement("div");
    block.innerHTML =
      "<strong>Q" + (i + 1) + ": " + answersList[i].question + "</strong><br>" +
      "Your answer: <span style='color:" + (answersList[i].selected === answersList[i].correct ? "green" : "red") + "'>" + answersList[i].selected + "</span><br>" +
      "Correct answer: <strong>" + answersList[i].correct + "</strong><br>" +
      "<em>" + answersList[i].detail + "</em>";
    summaryDiv.appendChild(block);
  }
}

// Restart quiz
function restartQuiz() {
  document.getElementById("result-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "block";
}

// Add spacing below the navbar for quiz and result screens
var style = document.createElement("style");
style.innerHTML = `
  #quiz-box,
  #result-screen {
    margin-top: 120px;   /* navbar ke neeche laane ke liye */
  }

  header {
    position: fixed; /* navbar hamesha top me fix rahega */
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
`;
document.head.appendChild(style);

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
