
let allUsers = JSON.parse(localStorage.getItem("usersDetails")) || [];
const currentUser = getCookie("username");

function showRankingModal() {
  
    const modal = document.getElementById('scoreRankingModal');

    if (!modal) {
       
        return;
    }
    modal.style.display = 'block';
    displayTopThree();
}

function closeRankingModal() {
    
    const modal = document.getElementById('scoreRankingModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function displayTopThree() {

    let topThree = getTopThreeUsers(allUsers);
  
    for (let i = 0; i < topThree.length; i++) {
        const rankElement = document.getElementById(`rank${i+1}`);
        const scoreElement = document.getElementById(`score${i+1}`);
        
        if (rankElement && scoreElement) {
            rankElement.textContent = topThree[i].username || 'Unknown';
            scoreElement.textContent = topThree[i].totalScore || 0;
        }
    }
}

function getTopThreeUsers(users) {
    if (!Array.isArray(users) || users.length === 0) {
       
        return [];
    }
    
    return [...users]
        .sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0))
        .slice(0, 3);
}

// Add click outside to close functionality
window.onclick = function(event) {
    const modal = document.getElementById('scoreRankingModal');
    if (event.target === modal) {
        closeRankingModal();
    }
}

