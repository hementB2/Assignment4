// Define the quiz settings
const quizSettings = {
    duration: 75, // in seconds
    penalty: 10, // in seconds
    questions: [
        {
            text: "What does CSS stand for?",
            choices: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
            answer: "Cascading Style Sheets"
        },
        {
            text: "What is the correct syntax for referring to an external script called 'script.js'?",
            choices: ["<script src='script.js'>", "<script href='script.js'>", "<script name='script.js'>", "<script file='script.js'>"],
            answer: "<script src='script.js'>"
        },
        {
            text: "Inside which HTML element do we put the JavaScript?",
            choices: ["<script>", "<javascript>", "<scripting>", "<js>"],
            answer: "<script>"
        },
        {
            text: "What is the correct syntax for creating a new array in JavaScript?",
            choices: ["var myArray = [];", "var myArray = {};", "var myArray = new array();", "var myArray = array();"],
            answer: "var myArray = [];"
        },
        {
            text: "Which operator is used to assign a value to a variable?",
            choices: ["=", "*", "+", "-"],
            answer: "="
        }
    ]
};

// Define variables for HTML elements
const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("quiz-container");
const questionText = document.getElementById("question-text");
const choicesContainer = document.getElementById("choices-container");

// Define variables for quiz state
let currentQuestionIndex;
let timeLeft;
let userScore;

// Add click event listener to start button
startButton.addEventListener("click", startQuiz);

// Define function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    timeLeft = quizSettings.duration;
    userScore = 0;

    // Hide start button and show quiz container
    startButton.classList.add("hidden");
    quizContainer.classList.remove("hidden");

    // Start the timer
    const timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            endQuiz();
            clearInterval(timerInterval);
        }
    }, 1000);

    // Display the first question
    displayQuestion();
}

// Define function to display a question
function displayQuestion() {
    // Get the current question from the quiz settings
    const currentQuestion = quizSettings.questions[currentQuestionIndex];

    // Update the question text and answer choices in the HTML
    questionText.textContent = currentQuestion.text;
    choicesContainer.innerHTML = "";
    currentQuestion.choices.forEach(choice => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.addEventListener("click", () => {
            checkAnswer(choice, currentQuestion.answer);
        });
        choicesContainer.appendChild(choiceButton);
    });
}

// Define function to check the user's answer
function checkAnswer(userAnswer, correctAnswer) {
    if (userAnswer === correctAnswer) {
        // Answer is correct
        userScore += 10;
        feedbackText.textContent = "Correct!";
    } else {
        // Answer is incorrect
        timeLeft -= quizSettings.penalty;
        feedbackText.textContent = "Wrong!";
    }

    // Move on to the next question or end the quiz
    currentQuestionIndex++;
    if (currentQuestionIndex === quizSettings.questions.length) {
        endQuiz();
    } else {
        displayQuestion();
    }
}

// Define function to end the quiz
function endQuiz() {
    // Stop the timer
    clearInterval(timerInterval);
    // Hide the quiz container
    quizContainer.classList.add("hidden");
    // You can add code to show the final score or perform other actions here
}

// Start the quiz when the user clicks the start button
startButton.addEventListener("click", startQuiz);
    