const quizData = [
  {
    question: 'who is kathleen hanna married to?',
    options: [' ad-rock', ' mike d', ' mca', " flavor flav"],
    answer: ' ad-rock',
  },
  {
    question: 'which is NOT a remake?',
    options: [' the blob', ' the fly', ' invasion of the body snatchers', ' they live'],
    answer: ' they live',
  },
  {
    question: 'which did charlie kaufman write AND direct?',
    options: [' eternal sunshine of the spotless mind', ' synecdoche, new york', ' adaptation', ' being john malkovich'],
    answer: ' synecdoche, new york',
  },
  {
    question: 'who wrote the music to caroline polacheks "long road home"?',
    options: [' oneohtrix point never', ' caroline polachek', ' boards of canada', ' four tet'],
    answer: ' oneohtrix point never',
  },
  {
    question: 'pink flamingos came out in what year',
    options: [
      ' 1970',
      ' 1972',
      ' 1974',
      ' 1981',
    ],
    answer: ' 1972',
  },
  {
    question: 'which is NOT a film by andy warhol & paul morrissey?',
    options: [' trash', ' heat', ' flesh', ' lust'],
    answer: ' lust',
  },
  {
    question: 'what is the superior redbull flavor?',
    options: [
      ' classic',
      ' coconut',
      ' sugar free',
      ' tropical (yellow)',
    ],
    answer: ' classic',
  },
  {
    question: 'whats the best john waters movie?',
    options: [' polyester', ' cecil b. demented', ' pink flamingos', ' multiple maniacs'],
    answer: ' cecil b. demented',
  },
  {
    question: 'who illustrated the book "fear and loathing in las  vegas"?',
    options: [
      ' hunter s. thompson',
      ' john edmund buckley',
      ' ralph steadman',
      ' marc leeds',
    ],
    answer: ' ralph steadman',
  },
  {
    question: 'whats the best movie released in 2023?',
    options: [' cocaine bear', ' cocaine bear!', ' Cocaine Bear!!', ' COCAINE BEAR!!!!'],
    answer: ' cocaine bear!',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `you scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>your answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>correct answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>you scored ${score} out of ${quizData.length}!</p>
    <p>incorrect answers:</p>
    ${incorrectAnswersHtml}
  `;
  
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();