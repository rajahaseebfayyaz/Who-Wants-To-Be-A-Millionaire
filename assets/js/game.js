/*jshint esversion: 10 */

/**
 * variables to keep track of game progress
 */
let availableQuestions = [];
let currentQuestion = {};
let questionCounter = 0;
let acceptingAnswers = true;
let score = 0;

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressbarfull');
const startElement = document.querySelector('.start-container');
const gameElement = document.querySelector('.game-container');
const gameEndElement = document.querySelector('.game-over-container');
const highScoreElement = document.querySelector('.high-score-container');
const highScoresList = document.getElementById('highScoresList');
const finalScore = document.getElementById('finalScore');


/**
 * Questions, can make more but this is a good start.
 */
const questions = [
    {
        question: 'What was the result of ICC T20 World Cup 2021 Pakistan vs India Cricket Match?',
        choice1: 'Pakistan Won By 10 Wickets',
        choice2: 'Pakistan lost by 9 runs',
        choice3: 'India Won by 7 Wickets',
        choice4: 'India Won by 25 runs',
        answer: 1,
        amount: 200,
    },
    {
        question: 'What is the Capital of Djibouti?',
        choice1: 'Dakar',
        choice2: 'Kandahar',
        choice3: 'Djibouti City',
        choice4: 'Moscow',
        answer: 3,
    },
    {
        question: 'What is the national game of England?',
        choice1: 'Football',
        choice2: 'Hockey',
        choice3: 'Rugby',
        choice4: 'Cricket',
        answer: 4,
    },
    {
        question: 'Trigonometry is the branch of?',
        choice1: 'Biology',
        choice2: 'Mathematics',
        choice3: 'Psycology',
        choice4: 'Economics',
        answer: 2,
    },
    {
        question: 'Which toxic substance is obtained from the pressed seeds of the castor oil plant?',
        choice1: 'Sarin',
        choice2: 'Strychnine',
        choice3: 'Ricin',
        choice4: 'Cyanide',
        answer: 3,
    },
    {
        question: 'In the history of motor sport, which of these iconic races was held first?',
        choice1: 'Le Mans 24 Hours',
        choice2: 'Monaco Grand Prix',
        choice3: 'Indy 500',
        choice4: 'Isle of Man',
        answer: 4,
    },
    {
        question: 'The Twelve Apostles is a series of peaks connected to which mountain?',
        choice1: 'Aoraki Mount Cook',
        choice2: 'K2',
        choice3: 'Table Mountain',
        choice4: 'Mont Blanc',
        answer: 3,
    },
    {
        question: 'Which of these products is sold by the brands Colgate, Oral-B and Sensodyne?',
        choice1: 'Deodrant',
        choice2: 'Shampoo',
        choice3: 'Toothpaste',
        choice4: 'Sun cream',
        answer: 3,
    },
    {
        question: 'In the UK, the abbrevation NHS stands for National what Service?',
        choice1: 'Humanity',
        choice2: 'Health',
        choice3: 'Honour',
        choice4: 'Household',
        answer: 2,
    },
    {
        question: 'Which of following brands was chiefly associated with the manufacture of household locks?',
        choice1: 'Phillips',
        choice2: 'Flymo',
        choice3: 'Chubb',
        choice4: 'Ronseal',
        answer: 3,
    },
    {
        question: 'Which toys have been marked with the phrase "robots in disguise"?',
        choice1: 'Bratz Dolls',
        choice2: 'Sylvanian Families',
        choice3: 'Hatchimals',
        choice4: 'Transformers',
        answer: 4,
    },
    {
        question: ' What does the world loquacious mean?',
        choice1: 'Angry',
        choice2: 'Chatty',
        choice3: 'Beautiful',
        choice4: 'Shy',
        answer: 2,
    },
    {
        question: 'Obstetrics is a branch of medicine particularly concerned with what?',
        choice1: 'Childbirth',
        choice2: 'Broken bones',
        choice3: 'Heart conditions',
        choice4: 'Old age',
        answer: 1,
    },
    {
        question: 'Which of these cetaceans is classified as a "toothed whale"?',
        choice1: 'Gray whale',
        choice2: 'Minke whale',
        choice3: 'Sperm whale',
        choice4: 'Humpack whale',
        answer: 3,
    },
    {
        question: 'In 1718, which pirate died in battle off the coast of what is now North Carolina?',
        choice1: 'Calico Jack',
        choice2: 'Blackbeard',
        choice3: 'Bartholomew Roberts',
        choice4: 'Captain Kidd',
        answer: 2,
    },
];


