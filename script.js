const questions = [
    {
        question: "Who created this website?",
        choices: [
            { text: "Turbu", correct: false},
            { text: "63011555", correct: false},
            { text: "Jessedakorn", correct: false},
            { text: "Nijika's husband", correct: true},
        ]
    },
    {
        question: "What is Turbo favorite food",
        choices: [
            { text: "Gold curry", correct: false},
            { text: "Moo spicy", correct: true},
            { text: "Tee-Noi", correct: false},
            { text: "Steak", correct: false},
        ]
    },
    {
        question: "What is Turbo favorite game?",
        choices: [
            { text: "CSGO", correct: false},
            { text: "Valorant", correct: false},
            { text: "Apex Legend", correct: false},
            { text: "Bubble League", correct: true},
        ]
    },
    {
        question: "What is Turbo's favorite gun in CSGO?",
        choices: [
            { text: "XM014", correct: false},
            { text: "Five-Seven", correct: false},
            { text: "SCAR-20", correct: true},
            { text: "Negev", correct: false},
        ]
    },
    {
        question: "Coming soon",
        choices: [
            { text: "?", correct: false},
            { text: "??", correct: false},
            { text: "???", correct: false},
            { text: "????", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const choiceButtons = document.getElementById("choice-container");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next!";
    ShowQuestion();
}


function ShowQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex]; 
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.choices.forEach(choice => {
        const button = document.createElement("button");
        button.innerHTML = choice.text;
        button.classList.add("choice-btn");
        choiceButtons.appendChild(button);
        if(choice.correct){
            button.dataset.correct = choice.correct;
        }
        button.addEventListener("click",selectChoice)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(choiceButtons.firstChild){
        choiceButtons.removeChild(choiceButtons.firstChild);
    }
}

function selectChoice(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++; 
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(choiceButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
        //    button.classList.add("correct"); 
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    if(score === 0){
        questionElement.innerHTML = `You score ${score} out of ${questions.length}!<br>You are C.`;
        window.close();
    }   
    if(score === 1){
        questionElement.innerHTML = `You score ${score} out of ${questions.length}!<br>You better than C.`;
    }
    if(score === 2){
        questionElement.innerHTML = `You score ${score} out of ${questions.length}!<br>You have some knowledge about Turbo, but you should learn more about him.`;
    }
    if(score === 3){
        questionElement.innerHTML = `You score ${score} out of ${questions.length}!<br>You have some knowledge about Turbo, but you should learn more about him.`;
    }
    if(score === 4){
        questionElement.innerHTML = `You score ${score} out of ${questions.length}!<br>You're Turbo expert. You might end up becoming friend with him.`;
    }
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        ShowQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
