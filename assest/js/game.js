const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const scoreText = document.querySelector('#score')
const timerElement = document.querySelector('#timerCountDown')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
let timer
let timerCount

// array of objects 

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<javascript>',
        choice2: '<script>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 2
    },
    {
        question: 'Which event occurs when the user clicks on an HTML element?',
        choice1: 'onclick',
        choice2: 'onmouseclick',
        choice3: 'onmouseover',
        choice4: 'onchange',
        answer: 1,
    },
    {
        question: 'How does a FOR loop start?',
        choice1: 'for i = 1 to 5 ',
        choice2: 'for (i <= 5; i++)',
        choice3: 'for (i = 0; i <= 5; i++)  ',
        choice4: 'for (i = 0; i <= 5)  ',
        answer: 3,
    },
    {
        question: 'How to write an IF statement in JavaScript? ',
        choice1: 'if i = 5 then',
        choice2: 'if i == 5 then',
        choice3: 'if i = 5',
        choice4: 'if (i == 5)',
        answer: 4,
    },
]


const SCORE_POINTS = 100
const MAX_QUESTIONS = 4



startGame = () => {
    questionCounter = 0
    score = 0
    timerCount = 15
    availableQuestions = [...questions]
    getNewQuestion()
    startTimer()
    localStorage.setItem('score', 0)
}

//this function is used to retrieve a new question and update the progress bar and progress
// text based on the current state of the quiz and updates the available questions
getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign('end.html')
    }
    questionCounter++
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


startTimer = () => {
    // Sets timer
    timer = setInterval(function() {
      decreaseTimer()

      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer)
        return window.location.assign('end.html')
      }
    }, 1000);

  }

function decreaseTimer() {
    timerCount--
    timerElement.textContent = timerCount
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
        if (classToApply === 'incorrect') {
            decreaseTimer()
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
    console.log(score)
    localStorage.setItem('score', score)
}
startGame()
