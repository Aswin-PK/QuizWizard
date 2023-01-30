const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice'));
const solvedandtotal = document.getElementById('solvedandtotal');
const scores = document.getElementById('scores');

console.log(choices);
let currentQuestion = {};
let score = 0;
let questionCounter = 0;
let availableQuestion = [];
let acceptingAnswers = true;
let questions = [
    {
        question: "Complete the series 1,6,13,22,33,..",
        choice1: "46",
        choice2: "48",
        choice3: "49",
        choice4: "51",
        answer:1
    },
    {
        question: "At a conference, 12 members shook hands with each other before & after the meeting. How many total number of hand shakes occurred ?",
        choice1: "100",
        choice2: "122",
        choice3: "132",
        choice4: "145",
        answer:3
    },
    {
        question: "The day after the day after tomorrow is four days before Monday. What day is it today?",
        choice1: "Monday",
        choice2: "Tuesday",
        choice3: "Wednesday",
        choice4: "Thursday",
        answer:1
    },
    {
        question: "6, 12, 1, 13, 5 is to flame as 2, 12, 15, 1, 20 is to ?",
        choice1: "voice",
        choice2: "bald",
        choice3: "bloat",
        choice4: "castle",
        answer:3
    },
    {
        question: "Moon : Satellite : : Earth : ?",
        choice1: "Sun",
        choice2: "Planet",
        choice3: "Solar System",
        choice4: "Asteroid",
        answer:2
    },
    {
        question: "1 : 1 : : 25 : ?",
        choice1: "26",
        choice2: "125",
        choice3: "125",
        choice4: "625",
        answer:4
    }
]


const correctBonus = 5;
let maxQuestions;
startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    console.log(availableQuestion);
    maxQuestions = availableQuestion.length;
    // question.innerText = availableQuestion.question;
    getNewQuestions();
};
getNewQuestions = () =>{
    if(availableQuestion == 0 || questionCounter >= maxQuestions){
        //Will go to home page when all questions are answered
        localStorage.setItem("recentScore",score);
        return window.location.assign("/end.html");
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random()*availableQuestion.length);
    // console.log(questionIndex);
    currentQuestion = availableQuestion[questionIndex];
    console.log(currentQuestion);
    question.innerText = currentQuestion.question;
    acceptingAnswers = true;

    choices.forEach(choice =>{
        const number = choice. dataset['number']
        choice.innerText = currentQuestion['choice'+number];
    })

    availableQuestion.splice(questionIndex, 1);
    solvedandtotal.innerText = `${questionCounter}/${maxQuestions}`;
};

choices.forEach(choice => {
    choice.addEventListener('click',e=>{
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        // console.log(selectedAnswer);

        const newClass = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        console.log(newClass);
        if(newClass == "correct")
            score +=correctBonus;
        selectedChoice.parentElement.classList.add(newClass);
        setTimeout( ()=>{
            selectedChoice.parentElement.classList.remove(newClass);
            getNewQuestions();
            scores.innerText = score;
        }, 1000);
    });
});

startGame();