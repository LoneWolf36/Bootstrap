var questions = [{
    "question": "Inside which HTML element do we put the JavaScript ?",
    "questionNum": "1",
    "option1": "1. <js>",
    "option2": "2. <javascript>",
    "option3": "3. <script>",
    "option4": "4. <scripting>",
    "answer": "3",
    "selected": ""
  },
  {
    "question": "Which of the following is not a valid JavaScript variable name ?",
    "questionNum": "2",
    "option1": "1. _first_and_last_names",
    "option2": "2. 2names",
    "option3": "3. FirstAndLast",
    "option4": "4. None of the above",
    "answer": "2",
    "selected": ""
  },
  {
    "question": "What is the correct JavaScript syntax to write \"Hello World\" ?",
    "questionNum": "3",
    "option1": "1. System.out.println(\"Hello World\")",
    "option2": "2. println (\"Hello World\")",
    "option3": "3. document.write(\"Hello World\")",
    "option4": "4. response.write\"Hello World\")",
    "answer": "3",
    "selected": ""
  },
  {
    "question": "What is the correct syntax for referring to an external script called \"abc.js\" ?",
    "questionNum": "4",
    "option1": "1. <script href=\" abc.js\">",
    "option2": "2. <script src=\" abc.js\">",
    "option3": "3. <script name=\" abc.js\">",
    "option4": "4. None of the above",
    "answer": "2",
    "selected": ""
  },
  {
    "question": "JavaScript is interpreted by _________ ?",
    "questionNum": "5",
    "option1": "1. Client",
    "option2": "2. Server",
    "option3": "3. Object",
    "option4": "4. None of the above",
    "answer": "1",
    "selected": ""
  }
];

var currentQuestion = 0;
var score = 0;
var totQuestions = questions.length;
var questionCon = document.getElementById('question');
var questionNum = document.getElementById('questionNum');

var option1 = document.getElementById('option1');
var option2 = document.getElementById('option2');
var option3 = document.getElementById('option3');
var option4 = document.getElementById('option4');

var result = document.getElementById('result');

var nextBtn = document.getElementById('nextBtn');
var previousBtn = document.getElementById('previousBtn')
var subTest = document.getElementById('subTest');

function loadQuestion(questionIndex) {
  var q = questions[questionIndex];
  questionNum.textContent = q.questionNum;
  questionCon.textContent = q.question;
  option1.textContent = q.option1;
  option2.textContent = q.option2;
  option3.textContent = q.option3;
  option4.textContent = q.option4;
};

function hidePrev() {
  if (currentQuestion == 0) {
    previousBtn.style.display = 'none';
    questionCon.textContent = questions[currentQuestion].question;
    questionNum.textContent = questions[currentQuestion].questionNum;
    option1.textContent = questions[currentQuestion].option1;
    option2.textContent = questions[currentQuestion].option2;
    option3.textContent = questions[currentQuestion].option3;
    option4.textContent = questions[currentQuestion].option4;
  }
};

subTest.onclick = function() {
  if (confirm('Are you sure you want to submit?')) {
    document.getElementById('mainContainer').style.display = 'none';
    result.style.display = '';
    result.textContent = 'Your score is: ' + score;
    return;
  } else {
    return;
  }

};

previousBtn.onclick = function() {
  var dec = --currentQuestion;
  if (questions[dec].selected == questions[dec].answer && dec == 0) {
    hidePrev();
    score -= 1;
  } else if (questions[dec].selected == questions[dec].answer) {
    score -= 1;
  } else {
    score += .25;
  }
  loadQuestion(dec);
};

nextBtn.onclick = function() {
  previousBtn.style.display = '';
  var selectedOption = document.querySelector('input[type=radio]:checked');
  if (!selectedOption) {
    alert('Please select your answer');
    return;
  }
  var answer = selectedOption.value;
  questions[currentQuestion].selected = answer;
  if (answer == questions[currentQuestion].answer)
    score += 1;
  else
    score -= 0.25;
  selectedOption.checked = 'false';
  currentQuestion++;

  if (currentQuestion == totQuestions - 1)
    nextBtn.textContent = 'Finish';

  if (currentQuestion == totQuestions) {
    document.getElementById('mainContainer').style.display = 'none';
    result.style.display = '';
    result.textContent = 'Your score is: ' + score;
    return;
  }
  loadQuestion(currentQuestion);
};

// Timer logic
total_seconds = 60;
seconds = parseInt(total_seconds % 60);
minutes = parseInt(total_seconds / 60);
var timer = document.getElementById('quiz-timer');

function countdown() {
  timer.textContent = minutes + ':' + seconds;
  if (total_seconds <= 0) {
    document.getElementById('mainContainer').style.display = 'none';
    result.style.display = '';
    result.textContent = 'Your score is: ' + score;
  } else {
    total_seconds -= 1;
    seconds = parseInt(total_seconds % 60);
    minutes = parseInt(total_seconds / 60);
    setTimeout('countdown()', 1000);
  }
};
setTimeout('countdown()', 1000);