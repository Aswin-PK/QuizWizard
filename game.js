const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice'));
const solvedAndTotal = document.getElementById('solvedandtotal');
const scores = document.getElementById('scores');

const loading = document.getElementById('loading');
const game = document.getElementById('innercontainer');


let currentQuestion = {};
let score = 0;
const correctAnswerBonus = 5;
let questionCounter = 0;
let availableQuestion = [];
let acceptingAnswers = true;
let questions = [];
let maxQuestions;

// fetching questions and answers using Open Trivia DB API
fetch("https://opentdb.com/api.php?amount=20&category=18&type=multiple")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        questions = loadedQuestions.results.map(loadedQuestion =>{
            const formattedQuestions ={
                question: loadedQuestion.question
            };
            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestions.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(
                formattedQuestions.answer - 1,//index
                0,//how many are removing
                loadedQuestion.correct_answer//what to be removed
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestions["choice"+(index+1)] = choice;
            });
            return formattedQuestions;
        });
        startGame();
    })
    .catch(err => {
        console.error(err);
    })

//starting point 

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    maxQuestions = availableQuestion.length;
    getNewQuestions();
    game.style.display ="flex";
    loading.style.visibility ="hidden";
};

// for loading next new questions
getNewQuestions = () =>{
    if(availableQuestion == 0 || questionCounter >= maxQuestions){
        //Will go to highscore page when all questions are answered
        localStorage.setItem("recentScore",score);
        return window.location.assign("end.html");
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random()*availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;
    acceptingAnswers = true;

    choices.forEach(choice =>{
        const number = choice. dataset['number'];
        choice.innerText = currentQuestion['choice'+number];
    });

    availableQuestion.splice(questionIndex, 1);
    solvedAndTotal.innerText = `${questionCounter}/${maxQuestions}`;
};

choices.forEach(choice => {
    choice.addEventListener('click',e=>{
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        const option = document.getElementById(currentQuestion.answer);
        const newClass = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if(newClass == "correct")
        {
            score += correctAnswerBonus;
        }
        else
        {
            // for highlighting correct answer
            option.parentElement.classList.add("correct");
        }
        selectedChoice.parentElement.classList.add(newClass);
        setTimeout( ()=>{
            selectedChoice.parentElement.classList.remove(newClass);
            option.parentElement.classList.remove("correct");
            getNewQuestions();
            scores.innerText = score;
        }, 1000);
    });
});
