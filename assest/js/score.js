// This code retrieves high scores from the browser's localStorage object 
// and displays them as a list of HTML elements on the web page


// highScoreList variable is assigned a reference to an HTML element 
// with an ID of highScoreList

const highScoreList = document.querySelector('#highScoreList')

const score = localStorage.getItem('score')

const highScore =  JSON.parse(localStorage.getItem('highScore')) || []

console.log(score)
highScoreList.innerHTML =
 highScore.map(score => {
    return '<li class = "high-score">${score.name} - ${score.score}</li>'
}).join('') 

