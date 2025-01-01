// Game state management
const gameState = {
    games: [
        { id: 1, name: 'Adventure Quest', currentScore: 0, highScore: 350, lastPlayed: null },
        { id: 2, name: 'Space Shooter', currentScore: 0, highScore: 280, lastPlayed: null },
        { id: 3, name: 'Puzzle Master', currentScore: 0, highScore: 420, lastPlayed: null },
        { id: 4, name: 'Racing Pro', currentScore: 0, highScore: 890, lastPlayed: null },
        { id: 5, name: 'Strategy Wars', currentScore: 0, highScore: 670, lastPlayed: null },
        { id: 6, name: 'Memory Match', currentScore: 0, highScore: 540, lastPlayed: null }
    ],
    scoreHistory: [],
    lastUpdate: new Date()
};

// Score calculation function
function calculateTotalScore() {
    return gameState.games.reduce((total, game) => total + game.highScore, 0);
}

// Update score display
function updateScoreDisplay() {
    const totalScore = calculateTotalScore();
    document.getElementById('score').textContent = totalScore.toLocaleString();
    
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeEvents);