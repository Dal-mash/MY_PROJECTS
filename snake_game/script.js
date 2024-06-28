const board = document.getElementById('game-board');
const gridSize = 20;
const instruction = document.getElementById('instruction');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');
const logo =document.getElementById('logo');
let gameIntervalDelay = 500;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let dir = 'right';
let gameInterval;
let gameStarted = false;
let highScore = 0;

function generateFood() {
    while (true) {
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        
        let validPosition = true;
        for (let i = 0; i < snake.length; i++) {
            if (x === snake[i].x && y === snake[i].y) {
                validPosition = false;
                break;
            }
        }
        
        if (validPosition) {
            return { x, y };
        }
    }
}


// Draw map, food and snake
function draw() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
}

// Draw snake
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}

// Create game elements
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Set position of element
function setPosition(element, position) {
    element.style.gridColumnStart = position.x;
    element.style.gridRowStart = position.y;
}
//Draw food
function drawFood() {
    if(gameStarted){
        const foodElement = createGameElement('div', 'food');
        setPosition(foodElement, food);
        board.appendChild(foodElement);                                 
    }
}

// Moving the snake
function move() {
    const head = { ...snake[0] };
    switch (dir) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        default:
            break;
    }
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        increment();
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            move();
            checkCollision();
            draw();
        }, gameIntervalDelay);
    } else {
        snake.pop();
    }

}
//starting the game
function startGame() {
    gameStarted = true;
    instruction.style.display = 'none';
    logo.style.display = 'none';
    gameInterval = setInterval(() => {
        move();
        draw();
    }, gameIntervalDelay);
}

//handling inputs
function handleKeyPress(event) {
    if ((!gameStarted && event.code === 'Space') || (!gameStarted && event.key === ' ')) {
        startGame();
    } else {
        switch (event.key) {
            case 'w':
                dir = 'up';
                break;
            case 's':
                dir = 'down';
                break;
            case 'd':
                dir = 'right';
                break;
            case 'a':
                dir = 'left';
                break;
            default:
                break;
        }
    }
}

document.addEventListener('keydown', handleKeyPress);


//checking for collisions
function checkCollision() {
    const head = snake[0];
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}


//resetting the game
function resetGame() {
    updateHighScore();
    stopGame();
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    dir = 'right';
    gameIntervalDelay = 500;
}


//increment in snake's speed
function increment() {
    if (gameIntervalDelay > 400) {
        gameIntervalDelay -= 20;
    } else if (gameIntervalDelay > 300) {
        gameIntervalDelay -= 15;
    } else if (gameIntervalDelay > 200) {
        gameIntervalDelay -= 10;
    } else if (gameIntervalDelay > 100) {
        gameIntervalDelay -= 5;
    } else if (gameIntervalDelay > 50) {
        gameIntervalDelay -= 2;
    }
}

//updating score
function updateScore() {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, '0');
    console.log(gameIntervalDelay);
}

//updating highScore
function updateHighScore() {
    const currentScore = snake.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3, '0');
    }
}

//stopping the game
function stopGame() {
    board.innerHTML = '';
    clearInterval(gameInterval);
    gameStarted = false;
    instruction.style.display = 'block';
    logo.style.display = 'block';
}
