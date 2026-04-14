// --- Fungsi Matematika ---
function calculateFPB(a, b) {
    if (b === 0) return a;
    return calculateFPB(b, a % b);
}

function calculateKPK(a, b) {
    return (a * b) / calculateFPB(a, b);
}

function getFactors(n) {
    let factors = [];
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) factors.push(i);
    }
    return factors;
}

function getMultiples(n, count = 7) {
    let multiples = [];
    for (let i = 1; i <= count; i++) {
        multiples.push(n * i);
    }
    return multiples;
}

// --- Logika Kalkulator ---
const calcBtn = document.getElementById('calc-btn');
const inputNum1 = document.getElementById('num1');
const inputNum2 = document.getElementById('num2');
const resultBox = document.getElementById('calc-result');
const resFpb = document.getElementById('res-fpb');
const resKpk = document.getElementById('res-kpk');
const caraFpb = document.getElementById('cara-fpb');
const caraKpk = document.getElementById('cara-kpk');

calcBtn.addEventListener('click', () => {
    const num1 = parseInt(inputNum1.value);
    const num2 = parseInt(inputNum2.value);

    // Validasi input
    if (isNaN(num1) || isNaN(num2) || num1 <= 0 || num2 <= 0) {
        alert('Halo! Mohon masukkan angka yang valid dan lebih besar dari 0 ya!');
        return;
    }

    const fpb = calculateFPB(num1, num2);
    const kpk = calculateKPK(num1, num2);

    // Animasi perubahan teks
    resFpb.textContent = fpb;
    resKpk.textContent = kpk;

    // Generate cara kerja factors & multiples
    const factors1 = getFactors(num1);
    const factors2 = getFactors(num2);
    // Highlight common factors
    let factor1HTML = factors1.map(f => `<strong>${f}</strong>`).join(', ');
    caraFpb.innerHTML = `Faktor ${num1}: <br>${factors1.join(', ')}<br><br>Faktor ${num2}: <br>${factors2.join(', ')}<br><br>Faktor terbesar yang sama adalah <strong>${fpb}</strong>`;

    const mult1 = getMultiples(num1, 8);
    const mult2 = getMultiples(num2, 8);
    caraKpk.innerHTML = `Kelipatan ${num1}: <br>${mult1.join(', ')}, ...<br><br>Kelipatan ${num2}: <br>${mult2.join(', ')}, ...<br><br>Kelipatan terkecil yang sama adalah <strong>${kpk}</strong>`;

    resultBox.classList.remove('hidden');
});

// --- Logika Kuis ---
const quizData = [
    {
        question: "Berapa FPB dari 8 dan 12?",
        options: ["2", "4", "8", "24"],
        correct: 1
    },
    {
        question: "KPK dari 3 dan 5 adalah...",
        options: ["8", "12", "15", "30"],
        correct: 2
    },
    {
        question: "Berapa FPB dari 10 dan 20?",
        options: ["5", "10", "20", "200"],
        correct: 1
    },
    {
        question: "KPK dari angka 4 dan 6 adalah?",
        options: ["10", "12", "24", "2"],
        correct: 1
    },
    {
        question: "Jika FPB dari dua angka adalah 1, kedua angka itu disebut...",
        options: ["Angka Kembar", "Prima Relatif", "Angka Genap", "Angka Ajaib"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('quiz-options');
const quizContainer = document.getElementById('quiz-container');
const scoreContainer = document.getElementById('quiz-score');
const scoreValue = document.getElementById('score-value');
const scoreMessage = document.getElementById('score-message');
const restartBtn = document.getElementById('restart-quiz');

function loadQuiz() {
    optionsContainer.innerHTML = '';
    const currentQuiz = quizData[currentQuestion];
    questionText.textContent = `Soal ${currentQuestion + 1}: ${currentQuiz.question}`;

    currentQuiz.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.classList.add('option-btn');
        btn.addEventListener('click', () => selectAnswer(index, btn));
        optionsContainer.appendChild(btn);
    });
}

function selectAnswer(selectedIndex, btnElement) {
    const correctIndex = quizData[currentQuestion].correct;
    
    // Matikan semua tombol
    const allBtns = optionsContainer.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.style.pointerEvents = 'none');

    // Cek jawaban
    if (selectedIndex === correctIndex) {
        btnElement.classList.add('correct');
        score++;
    } else {
        btnElement.classList.add('wrong');
        allBtns[correctIndex].classList.add('correct'); // Show correct answer
    }

    // Lanjut ke soal berikutnya setelah delay
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuiz();
        } else {
            showScore();
        }
    }, 1500);
}

function showScore() {
    quizContainer.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    scoreValue.textContent = score;

    if (score === 5) {
        scoreMessage.innerHTML = "Luar biasa! Kamu jenius matematika! 🌟<br>Sempurna!";
    } else if (score >= 3) {
        scoreMessage.innerHTML = "Hebat! Kamu sudah memahami dengan baik! 👍<br>Terus berlatih ya.";
    } else {
        scoreMessage.innerHTML = "Terus semangat belajar, kamu pasti bisa! 💪<br>Jangan menyerah!";
    }
}

restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    quizContainer.classList.remove('hidden');
    scoreContainer.classList.add('hidden');
    loadQuiz();
});

// Load soal pertama
loadQuiz();
