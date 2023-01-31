const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice'));
const solvedandtotal = document.getElementById('solvedandtotal');
const scores = document.getElementById('scores');

const loading = document.getElementById('loading');
const game = document.getElementById('innercontainer');


console.log(choices);
let currentQuestion = {};
let score = 0;
let questionCounter = 0;
let availableQuestion = [];
let acceptingAnswers = true;
let questions = [];
fetch("https://opentdb.com/api.php?amount=20&category=18&type=multiple")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        console.log(loadedQuestions.results);
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


const correctBonus = 5;
let maxQuestions;

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    // console.log(availableQuestion);
    maxQuestions = availableQuestion.length;
    // question.innerText = availableQuestion.question;
    getNewQuestions();
    game.style.display ="flex";
    loading.style.visibility ="hidden";
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