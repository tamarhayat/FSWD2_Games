const grid = document.getElementById('grid');
const columnSize = 13;
const rowSize = 17;

// Create grid cells
for (let i = 0; i < columnSize * rowSize; i++) {
    const cell = document.createElement('div');
    grid.appendChild(cell);
}

let cells = Array.from(document.querySelectorAll('#grid div'));

const shapes = [
    [0, columnSize, 2*columnSize, 2*columnSize+1], // L shape
    [0, 1, columnSize, columnSize+1], // square shape
    [0, columnSize, columnSize+1, 2*columnSize+1], // Z shape
    [0, 1, 2, 3], // line shape
    [0, columnSize, 2*columnSize, columnSize+1] // T shape
];

let StartPosition = 6;
let currentShape;
let currentInterval;
const Interval = 800;

function startGame() {
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
    }, Interval);
}


function addShapeToBoard() {
    clearInterval(currentInterval);
    currentShape.forEach(index => {
        cells[index].classList.remove('shape');
    });
    currentShape.forEach(index => {
        cells[index].classList.add('shapeBoard');
    });
    if(!isEnd()){
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
    return shapes[randomShape].map(index => index + StartPosition);
}


function getDown() {
    undraw();
    currentShape = currentShape.map(index => index + columnSize);
    draw();
}

function draw() {
    currentShape.forEach(index => {
        cells[index].classList.add('shape');
    });
}

function undraw() {
    currentShape.forEach(index => {
        cells[index].classList.remove('shape');
    });
}

function isValidDraw(key) {
    if (key === 'ArrowLeft') {
        for(let index of currentShape)
            if((index+1) % columnSize === 0 || cells[index+1].className==='shapeBoard')
                return false;
    } else if (key === 'ArrowRight') {
        for(let index of currentShape)
            if(index % columnSize === 0 || cells[index-1].className==='shapeBoard')
                return false;
    } else if (key === 'ArrowDown') {
        for(let index of currentShape){
            if(Math.floor(index/columnSize) === rowSize - 1 || cells[index+columnSize].className==='shapeBoard')
                return false;
            }
        }
    return true;
}

document.addEventListener('keydown',handleKeyDownEvent);
    
function handleKeyDownEvent(event){
    const key = event.key;
    if (key === 'ArrowLeft' && isValidDraw(key)) {
        undraw();
        currentShape = currentShape.map(index => index + 1); //take the shape left
        draw();
    } else if (key === 'ArrowRight' && isValidDraw(key)) {
        undraw();
        currentShape = currentShape.map(index => index - 1); //take the shape right
        draw();
    } else if (key === 'ArrowDown' && isValidDraw(key)) {
        getDown();
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
    alert("איזה לוזר")

}
// Start the game
startGame();