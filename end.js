const username = document.getElementById("username");
const savescore = document.getElementById("savescore");
const finalscore = document.getElementById("finalscore");
const recentscore = localStorage.getItem("recentScore");
const highScore = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScore)


finalscore.innerText = recentscore;
username.addEventListener("keyup",()=>{
    savescore.disabled = !username.value;
});
saveHighScore = (e)=>{
    console.log("Save button clicked");
    e.preventDefault();

    const score ={
        name: username.value,
        score: recentscore
    };
    highScore.push(score);

    // calculating top 5 scores

    highScore.sort((a, b)=>{
        return b.score - a.score;
    });
    highScore.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScore));
    // console.log(highScore);
    setTimeout( () => {
        window.location.assign("index.html");
    },500);
};
