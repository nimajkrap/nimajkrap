// 랜덤한 숫자 생성
const randomNumber = Math.floor(Math.random() * 100) + 1;

// 결과 메시지 업데이트
function updateMessage(message) {
    document.getElementById('message').textContent = message;
}

// 추측한 숫자 확인
function checkGuess() {
    const guess = parseInt(document.getElementById('guessField').value);
    
    if (guess < 1 || guess > 100 || isNaN(guess)) {
        updateMessage('Please enter a valid number between 1 and 100.');
        return;
    }

    if (guess === randomNumber) {
        updateMessage(`Congratulations! You guessed the correct number (${randomNumber}).`);
    } else if (guess < randomNumber) {
        updateMessage('Too low! Try again.');
    } else {
        updateMessage('Too high! Try again.');
    }
}


// 컴퓨터의 선택을 무작위로 생성
function computerPlay() {
    const options = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

// 게임 결과 메시지 업데이트
function updateResult(message) {
    document.getElementById('result').textContent = message;
}

// 게임 플레이
function playGame(userChoice) {
    const computerChoice = computerPlay();

    if (userChoice === computerChoice) {
        updateResult(`It's a tie! Both chose ${userChoice}.`);
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        updateResult(`You win! ${userChoice} beats ${computerChoice}.`);
    } else {
        updateResult(`You lose! ${computerChoice} beats ${userChoice}.`);
    }
}

// 단어 목록
const words = ["apple", "banana", "cherry", "orange", "grape", "kiwi", "melon"];

// 랜덤 단어 선택
const randomWord = words[Math.floor(Math.random() * words.length)];

// 단어를 표시할 배열 생성
const displayedWord = new Array(randomWord.length).fill('_');

// 현재 남은 시도 횟수
let remainingAttempts = 6;

// 단어 표시 업데이트
function updateWordDisplay() {
    document.getElementById('wordDisplay').textContent = displayedWord.join(' ');
}

// 메시지 업데이트
function updateMessage(message) {
    document.getElementById('message').textContent = message;
}

// 알파벳 추측 처리
function guessLetter() {
    const guess = document.getElementById('guessInput').value.toLowerCase();

    if (!guess || !guess.match(/^[a-z]$/)) {
        updateMessage('Please enter a single letter from A to Z.');
        return;
    }

    if (randomWord.includes(guess)) {
        for (let i = 0; i < randomWord.length; i++) {
            if (randomWord[i] === guess) {
                displayedWord[i] = guess;
            }
        }
        updateWordDisplay();
        if (!displayedWord.includes('_')) {
            updateMessage('Congratulations! You guessed the word!');
            document.getElementById('guessInput').setAttribute('disabled', 'true');
        }
    } else {
        remainingAttempts--;
        updateMessage(`Incorrect guess! ${remainingAttempts} attempts remaining.`);
        if (remainingAttempts === 0) {
            updateMessage(`Sorry, you're out of attempts! The word was "${randomWord}".`);
            document.getElementById('guessInput').setAttribute('disabled', 'true');
        }
    }
}
// 초기화
updateWordDisplay();


// 카드에 표시될 그림 목록
const symbols = ['🍎', '🍌', '🍒', '🍊', '🍇', '🥝', '🍉', '🍓'];

// 게임 그리드 생성
const gameGrid = document.getElementById('gameGrid');

// 카드를 뒤집어서 표시할 상태
let flippedCards = [];

// 카드를 생성하여 그리드에 추가하는 함수
function createCard(symbol) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = symbol;
    card.addEventListener('click', () => flipCard(card));
    gameGrid.appendChild(card);
}

// 게임 초기화
function resetGame() {
    flippedCards = [];
    gameGrid.innerHTML = '';
    const shuffledSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    shuffledSymbols.forEach(symbol => createCard(symbol));
}

// 카드를 뒤집는 함수
function flipCard(card) {
    // 이미 뒤집힌 카드는 무시
    if (flippedCards.length === 2 || card.classList.contains('flipped')) {
        return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    // 두 개의 카드가 뒤집어졌을 때 비교
    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        if (card1.textContent !== card2.textContent) {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        } else {
            flippedCards = [];
        }
    }
}

// 게임 초기화
resetGame();
