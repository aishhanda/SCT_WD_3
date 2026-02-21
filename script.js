const quizData = [
  {
    type: "single",
    question: "Which language is used for web development?",
    options: ["Python", "mysql", "English"],
    answer: ["Python"]
  },
  {
    type: "multi",
    question: "Which are frontend technologies?",
    options: ["HTML", "CSS", "Node.js"],
    answer: ["HTML","CSS"]
  },
  {
    type: "text",
    question: "Fill in the blank: CSS stands for ______ Style Sheets.",
    answer: ["Cascading"]
  }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const resultCard = document.getElementById("result");
const quizCard = document.querySelector(".quiz-card");
const scoreText = document.getElementById("scoreText");
const themeToggle = document.getElementById("themeToggle");

loadQuestion();

function loadQuestion() {
  const q = quizData[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  progressText.textContent = `Question ${current + 1} of ${quizData.length}`;
  progressFill.style.width = `${((current + 1) / quizData.length) * 100}%`;

  if (q.type === "single" || q.type === "multi") {
    q.options.forEach(opt => {
      const input = document.createElement("input");
      input.type = q.type === "single" ? "radio" : "checkbox";
      input.name = "answer";
      input.value = opt;

      const label = document.createElement("label");
      label.append(input, opt);

      optionsEl.appendChild(label);
    });
  }

  if (q.type === "text") {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Your answer...";
    optionsEl.appendChild(input);
  }
}

nextBtn.addEventListener("click", () => {
  checkAnswer();
  current++;

  if (current < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function checkAnswer() {
  const q = quizData[current];
  let userAnswers = [];

  if (q.type === "text") {
    userAnswers.push(optionsEl.querySelector("input").value.trim());
  } else {
    optionsEl.querySelectorAll("input:checked").forEach(i => {
      userAnswers.push(i.value);
    });
  }

  if (JSON.stringify(userAnswers.sort()) === JSON.stringify(q.answer.sort())) {
    score++;
  }
}

function showResult() {
  quizCard.classList.add("hidden");
  resultCard.classList.remove("hidden");
  scoreText.textContent = `You scored ${score} out of ${quizData.length}`;
}

themeToggle.addEventListener("click", () => {
  document.documentElement.dataset.theme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
});