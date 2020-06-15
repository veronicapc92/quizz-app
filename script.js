const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", setNextQuestion);

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.map((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer");
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).map((button) =>
    setStatusClass(button, button.dataset.correct)
  );
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length)
    nextButton.classList.remove("hide");
  else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) element.classList.add("correct");
  else element.classList.add("wrong");
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false },
    ],
  },
  {
    question: "Is web development fun?",
    answers: [
      { text: "Not really", correct: false },
      { text: "It's ok", correct: false },
      { text: "Um...kinda", correct: false },
      { text: "YES!!!", correct: true },
    ],
  },
  {
    question: "My favourite framework/library?",
    answers: [
      { text: "Angular", correct: false },
      { text: "React", correct: true },
      { text: "Vue", correct: false },
      { text: "None, I prefer Vanilla JS", correct: false },
    ],
  },
  {
    question: "What is 4 * 6",
    answers: [
      { text: "24", correct: true },
      { text: "63", correct: false },
    ],
  },
];
