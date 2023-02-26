const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = document.querySelector('#mostRecentScore')

const highScore = JSON.parse(localStorage.getItem('highScore')) || []

const MAX_HIGH_SCORE = 5

finalScore.innerText = mostRecentScore
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefult()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScore.push(score)

    highScore.sort((a,b) => {
        return b.score - a.score
    })

    highScore.splice(5)

    localStorage.setItem('highScore', JSON.stringify(highScore))
    window.location.assign('/')
}