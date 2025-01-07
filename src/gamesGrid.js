let allUsers=JSON.parse(localStorage.getItem("usersDetails"));
//const currentUser= localStorage.getItem("currentUser");
const currentUser=getCookie("username"); //use cookie
let highScore2048 = allUsers.find(user => user.username === currentUser)?.games[1];
let highScoreTetris = allUsers.find(user => user.username === currentUser)?.games[0];
let firstName = allUsers.find(user => user.username === currentUser)?.firstname;
let totalScore = allUsers.find(user => user.username === currentUser)?.totalScore;


//get the details of the current user
document.getElementById("tetris-best").textContent=highScoreTetris;
document.getElementById("2048-best").textContent=highScore2048;
document.getElementById("firstName").textContent=firstName;
document.getElementById("score").textContent=totalScore;

// Game state management
const gameState = {
    games: [
        { id: 1, name: 'Adventure Quest', highScore: 0, lastPlayed: null },
        { id: 2, name: '2048', highScore: 0, lastPlayed: null },
        { id: 3, name: 'Space Shooter',  highScore: 0, lastPlayed: null },
        { id: 4, name: 'Racing',  highScore: 0, lastPlayed: null },
        { id: 5, name: 'Strategy Wars',  highScore: 0, lastPlayed: null },
        { id: 6, name: 'Memory Match',  highScore: 0, lastPlayed: null } 
    ],
    scoreHistory: [],
    lastUpdate: new Date()
};

        
window.addEventListener('scroll', () => {
    const scrollText = document.querySelector('.scroll-text');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        scrollText.classList.add('visible');
    } else {
        scrollText.classList.remove('visible');
    }
});

// Score calculation function
/*function calculateTotalScore() {
    return gameState.games.reduce((total, game) => total + game.highScore, 0);
}*/

// Update score display
function updateScoreDisplay() {
    //const totalScore = calculateTotalScore();

    //dom
    document.getElementById('score').textContent = totalScore;
    
    // Add to score history
    const scoreEntry = {
        score: totalScore,
        timestamp: new Date()
    };
    gameState.scoreHistory.unshift(scoreEntry);
    
    // Keep only last 5 entries
    if (gameState.scoreHistory.length > 5) {
        gameState.scoreHistory.pop();
    }
    
    updateScoreHistory();
}

// Format date for display
function formatDateTime(date) {
    return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(date);
}

// Update score history display
function updateScoreHistory() {
    const historyContainer = document.getElementById('scoreEntries');
    historyContainer.innerHTML = '';
    
    gameState.scoreHistory.forEach(entry => {
        const scoreDiv = document.createElement('div');
        scoreDiv.className = 'score-entry';
        scoreDiv.innerHTML = `
            <div>Score: ${entry.score.toLocaleString()}</div>
            <div class="timestamp">${formatDateTime(entry.timestamp)}</div>
        `;
        historyContainer.appendChild(scoreDiv);
    });
}

// Toggle score history display
function CountScore() {
    const history = document.getElementById('scoreHistory');
    history.style.display = history.style.display === 'none' ? 'block' : 'none';
}

function logout(){
    deleteCookie("username");
    deleteCookie("password");
    window.location.href='../index.html'

}

// Initialize events
function initializeEvents() {
    // Initialize game state
    window.addEventListener('load', () => {
        updateScoreDisplay();
        // Simulate periodic score updates
        setInterval(simulateGamePlay, 5000);
    });

    // Scroll event for "BROWSE GAMES" text
    window.addEventListener('scroll', () => {
        const scrollText = document.querySelector('.scroll-text');
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            scrollText.classList.add('visible');
        } else {
            scrollText.classList.remove('visible');
        }
    });

    // Keyboard controls for testing
    document.addEventListener('keypress', (e) => {
        if (e.key === 's') {
            simulateGamePlay();
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    //document.querySelector('.game-grid .game-item:nth-child(2) p').textContent = `High Score: ${highScore}`;
});
// Initialize everything when DOM is loaded
//document.addEventListener('DOMContentLoaded', initializeEvents);