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
  const feedbackText = document.getElementById("feedback-text");
  const submitContainer = document.getElementById("submit-container");
  const initialsInput = document.getElementById("initials-input");
  const submitButton = document.getElementById("submit-button");
  
  // Define variables for quiz state
  let currentQuestionIndex;
  let timeLeft;
  let score;
  
  // Add click event listener to start button
  startButton.addEventListener("click", startQuiz);
  
  // Define function to start the quiz
  function startQuiz() {
    currentQuestionIndex = 0;
    timeLeft = quizSettings.duration;
    score = 0;
  
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
  function checkAnswer(answer) {
    if (answer === quizData[currentQuestionIndex].correctAnswer) {
      // Answer is correct
      userScore += 10;
      feedbackEl.textContent = "Correct!";
    } else {
      // Answer is incorrect
      timeLeft -= 10;
      feedbackEl.textContent = "Wrong!";
    }
  
    // Move on to the next question or end the quiz
    currentQuestionIndex++;
    if (currentQuestionIndex === quizData.length) {
      endQuiz();
    } else {
      displayQuestion();
    }
  }
  
  // Define function to end the quiz
  function endQuiz() {
    // Stop the timer
    clearInterval(timerInterval);
    // Show the final score and hide the quiz content
    quizEl.classList.add("hidden");
    scoreEl.textContent = userScore;
    scoreContainerEl.classList.remove("hidden");
  }
  
  // Define event listener for when the user submits their score
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Get the user's initials and score
    var initials = initialsInputEl.value.trim();
    if (initials !== "") {
      var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
      highScores.push({
        initials: initials,
        score: userScore,
      });
      localStorage.setItem("highScores", JSON.stringify(highScores));
      // Redirect to high scores page
      window.location.href = "highscores.html";
    }
  });
  
  // Start the quiz when the user clicks the start button
  startBtn.addEventListener("click", startQuiz);
  
  // Define function to check the user's answer
  function checkAnswer(userAnswer, correctAnswer) {
    if (userAnswer === correctAnswer) {
      feedbackText.textContent = "Correct!";
      score++;
    } else {
      feedbackText.textContent = "Wrong!";
      timeLeft -= quizSettings.penalty;
      if (timeLeft < 0) {
        timeLeft = 0;
      }}}