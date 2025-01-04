const grid = document.getElementById('grid');
const scoreDisplay=document.getElementById('score');
const columnSize = 13;
const rowSize = 17;
let score=0;

class Shape{
    constructor(x, y,col, row) {
        this.x = x; 
        this.y = y; 
        this.col=col;
        this.row=row;
    }
    getCurrentShape(){
        const shape= shapes[this.x][this.y];
        return shape.map(index=> index+this.col+(this.row)*columnSize);
    }
}


// Create grid cells
for (let i = 0; i < columnSize * rowSize; i++) {
    const cell = document.createElement('div');
    grid.appendChild(cell);
}


let cells = Array.from(document.querySelectorAll('#grid div'));

const shapes = [
    [
        [0, columnSize, 2 * columnSize, 2 * columnSize + 1], // L shape original
        [columnSize, columnSize + 1, columnSize + 2, 2],// L shape rotated 90 degrees
        [0, 1, columnSize + 1, 2 * columnSize + 1], // L shape rotated 180 degrees
        [0, 1, 2, columnSize] // L shape rotated 270 degrees
    ],
    [
        [0, 1, columnSize, columnSize + 1], // Square shape (doesn't change when rotated)
        [0, 1, columnSize, columnSize + 1],
        [0, 1, columnSize, columnSize + 1],
        [0, 1, columnSize, columnSize + 1]
    ],
    [
        [0, columnSize, columnSize + 1, 2 * columnSize + 1], // Z shape original
        [2, 1, columnSize + 1, columnSize], // Z shape rotated 90 degrees
        [0, columnSize, columnSize + 1, 2 * columnSize + 1], // Z shape rotated 180 degrees (same as original)
        [2, 1, columnSize + 1, columnSize] // Z shape rotated 270 degrees (same as 90 degrees)
    ],
    [
        [0, 1, 2, 3], // Line shape original
        [0, columnSize, 2 * columnSize, 3 * columnSize], // Line shape rotated 90 degrees
        [0, 1, 2, 3], // Line shape rotated 180 degrees (same as original)
        [0, columnSize, 2 * columnSize, 3 * columnSize] // Line shape rotated 270 degrees (same as 90 degrees)
    ],
    [
        [0, columnSize, 2 * columnSize, columnSize + 1], // T shape original
        [0, 1, 2, columnSize + 1], // T shape rotated 90 degrees
        [2, columnSize +2, columnSize + 1, 2 * columnSize+2], // T shape rotated 180 degrees
        [1, columnSize, columnSize + 1, columnSize + 2] // T shape rotated 270 degrees
    ]
];

let currentShape;
let currentInterval;
const Interval = 800;

function startGame() {
    clearBoard();
    document.addEventListener('keydown',handleKeyDownEvent);
    document.getElementById('end-message').style.display='none';
    currentShape = getNewShape();
    draw();
    startInterval();
}

function startInterval() {
    currentInterval = setInterval(() => {
        if (!isValidDraw('ArrowDown')) {
            addShapeToBoard();
            return;
        }
        getDown();
        //check before and after the getting down
        if (!isValidDraw('ArrowDown')) {
            addShapeToBoard();
            return;
        }
    }, Interval);
}


function addShapeToBoard() {
    clearInterval(currentInterval);
    let shape=currentShape.getCurrentShape();
    shape.forEach(index => {
        cells[index].classList.remove('shape');
    });
    shape.forEach(index => {
        cells[index].classList.add('shapeBoard');
    });
    if(!isEnd()){
        score++;
        scoreDisplay.textContent=score;
        currentShape = getNewShape();
        draw();
        startInterval();
    }
    else{
        endGame();
    }
}


function getNewShape() {
    const randomShape = Math.floor(Math.random() * shapes.length);
    const randomPos = Math.floor(Math.random() * 4);
    return new Shape(randomShape,randomPos,Math.floor(columnSize/2),0);
}


function getDown() {
    undraw();
    currentShape.row++; 
    draw();
}

function draw() {
    currentShape.getCurrentShape().forEach(index => {
        cells[index].classList.add('shape');
    });
}

function undraw() {
    currentShape.getCurrentShape().forEach(index => {
        cells[index].classList.remove('shape');
    });
}

function turnShape(){
   currentShape.y=(currentShape.y+1)%4;
}

function isValidDraw(key) {
    let shape=currentShape.getCurrentShape();
    if (key === 'ArrowLeft') {
        for(let index of shape)
            if((index+1) % columnSize === 0 || cells[index+1].className==='shapeBoard')
                return false;
    } else if (key === 'ArrowRight') {
        for(let index of shape)
            if(index % columnSize === 0 || cells[index-1].className==='shapeBoard')
                return false;
    } else if (key === 'ArrowDown') {
        for(let index of shape){
            if(Math.floor(index/columnSize) === rowSize - 1 || cells[index+columnSize].className==='shapeBoard')
                return false;
            }
        }
    return true;
}

function clearBoard() {
    cells.forEach(cell => {
        if (cell.classList.contains('shapeBoard')) {
            cell.classList.remove('shapeBoard');
        }
    });
}

    
function handleKeyDownEvent(event){
    const key = event.key;
    if (key === 'ArrowLeft' && isValidDraw(key)) {
        undraw();
        currentShape.col++;  //take the shape left
        draw();
    } else if (key === 'ArrowRight' && isValidDraw(key)) {
        undraw();
        currentShape.col--; //take the shape right
        draw();
    } else if (key === 'ArrowDown' && isValidDraw(key)) {
        getDown();
    }
    else if(key==='ArrowUp'){
        undraw();
        turnShape();
        draw();
    }
}

isEnd= () => {
    for(let i=0;i<columnSize;i++)
        if(cells[i].className==='shapeBoard')
            return true;
    return false;
}

endGame =()=>{
    document.removeEventListener('keydown',handleKeyDownEvent);
    document.getElementById('end-message').style.display='block';
    const scoreElement = document.querySelector("#currentScore"); 
    scoreElement.textContent = score;
}
// Start the game
startGame();