const grid = document.getElementById('grid');
const scoreDisplay=document.getElementById('score');
document.getElementById('end-message').style.display='none';

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
let Interval;

function startGame(interval=Interval) {
    document.getElementById('start-message').style.display='none';
    Interval=interval;
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
    deleteFullRows();
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
    else if(key === 'ArrowUp'){
        for(let index of shape)
            if((index+1) % columnSize === 0 || (index) % columnSize === 0 || 
                cells[index+1].className==='shapeBoard' || cells[index].className==='shapeBoard')
                return false;
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

function deleteFullRows(){
    for(let i=0;i<cells.length;i+=columnSize){
        let flag=true;  
        for(let j=i;j<columnSize+i;j++){
            if(!cells[j].classList.contains('shapeBoard'))
                {
                    flag=false;
                    break;
                }
        }
        if(flag){
            delRow(i);
        }
    }
}
function delRow(startIndex) {
    //dell the full row
    for (let j = startIndex; j < startIndex + columnSize; j++) {
        cells[j].classList.remove('shapeBoard');
    }

    //copy all the above rows, to one row down
    for (let i = startIndex - columnSize; i >= 0; i -= columnSize) {
        for (let j = 0; j < columnSize; j++) {
            const currentIndex = i + j;
            const belowIndex = currentIndex + columnSize;
            if (cells[currentIndex].classList.contains('shapeBoard')) {
                cells[belowIndex].classList.add('shapeBoard');
                cells[currentIndex].classList.remove('shapeBoard');
            } else {
                cells[belowIndex].classList.remove('shapeBoard');
            }
        }
    }
    // del the first row
    for (let j = 0; j < columnSize; j++) {
        cells[j].classList.remove('shapeBoard');
    }
    showPopup("+5");
    score+=5;
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

/*function getRandomColorRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256); 
    const b = Math.floor(Math.random() * 256); 
    return `rgb(${r}, ${g}, ${b})`;
}*/

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
function showPopup(message) {
    const popup = document.getElementById("popup-text");
    popup.textContent = message; 
    popup.style.display = "block"; 

    setTimeout(() => {
        popup.style.display = "none";
    }, 1000);
}
