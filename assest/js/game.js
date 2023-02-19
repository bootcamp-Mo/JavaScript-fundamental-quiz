const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'what is 2+2',
        choice1: '2',
        choice2: '4',
        choice3: '6',
        choice4: '8',
        answer: '4',
    },
    {
        question: 'what is 2+3',
        choice1: '3',
        choice2: '5',
        choice3: '7',
        choice4: '9',
        answer: '5',
    },
    {
        question: 'what is a',
        choice1: 'f',
        choice2: 'g',
        choice3: 'h',
        choice4: 'v',
        answer: 'h',
    },
    {
        question: '2',
        choice1: 't',
        choice2: 'h',
        choice3: 'w',
        choice4: '8fas',
        answer: 'w',
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

//this function is used to retrieve a new question and update the progress bar and progress
// text based on the current state of the quiz and updates the available questions
getNewQuestion = () => {
    if (availableQuestions === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('./end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

// this arrow function is used to update the content of the choices elements with the
// possible answers to the current question
    choices.forEach(choice => {
        const number = choice.dataset['number']
        console.log(currentQuestion['choice' + number])
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)
    acceptingAnswers = true
}


// this code block is used to allow the user to select an answer to the
// question and receive feedback on whether their answer was correct or incorrect.
// It also updates the user's score and retrieves a new question after a brief delay
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
            'incorrect'
        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()