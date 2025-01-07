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


