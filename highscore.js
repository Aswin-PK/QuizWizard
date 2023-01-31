const printScoreList = document.getElementById('highScoreList');
const highScoreList = JSON.parse(localStorage.getItem("highScores")) || [];

// for getting names and score and printing in html format
printScoreList.innerHTML = 
    highScoreList.map(score =>{
        return `<li>
        <div class="lists">
            <h3 class="name">${score.name}</h3>
            <h3 class="score">-&nbsp;&nbsp;&nbsp;${score.score}</h3>
        </div>
    </li>`
    }).join("");