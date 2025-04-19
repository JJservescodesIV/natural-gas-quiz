const questions = [
    {
        question: "What type of energy source is natural gas classified as?",
        options: ["Renewable", "Non-renewable", "Nuclear", "Hydroelectric"],
        answer: "Non-renewable"
    },
    {
        question: "What is the primary component of natural gas?",
        options: ["Methane", "Butane", "Propane", "Hydrogen"],
        answer: "Methane"
    },
    {
        question: "Which U.S. state is the largest producer of natural gas?",
        options: ["Texas", "Alaska", "California", "Pennsylvania"],
        answer: "Texas"
    },
    {
        question: "What is the main use of natural gas in homes?",
        options: ["Heating", "Lighting", "Cooling", "Transportation"],
        answer: "Heating"
    },
    {
        question: "When was Scana Energy founded?",
        options: ["1997", "2000", "1993", "1985"],
        answer: "1997"
    },
    {
        question: "Which of the following is a benefit of using natural gas as an energy source?",
        options: ["Lower greenhouse gas emissions", "Abundant supply", "Relatively low cost", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "What is the process of extracting natural gas from underground reservoirs called?",
        options: ["Fracking", "Refining", "Liquefaction", "Compression"],
        answer: "Fracking"
    },
    {
        question: "Which of the following is a major challenge facing the natural gas industry?",
        options: ["Fluctuating prices", "Environmental concerns", "Infrastructure development", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "What is the name of the process used to convert natural gas into a liquid form for easier transportation and storage?",
        options: ["Liquefaction", "Compression", "Refining", "Cracking"],
        answer: "Liquefaction"
    },
    {
        question: "Which of the following is a major application of natural gas in the industrial sector?",
        options: ["Heating and cooling", "Electricity generation", "Chemical production", "All of the above"],
        answer: "All of the above"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.querySelector(".question");
const optionsElement = document.querySelector(".options");
const progressBar = document.getElementById("progress-bar");
const quizContainer = document.getElementById("quiz");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.querySelector(".score");
const confettiContainer = document.getElementById("confetti-container");

const COLORS = ["#f94144", "#f3722c", "#f9c74f", "#90be6d", "#577590", "#43aa8b"];

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option));
        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const buttons = optionsElement.querySelectorAll("button");

    buttons.forEach(button => {
        if (button.textContent === currentQuestion.answer) {
            button.classList.add("correct");
        } else if (button.textContent === selectedOption) {
            button.classList.add("wrong");
        }
        button.disabled = true;
    });

    if (selectedOption === currentQuestion.answer) {
        score++;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showScore();
        }
    }, 1000);
}

function showScore() {
    quizContainer.style.display = "none";
    scoreContainer.style.display = "block";
    scoreElement.textContent = `You scored ${score} out of ${questions.length}`;
    launchConfetti();
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.style.display = "block";
    scoreContainer.style.display = "none";
    progressBar.style.width = "0%";
    loadQuestion();
}

function launchConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDelay = `${Math.random() * 3}s`;
        confetti.style.backgroundColor = getRandomColor();
        confettiContainer.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
}

function getRandomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
}

loadQuestion();
