let allUsers=JSON.parse(localStorage.getItem("usersDetails"));
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


function logout(){
    deleteCookie("username");
    deleteCookie("password");
    window.location.href='../index.html'

}


window.addEventListener('scroll', () => {
    const scrollText = document.querySelector('.scroll-text');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 80) {
        scrollText.classList.add('visible');
    } else {
        scrollText.classList.remove('visible');
    }
});




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

 