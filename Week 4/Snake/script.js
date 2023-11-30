document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const scoreElement = document.getElementById('score');
    const startButton = document.getElementById('start-btn');
    const endButton = document.getElementById('end-btn');
    const gridSize = 20;
    const snakeSpeed = 200;
    let snake = [{ x: 10, y: 10 }];
    let food = getRandomFoodPosition();
    let score = 0;
    let direction = 'right';
    let gameInterval;

    function createBoard() {
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                board.appendChild(cell);
            }
        }
    }

    function renderSnake() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.classList.remove('snake'));

        snake.forEach(segment => {
            const index = segment.x + segment.y * gridSize;
            cells[index].classList.add('snake');
        });
    }

    function renderFood() {
        const cells = document.querySelectorAll('.cell');
        const index = food.x + food.y * gridSize;
        cells[index].classList.add('food');
    }

    function removeFood() {
        const cells = document.querySelectorAll('.cell');
        const index = food.x + food.y * gridSize;
        cells[index].classList.remove('food');
    }

    function getRandomFoodPosition() {
        return {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        };
    }

    function moveSnake() {
        const head = Object.assign({}, snake[0]); // Clone the head
        switch (direction) {
            case 'up':
                head.y = (head.y - 1 + gridSize) % gridSize;
                break;
            case 'down':
                head.y = (head.y + 1) % gridSize;
                break;
            case 'left':
                head.x = (head.x - 1 + gridSize) % gridSize;
                break;
            case 'right':
                head.x = (head.x + 1) % gridSize;
                break;
        }

        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreElement.textContent = 'Score: ' + score;
            removeFood(); 
            food = getRandomFoodPosition();
            renderFood(); 
        } else {
            snake.pop();
        }

        snake.unshift(head);
        renderSnake();

        if (snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
            gameOver();
        }
    }

    function gameOver() {
        clearInterval(gameInterval);
        alert('Game Over! Your score is ' + score);
        resetGame();
    }

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        score = 0;
        scoreElement.textContent = 'Score: ' + score;
        direction = 'right';
        startButton.disabled = false;
        endButton.disabled = true;
        clearBoard();
    }

    function clearBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.classList.remove('snake', 'food'));
    }

    function handleKeyPress(event) {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }

    function startGame() {
        clearBoard();
        createBoard();
        renderSnake();
        renderFood();
        document.addEventListener('keydown', handleKeyPress);
        gameInterval = setInterval(moveSnake, snakeSpeed);
        startButton.disabled = true;
        endButton.disabled = false;
    }

    function endGame() {
        clearInterval(gameInterval);
        resetGame();
    }

    startButton.addEventListener('click', startGame);
    endButton.addEventListener('click', endGame);
});
