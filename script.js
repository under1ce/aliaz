let words = ["Солнце", "Компьютер", "Автомобиль", "Гитара", "Робот", "Телефон", "Планета", "Карандаш", "Мост", "Фонарь"];
let teams = [];
let currentTeamIndex = 0;
let scoreLimit = 10;
let scores = {};
let index = 0;
let timer = 60;
let timerInterval;
let guessedWords = [];
let skippedWords = [];

// Функция генерации полей для ввода названий команд
function generateTeamInputs() {
    let count = document.getElementById("team-count").value;
    let container = document.getElementById("team-names");
    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Название команды ${i + 1}`;
        input.id = `team-${i}`;
        container.appendChild(input);
    }
}

// Функция начала игр
function startGame() {
    let teamCount = parseInt(document.getElementById("team-count").value);
    scoreLimit = parseInt(document.getElementById("score-limit").value);

    if (teamCount < 2) {
        alert("Минимальное количество команд - 2!");
        return;
    }

    teams = [];
    scores = {};
    for (let i = 0; i < teamCount; i++) {
        let teamName = document.getElementById(`team-${i}`)?.value.trim() || `Команда ${i + 1}`;
        teams.push(teamName);
        scores[teamName] = 0;
    }

    if (teams.length === 0) {
        alert("Выберите количество команд!");
        return;
    }

    // Переключаем экраны
    document.getElementById("setup-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";

    startRound();
}

// Функция начала нового раунда
function startRound() {
    document.getElementById("team-name").innerText = `🎉 Ходит: ${teams[currentTeamIndex]}`;
    index = 0;
    timer = 60;
    guessedWords = [];
    skippedWords = [];
    document.getElementById("guessed-list").innerHTML = "";
    document.getElementById("skipped-list").innerHTML = "";
    updateWord();
    startTimer();
}

// Обновление текущего слова
function updateWord() {
    if (index < words.length) {
        let wordElement = document.getElementById("word");
        wordElement.innerText = " 🗣️ " + words[index]; // Показываем новое слово
        wordElement.classList.add("current-word"); // Добавляем стиль
    } else {
        endRound();
    }
}


// Таймер
function startTimer() {
    let timerElement = document.getElementById("timer");
    clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        if (timer > 0) {
            timer--;
            timerElement.innerText = `⏳ ${timer}`;
        } else {
            clearInterval(timerInterval);
            endRound();
        }
    }, 1000);
}

// Завершение раунда
function endRound() {
    clearInterval(timerInterval);
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("score-screen").style.display = "block";

    let scoreList = document.getElementById("team-scores");
    scoreList.innerHTML = "";
    teams.forEach(team => {
        let li = document.createElement("li");
        li.innerText = `${team}: ${scores[team]} очков`;
        scoreList.appendChild(li);
    });

    if (scores[teams[currentTeamIndex]] >= scoreLimit) {
        alert(`🏆 Победила команда ${teams[currentTeamIndex]}!`);
        location.reload();
    }
}

// Следующий раунд
function nextRound() {
    currentTeamIndex = (currentTeamIndex + 1) % teams.length;
    document.getElementById("score-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    startRound();
}

// Кнопки "Угадано" и "Пропустить"
document.getElementById("correct").addEventListener("click", () => {
    scores[teams[currentTeamIndex]]++;
    guessedWords.push(words[index]);
    updateWordList("guessed-list", guessedWords, "correct");
    index++;
    updateWord();
});

document.getElementById("skip").addEventListener("click", () => {
    skippedWords.push(words[index]);
    updateWordList("skipped-list", skippedWords, "skipped");
    index++;
    updateWord();
});

// Функция для обновления списка угаданных/пропущенных слов
function updateWordList(listId, wordsArray, className) {
    let list = document.getElementById(listId);
    list.innerHTML = "";
    wordsArray.forEach(word => {
        let li = document.createElement("li");
        li.innerText = word;
        li.classList.add(className);
        list.appendChild(li);
    });
}
