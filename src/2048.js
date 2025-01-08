
let grid = [];
let score = 0;
let allUsers=JSON.parse(localStorage.getItem("usersDetails"));
const currentUser=getCookie("username"); //use cookie
let highScore = allUsers.find(user => user.username === currentUser)?.games[1];
let totalScore = allUsers.find(user => user.username === currentUser)?.totalScore;
document.getElementById('gameOver').style.display = 'none';
document.getElementById('youWon').style.display = 'none';

const gridSize = 4;
win= false;

document.getElementById('highScore').textContent = highScore;

function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        allUsers.find(user => user.username === currentUser).games[1]=highScore;
        document.getElementById('highScore').textContent = highScore;
       
    }
    localStorage.setItem("usersDetails", JSON.stringify(allUsers)); //save the details

}



function initGrid() {
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = '';
    grid = [];

    for (let i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (let j = 0; j < gridSize; j++) {
            grid[i][j] = 0;
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${i}-${j}`;
            gridElement.appendChild(cell);
        }
    }
}

function updateDisplay() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            cell.textContent = grid[i][j] || '';
            cell.dataset.value = grid[i][j] || '';
        }
    }
    document.getElementById('score').textContent = score;
    updateHighScore();
}

function addNewTile() {
    const emptyCells = [];
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === 0) {
                emptyCells.push({i, j});
            }
        }
    }
 
    if (emptyCells.length > 0) {
        const {i, j} = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[i][j] = Math.random() < 0.9 ? 2 : 4;
    }
}

function move(direction) {
    let moved = false;
    const newGrid = JSON.parse(JSON.stringify(grid));

    function moveInDirection(row, col, deltaRow, deltaCol) {
        if (newGrid[row][col] === 0) return false;
        
        let newRow = row + deltaRow;
        let newCol = col + deltaCol;
        
        while (
            newRow >= 0 && newRow < gridSize &&
            newCol >= 0 && newCol < gridSize
        ) {
            if (newGrid[newRow][newCol] === 0) {
                newGrid[newRow][newCol] = newGrid[newRow - deltaRow][newCol - deltaCol];
                newGrid[newRow - deltaRow][newCol - deltaCol] = 0;
                moved = true;
            } else if (newGrid[newRow][newCol] === newGrid[newRow - deltaRow][newCol - deltaCol]) {
                newGrid[newRow][newCol] *= 2;
                score += newGrid[newRow][newCol];
                newGrid[newRow - deltaRow][newCol - deltaCol] = 0;
                moved = true;
 
       checkWin( newGrid[newRow][newCol]);

                break;
            } else {
                break;
            }
            
            newRow += deltaRow;
            newCol += deltaCol;
        }
    }
if (!win)
{
    switch(direction) {
        case 'up':
            for (let col = 0; col < gridSize; col++) {
                for (let row = 1; row < gridSize; row++) {
                    moveInDirection(row, col, -1, 0);
                }
            }
            break;
        case 'down':
            for (let col = 0; col < gridSize; col++) {
                for (let row = gridSize - 2; row >= 0; row--) {
                    moveInDirection(row, col, 1, 0);
                }
            }
            break;
        case 'right':
            for (let row = 0; row < gridSize; row++) {
                for (let col = 1; col < gridSize; col++) {
                    moveInDirection(row, col, 0, -1);
                }
            }
            break;
        case 'left':
            for (let row = 0; row < gridSize; row++) {
                for (let col = gridSize - 2; col >= 0; col--) {
                    moveInDirection(row, col, 0, 1);
                }
            }
            break;
    }

    if (moved) {
        grid = newGrid;
        addNewTile();
        updateDisplay();
        checkGameOver();

    }}
}
//full gride
function checkGameOver() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === 0) return false;
            
            if (i < gridSize - 1 && grid[i][j] === grid[i + 1][j]) return false;
            if (j < gridSize - 1 && grid[i][j] === grid[i][j + 1]) return false;
        }
    }
    
    document.getElementById('gameOver').style.display = 'flex';
    totalScore+=score;
    allUsers.find(user => user.username === currentUser).totalScore =totalScore;
    localStorage.setItem("usersDetails", JSON.stringify(allUsers)); //save the details


    return true;
}
//when gets 2048
function checkWin(numVal) {

    if (numVal === 2048) { 
        document.getElementById('youWon').style.display = 'flex';
        win= true;
        return true;

    }
}

function goBack(){
    totalScore+=score;
    allUsers.find(user => user.username === currentUser).totalScore =totalScore;
    localStorage.setItem("usersDetails", JSON.stringify(allUsers)); //save the details
    window.location.href='games.html';
}

function newGame() {
    score = 0;
    win= false;
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('youWon').style.display = 'none';
    initGrid();
    addNewTile();
    addNewTile();
    updateDisplay();
}

document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowUp':
            event.preventDefault();
            move('up');
            break;
        case 'ArrowDown':
            event.preventDefault();
            move('down');
            break;
        case 'ArrowLeft':
            event.preventDefault();
            move('left');
            break;
        case 'ArrowRight':
            event.preventDefault();
            move('right');
            break;
    }
    checkGameOver();
});

// Initialize game
newGame();
