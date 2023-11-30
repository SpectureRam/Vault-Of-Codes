const board = document.getElementById('board');
const message = document.getElementById('message');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        renderBoard();
        checkWinner();
        togglePlayer();
    }
}

function renderBoard() {
    board.innerHTML = '';
    gameBoard.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = value;
        cell.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cell);
    });
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 4, 8], [2, 4, 6],             
        [0, 3, 6], [1, 4, 7], [2, 5, 8]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            message.textContent = `Player ${currentPlayer} wins!`;
            message.style.color = '#4caf50';
        }
    }

    if (!gameBoard.includes('') && gameActive) {
        gameActive = false;
        message.textContent = 'It\'s a draw!';
        message.style.color = '#333';
    }
}

renderBoard();

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    message.textContent = '';
    renderBoard();
}