const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const thisScore = localStorage.getItem('score')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []
const MAX_HIGH_SCORE = 5

// This  handles saving and displaying high scores


finalScore.innerText = thisScore

username.addEventListener('keyup',  () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()


    const score = {
        score: thisScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('./scores.html')
}

