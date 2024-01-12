const gk = document.getElementById("gk");
const program = document.getElementById("program");
const math = document.getElementById("math");
const history = document.getElementById("history");
const sports = document.getElementById("sports");

gk.addEventListener("click",()=>{
    gk.classList.toggle("selected");
    modules.exports = "general";
});

program.addEventListener("click",()=>{
    program.classList.toggle("selected");
});

math.addEventListener("click",()=>{
    math.classList.toggle("selected");
});

history.addEventListener("click",()=>{
    history.classList.toggle("selected");
});

sports.addEventListener("click",()=>{
    sports.classList.toggle("selected");
});
