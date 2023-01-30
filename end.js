const username = document.getElementById("username");
const savescore = document.getElementById("savescore");
const finalscore = document.getElementById("finalscore");
const recentscore = localStorage.getItem("recentScore");


finalscore.innerText = recentscore;
username.addEventListener("keyup",()=>{
    savescore.disabled = !username.value;
});
saveHighScore = (e)=>{
    console.log("Save button clicked");
    e.preventDefault();
};
