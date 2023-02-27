const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = document.querySelector('#mostRecentScore')
const thisScore = localStorage.getItem('score')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []
const MAX_HIGH_SCORE = 5

// This  handles saving and displaying high scores

console.log(mostRecentScore)

finalScore.innerText = mostRecentScore

username.addEventListener('keyup',  () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

console.log('check')
    const score = {
        score: thisScore,
        name: username.value
    }
    console.log('score')
    
    console.log(thisScore)
    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })
    console.log('sort')
    highScores.splice(5)
    console.log('splice')
    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('./scores.html')
}

