const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choices-text'))
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let avaialbleQuestions = []

let questions = [
    {
        question: 'What was the result of ICC T20 World Cup 2021 Pakistan vs India Cricket Match?',
        choice1: 'Pakistan Won By 10 Wickets',
        choice2: 'Pakistan lost by 9 runs',
        choice3: 'India Won by 7 Wickets',
        choice4: 'India Won by 25 runs',
        answer: 1,
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
        question: 'In the history of motor sport, which of these iconic races was held first??',
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
        question: 'In 1718, which pirate died in battle off the coast of what is now North Carolina??',
        choice1: 'Calico Jack',
        choice2: 'Blackbeard',
        choice3: 'Bartholomew Roberts',
        choice4: 'Captain Kidd',
        answer: 2,
    },


]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    avaialbleQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.lenght === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setitem(`mostRecentStore`, score) 
        return window.location.assign(`/end.html`)
    }

    questionCounter++
    progressText.innerText = "Question ${questionCounter} of ${MAX_QUESTIONS}"
    progressBarFull.getElementsByClassName.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    const questionsIndex = Math.floor(Math.random() * availableQuestions.lenght)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset[`number`]
        choice.innertext = currentQuestion[`choice` + number]
    })

    availableQuestions.splice(questionsIndex, 1)
    
    AcceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener(`click`, e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAsnswer = selectedChoice.dataset[`number`]
        
        let classToApply = selectedAsnswer == currentQuestion.answer ? `correct` :
        `incorrect`

        if(classToApply === `correct`) {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classlist.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()

