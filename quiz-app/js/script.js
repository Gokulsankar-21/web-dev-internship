// Quiz App - Interactive Design

// All Required Elements
const startBtn = document.querySelector('.start_btn button');
const infoBox = document.querySelector('#info_box');
const quitBtns = document.querySelectorAll('.quit');
const continueBtn = document.querySelector('.continue');
const quizBox = document.querySelector('#quiz_box');
const optionList = quizBox.querySelector('.option_list');
const resultBox = document.querySelector('#result_box');
const restartBtn = resultBox.querySelector('.restart');
const nextBtn = document.querySelector('.next_btn');
const scorTextElement = resultBox.querySelector('.score_text');
const timeElement = quizBox.querySelector('.time');
const timeText = quizBox.querySelector('.time_text');
const indicator = quizBox.querySelector('.indicator');

// Global Variables
let queCount = 0;
let timeValue = 15;
let counterTime;
let counterLine;
let widthValue = 0;
let score = 0;

// If Start Button Clicked
startBtn.onclick = () => {
    infoBox.classList.add('activeInfo');
}

// If Continue Button Clicked
continueBtn.onclick = () => {
    quizBox.classList.add('activeQuiz');
    infoBox.classList.remove('activeInfo');
    queCount = 0;
    score = 0;
    showQuestion(0);
    showTimer(timeValue);
    timerIndicator(widthValue);
    nextBtn.style.display = 'none';
}

// If Next Button Clicked 
nextBtn.onclick = () => {
    if (queCount < queArray.length - 1) {
        queCount++;

        showQuestion(queCount);
        reset();
        console.log('counterTime destroyed');
        nextBtn.style.display = 'none';
    }
    else {
        indicator.style.width=0+'px';
        resultBox.classList.add('activeResult');
        quizBox.classList.remove('activeQuiz');
        indicator.style.width = 0 + 'px';
        if (score > 3) {
            let scoreTag = '<span> and Great 😎, You got <p>' + score + '</p>out of <p>' + queArray.length + '</p></span>';
            scorTextElement.innerHTML = scoreTag;
        }
        else if (score > 1) {
            let scoreTag = '<span> and Nice 😃, You got <p>' + score + '</p>out of <p>' + queArray.length + '</p></span>';
            scorTextElement.innerHTML = scoreTag;
        }
        else {
            let scoreTag = '<span> and sorry!, You got only <p>' + score + '</p>out of <p>' + queArray.length + '</p></span>';
            scorTextElement.innerHTML = scoreTag;
        }
    }
}

// If Restart Button Clicked
restartBtn.onclick = () => {
    queCount = 0;
    score = 0;
    timeText.textContent = 'Time Left';
    nextBtn.style.display = 'none';
    resultBox.classList.remove('activeResult');
    quizBox.classList.add('activeQuiz');
    indicator.style.width = 0 + 'px';
    reset();
    showQuestion(0);
}

// Reset Values
function reset() {-
    clearInterval(counterTime);
    showTimer(timeValue);
    clearInterval(counterLine);
    timerIndicator(widthValue);
}

// If Quit Button Clicked 
for (let index = 0; index < quitBtns.length; index++) {
    quitBtns[index].onclick = () => {
        resultBox.classList.remove('activeResult');
        infoBox.classList.remove('activeInfo');
    }
}

// Question Box Functionality
function showQuestion(index) {

    // Display Question
    const queText = quizBox.querySelector('.que_text');
    let queTag = '<span>' + queArray[index].number + '. ' + queArray[index].question + '</span>';
    queText.innerHTML = queTag;

    // Display Options
    let optionTag = '<div class="option"><span>' + queArray[index].optionList[0] + '</span></div>'
        + '<div class="option"><span>' + queArray[index].optionList[1] + '</span></div>'
        + '<div class="option"><span>' + queArray[index].optionList[2] + '</span></div>'
        + '<div class="option"><span>' + queArray[index].optionList[3] + '</span></div>';
    optionList.innerHTML = optionTag;

    // Display Question Status
    const queStatusTag = '<p>' + queArray[queCount].number + '</p>of <p>' + queArray.length + '</p>Questions';
    const queStatusElement = quizBox.querySelector('.que_status');
    queStatusElement.innerHTML = queStatusTag;

    const optionsArray = optionList.querySelectorAll('.option');

    // Adding Click Event to Options
    for (let index = 0; index < optionsArray.length; index++) {
        const option = optionsArray[index];
        option.onclick = () => {
            answerCheck(option);

            // If User Select Any Option then Disable all Option 
            for (let index = 0; index < optionsArray.length; index++) {
                const option = optionsArray[index];
                option.classList.add('disable');
            }
            nextBtn.style.display = 'block';
            clearInterval(counterTime);
            clearInterval(counterLine);
        }
    }
}

// Creating Icons 
const tickIcon = '<div class="icon tick"><i class="fa-solid fa-check"></i></div>';
const tickElement = document.createElement('div');
tickElement.innerHTML = tickIcon;

const crossIcon = '<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';
const crossElement = document.createElement('div');
crossElement.innerHTML = crossIcon;

// Answer Checking Functionality
function answerCheck(answer) {
    let selectedAnswer = answer.textContent;

    if (selectedAnswer == queArray[queCount].answer) {
        // If Selected Option is Correct  
        score++;
        console.log('answer is correct');
        answer.classList.add('correct');
        answer.insertAdjacentElement('beforeend', tickElement);
    }
    else {
        // If Selected Option is Wrong  
        console.log('answer is wrong');
        answer.classList.add('wrong');
        answer.insertAdjacentElement('beforeend', crossElement);

        // If Selected Option is Wrong then Display the Correct One
        const optionsArray = optionList.querySelectorAll('.option');
        for (let index = 0; index < optionsArray.length; index++) {
            const option = optionsArray[index];
            if (option.textContent == queArray[queCount].answer) {
                option.classList.add('correct');
                option.insertAdjacentElement('beforeend', tickElement);
            }
        }
    }
};

// Timer Functionality
function showTimer(timeValue) {
    let time = timeValue;
    counterTime = setInterval(timer, 1000);
    timeText.textContent = 'Time Left';
    timeElement.textContent = 15;

    function timer() {
        if (time > 0) {
            time--;
            timeElement.textContent = time < 10 ? '0' + time : time;
        }
        else if (time == 0) {
            timeElement.textContent = time < 10 ? '0' + time : time;
            timeText.textContent = 'Time Off';
            time--;
            nextBtn.style.display = 'block';

            // If Time Off then Display the Correct Answer
            const optionsArray = optionList.querySelectorAll('.option');
            for (let index = 0; index < optionsArray.length; index++) {
                const option = optionsArray[index];
                if (option.textContent == queArray[queCount].answer) {
                    option.setAttribute('class', 'option correct');
                    option.insertAdjacentElement('beforeend', tickElement);
                }
            }

            // If Time Off then Disable All Option
            for (let index = 0; index < optionsArray.length; index++) {
                const option = optionsArray[index];
                option.classList.add('disable');
            }
        }
        else {
            console.log('counterTime destroyed');
            clearInterval(counterTime);
            clearInterval(counterLine);
        }
    }
};

// TimeIndicator Functionality
function timerIndicator(width) {
    let quizBoxWidth = quizBox.clientWidth;
    counterLine = setInterval(() => {
        if (quizBoxWidth >= width) {
            width += 2;
            indicator.style.width = width + 'px';
        }
    }, 50);
};
