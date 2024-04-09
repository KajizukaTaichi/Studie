function showAlert(message, url) {
    // カスタムアラートの要素を作成
    var overlay = document.createElement('div');
    overlay.classList.add('custom-alert-overlay');
    overlay.id = 'customAlertOverlay';
    
    var alertBox = document.createElement('div');
    alertBox.classList.add('custom-alert');
    alertBox.id = 'customAlert';

    var image = document.createElement('img');
    image.src=url;
    
    var alertMessage = document.createElement('div');
    alertMessage.id = 'customAlertMessage';
    alertMessage.innerHTML = message;
    
    var closeButton = document.createElement('button');
    closeButton.id = 'customAlertButton';
    closeButton.innerHTML = 'OK';
    closeButton.onclick = function() {
        overlay.style.display = 'none';
        alertBox.style.display = 'none';
    };

    // 要素をドキュメントに追加
    overlay.appendChild(alertBox);
    alertBox.appendChild(image);
    alertBox.appendChild(alertMessage);
    alertBox.appendChild(closeButton);
    document.body.appendChild(overlay);

    overlay.style.display = 'block';
    alertBox.style.display = 'block';
    alertMessage.innerHTML = message;

    closeButton.onclick = function() {
      overlay.style.display = 'none';
      alertBox.style.display = 'none';
    };
  }


const questions = [
{
    question: "徳川家康は何幕府を開いた？",
    options: ["鎌倉", "室町", "江戸"],
    answer: "江戸"
},
{
    question: "グラックス兄弟がしなかった事は？",
    options: ["公有地の分配", "元老院政治の強化", "ローマ市民権の拡充", "新しい植民市の建設"],
    answer: "元老院政治の強化"
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
        showAlert("正解！おめでとうございます", "/correct.jpg");
        score++;
    } else {
        showAlert(`残念。正解は${currentQuestion.answer}でした`, "/wrong.jpg");
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
    resultDiv.innerHTML = `
        <img src="/clear.jpg"><img>
        <h3>Your Score: ${score}/${questions.length}</h3>
    `;
}

// Event listener for submit button
submitBtn.addEventListener('click', checkAnswer);

// Display first question
displayQuestion();