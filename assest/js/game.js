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
        question: 'whfdtye trt hdtrhetryh eytujuy at is 2+2',
        choice1: ' dfghdfgh truy tyuj ty2',
        choice2: '4tyd rthftgh',
        choice3: 't yrtu rtyutu y6',
        choice4: '8rt ydtghjdgjhtyyu dgh',
        answer: 2,
    },
    {
        question: 'what is 2+3',
        choice1: 'yuj fdggh 3',
        choice2: 'yud gn gethty 5',
        choice3: '7ty rth trguyt u',
        choice4: 'ertyfdg drtyrdth9',
        answer: 2,
    },
    {
        question: 'whatrty ertu e5tyu tyj h is a',
        choice1: 'ftre yrt ye56ue ty jerty ertyw t',
        choice2: 'adsgadsgadfgd rtserg sdfgsdf g',
        choice3: 'h tfdsgsdrt srtgsrty rth ',
        choice4: 'vsdfg re ggret',
        answer: 2,
    },
    {
        question: '2wrty ertuy etruy ejetyu e uwe5ty wth ty ukryuj 677',
        choice1: 'tt yse rth trs',
        choice2: 'ht ert5t w t',
        choice3: 'u ert rte tww',
        choice4: '8fteryer67e e tyu eueas',
        answer: 2,
    }
]


const SCORE_POINTS = 100
const MAX_QUESTIONS = 4



startGame = () => {
    questionCounter = 0
    score = 0
    timerCount = 10
    availableQuestions = [...questions]
    getNewQuestion()
    startTimer()
}

//this function is used to retrieve a new question and update the progress bar and progress
// text based on the current state of the quiz and updates the available questions
getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
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
      timerCount--
      timerElement.textContent = timerCount

      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer)
        return window.location.assign('end.html')
      }
    }, 1000);

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
            timerCount++
        }
        if (classToApply === 'incorrect') {
            timerCount--
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