/* Have 5 questions, index is at 0 by default but user can get to 1Million */
const question_to_value = [
    "0",
    "10,000",
    "50,000",
    "150,000",
    "500,000",
    "1,000,000",
];

const MAX_QUESTIONS = 4;  // loop starts at 0 so this limits the user to 5 questions

/**
 * Hides all body container elements
 */
hideAll = () => {
    startElement.classList.add('hide');
    gameElement.classList.add('hide');
    gameEndElement.classList.add('hide');
    highScoreElement.classList.add('hide');
};

/* 
* shuffles array so order of questions is random
* https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
*/
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * sets qusetion counter to 0
 * sets score to 0
 * randomizes questions
 * hides all items but game board
 * gets next question
 */
startGame = () => {

    questionCounter = 0;
    score = question_to_value[questionCounter];
    scoreText.innerText = score;
    availableQuestions = [...questions];
    shuffleArray(availableQuestions);
    hideAll();
    gameElement.classList.remove('hide');
    getNewQuestion();
};

/* 
* updates question and answers
* checks if user is on last question or not
*/
getNewQuestion = () => {
    if (availableQuestions.length === 0 || (questionCounter > MAX_QUESTIONS)) {
        gameElement.classList.add('hide');
        gameEndElement.classList.remove('hide');
        finalScore.innerText = score;
    }

    currentQuestion = availableQuestions[questionCounter];
    question.innerText = currentQuestion.question;
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS + 1}`;
    progressBarFull.style.width = `${(questionCounter / (MAX_QUESTIONS + 1)) * 100}%`;

    choices.forEach(choice => {
        const number = choice.dataset[`number`];
        choice.innerText = currentQuestion[`choice` + number];
    });

    availableQuestions.splice(questionCounter, 1);

    AcceptingAnswers = true;
};

/* 
* handler for clicking an answer
* doesn't allow double clicking
* adds correct or incorrect class
* if answer is wrong, game is over like millionare tv show
* pauses then goes to next question
*/
choices.forEach(function (choice) {
    choice.addEventListener('click', function (e) {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset.number;
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        selectedChoice.parentElement.classList.add(classToApply);

        if (classToApply === 'correct') {
            score = question_to_value[questionCounter];
            scoreText.innerText = question_to_value[questionCounter];
        } else {
            // first wrong answer, user looses End game
            questionCounter = MAX_QUESTIONS + 1;
        }

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            acceptingAnswers = true;
            getNewQuestion();
        }, 1000);

    });
});

/* 
* gets highscores from local storage
* loops through items and displays
* if error or no local storage, shows default no high scores saved yet.
*/
showHighScores = () => {

    let highscores = JSON.parse(localStorage.getItem('highscores') || '[]');
    let innerHTML = '';
    try {
        highscores.forEach((item) => {
            innerHTML = innerHTML + `<li><span class="username">${item.user}</span>  <span class="score">${item.score}</span></li>`;

        });
    } catch {
        // if we had an error, empty out the local storage so we an have success next time.
        localStorage.setItem('highscores', JSON.stringify([]));
        innerHTML = "<li><span>No high scores saved yet!</span></li>";
    }
    if (highscores.length === 0) {
        innerHTML = "<li><span>No high scores saved yet!</span></li>";
    }
    highScoresList.innerHTML = innerHTML;
    hideAll();
    highScoreElement.classList.remove('hide');
};

/* 
* pulls user name from input
* checks length and if nothing entered, sets default
* adds current score to array
* saves updated list to localStorage
*/
saveHighScore = () => {
    userName = document.getElementById('username').value;
    if (userName.length <= 0) {
        userName = "Player One";
    }
    // from stack overflow https://stackoverflow.com/questions/43762363/how-to-store-an-array-of-objects-in-local-storage
    let highscores = JSON.parse(localStorage.getItem("highscores") || "[]");
    highscores.push({ user: userName, score: score });
    localStorage.setItem('highscores', JSON.stringify(highscores));
    showHighScores();
};


/**
 * Music file
 */
let music = document.getElementById('music');
music.volume = 0.4;
music.loop = true;
let volumeOn = false;

/**
 * Turn on and off music
 */
function volumeControl() {
    volumeOn = !volumeOn;
    if (volumeOn) {
        music.play();
        document.getElementById("play-music").classList.add('hide');
        document.getElementById("stop-music").classList.remove('hide');
    } else {
        music.pause();
        document.getElementById("stop-music").classList.add('hide');
        document.getElementById("play-music").classList.remove('hide');
    }
}

