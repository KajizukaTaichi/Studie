function celebrateSuccess() {
    var textElement = document.createElement('div');
    textElement.textContent = '正解！おめでとうございます';
    textElement.style.position = 'fixed';
    textElement.style.top = '50%';
    textElement.style.left = '50%';
    textElement.style.transform = 'translate(-50%, -50%)';
    textElement.style.fontSize = '3em';
    textElement.style.fontWeight = 'bold';
    textElement.style.color = 'red';
    textElement.style.opacity = '0';

    document.body.appendChild(textElement);

    var opacity = 0;
    var animationInterval = setInterval(function() {
        opacity += 0.05;
        textElement.style.opacity = opacity;
        if (opacity >= 1) {
            clearInterval(animationInterval);
            setTimeout(function() {
                document.body.removeChild(textElement);
            }, 2000);
        }
    }, 50);
}

function celebrateWrong(answer) {
    var textElement = document.createElement('div');
    textElement.textContent = `残念。正解は${answer}でした`;
    textElement.style.position = 'fixed';
    textElement.style.top = '50%';
    textElement.style.left = '50%';
    textElement.style.transform = 'translate(-50%, -50%)';
    textElement.style.fontSize = '3em';
    textElement.style.fontWeight = 'solid';
    textElement.style.color = 'blue';
    textElement.style.opacity = '0';

    document.body.appendChild(textElement);

    var opacity = 0;
    var animationInterval = setInterval(function() {
        opacity += 0.05;
        textElement.style.opacity = opacity;
        if (opacity >= 1) {
            clearInterval(animationInterval);
            setTimeout(function() {
                document.body.removeChild(textElement);
            }, 2000);
        }
    }, 50);
}

const questions = [
{
    question: "徳川家康は何幕府を開いた?",
    options: ["鎌倉", "室町", "江戸"],
    answer: "江戸"
},
{
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4"
}
];

const questionDiv = document.getElementById('question');
const optionsDiv = document.getElementById('options');
const submitBtn = document.getElementById('submitBtn');
const resultDiv = document.getElementById('result');

let currentQuestionIndex = 0;
let score = 0;

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionDiv.innerHTML = `<p>${currentQuestion.question}</p>`;
    optionsDiv.innerHTML = currentQuestion.options.map(option =>
        `<div class="form-check">
        <input class="form-check-input" type="radio" name="option" value="${option}">
        <label class="form-check-label">${option}</label>
        </div>`
    ).join('');
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert("Please select an option!");
        return;
    }

    const selectedAnswer = selectedOption.value;
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
        celebrateSuccess();
        score++;
    } else {
        celebrateWrong(currentQuestion.answer);
    }

    currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showResult();
        }
}

function showResult() {
    questionDiv.innerHTML = '';
    optionsDiv.innerHTML = '';
    submitBtn.style.display = 'none';
    resultDiv.innerHTML = `<h3>Your Score: ${score}/${questions.length}</h3>`;
}

// Event listener for submit button
submitBtn.addEventListener('click', checkAnswer);

// Display first question
displayQuestion();