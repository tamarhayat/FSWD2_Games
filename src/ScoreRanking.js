// // Get user data
// let allUsers = JSON.parse(localStorage.getItem("usersDetails")) || [];
// const currentUser = getCookie("username");

// // Core ranking functions
// function getTopThreeUsers(users) {
//     if (!Array.isArray(users) || users.length === 0) {
//         console.error('No users found or invalid users data');
//         return [];
//     }
    
//     return [...users]
//         .sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0))
//         .slice(0, 3);
// }

// // Modal control functions
// function showRankingModal() {
//     const modal = document.getElementById('scoreRankingModal');
//     if (!modal) {
//         console.error('Modal element not found');
//         return;
//     }
//     modal.style.display = 'block';
//     displayTopThree();
// }

// function closeRankingModal() {
//     const modal = document.getElementById('scoreRankingModal');
//     if (modal) {
//         modal.style.display = 'none';
//     }
// }

// // Display function
// function displayTopThree() {
//     let topThree = getTopThreeUsers(allUsers);
    
//     for (let i = 0; i < topThree.length; i++) {
//         const rankElement = document.getElementById(`rank${i+1}`);
//         const scoreElement = document.getElementById(`score${i+1}`);
        
//         if (rankElement && scoreElement) {
//             rankElement.textContent = topThree[i].username || 'Unknown';
//             scoreElement.textContent = topThree[i].totalScore || 0;
//         }
//     }
// }


// window.onclick = function(event) {
//     const modal = document.getElementById('scoreRankingModal');
//     if (event.target === modal) {
//         closeRankingModal();
//     }
// }


let allUsers = JSON.parse(localStorage.getItem("usersDetails")) || [];
const currentUser = getCookie("username");

function showRankingModal() {
    console.log('Show modal clicked'); // Debug log
    const modal = document.getElementById('scoreRankingModal');
    console.log('Modal element:', modal); // Debug log
    if (!modal) {
        console.error('Modal element not found');
        return;
    }
    modal.style.display = 'block';
    displayTopThree();
}

function closeRankingModal() {
    console.log('Close modal clicked'); // Debug log
    const modal = document.getElementById('scoreRankingModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function displayTopThree() {
    console.log('Displaying top three'); // Debug log
    console.log('All users:', allUsers); // Debug log
    let topThree = getTopThreeUsers(allUsers);
    console.log('Top three:', topThree); // Debug log
    
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
        console.error('No users found or invalid users data');
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

// Debug log on load
console.log('ScoreRanking.js loaded');
console.log('Initial allUsers:', allUsers);