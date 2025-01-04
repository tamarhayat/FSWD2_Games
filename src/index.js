const regform = document.getElementById("registerForm");
const connectform = document.getElementById("connectForm");

regform.addEventListener("submit", (event) => {
    event.preventDefault();
    const passwordField= document.getElementById("password");
    const confirmPasswordField=document.getElementById("confirmPassword");
    if(passwordField.value !== confirmPasswordField.value){

        //do the fileds empty again
        passwordField.value = "";
        confirmPasswordField.value = "";
        passwordField.style.border = "2px solid red";
        confirmPasswordField.style.border = "2px solid red";
        alert("אימות הסיסמה אינו זהה לסיסמה שהזנת, נסה שוב");

        return;
    }
    if(!document.getElementById("terms").checked){
        alert("אשר בבקשה את פרטי השימוש ");  
        return;  
    }
    
    //get the inputs
    const firstname = document.getElementById("firstName").value;
    const lastname = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const username =document.getElementById("username").value;
    const password =passwordField.value;
    
    const user = {   //create an object
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: password
    };
    //get all the users from the local storage
    let users = JSON.parse(localStorage.getItem("usersDetails")) || [];

    // save in LocalStorage
    users.push(user);
    
    localStorage.setItem("usersDetails", JSON.stringify(users));
    
    alert("הפרטים נשמרו בהצלחה!");
    resetRegForm();
    localStorage.setItem('currentUser', username);
    window.location.href="html/games.html";

});

connectform.addEventListener("submit", (event) => {
    event.preventDefault();
    const usernameField=document.getElementById("loginUsername");
    const passwordField= document.getElementById("loginPassword");
    if(verifyUser(usernameField.value,passwordField.value)){
        localStorage.setItem('currentUser', usernameField.value);
        resetConForm();
        window.location.href="html/games.html";

    }
    else{
        alert(" שם משתמש או הסיסמה אינם נכונים, נסה שוב")
        resetConForm();
        passwordField.style.border = "2px solid red";
        usernameField.style.border = "2px solid red";
    }

});


function verifyUser(username,password){
    console.log(username);
    console.log(password);
    let users = JSON.parse(localStorage.getItem("usersDetails")) || null
    if(!users){
        return false;
    }
    for(let user of users){
        if(user.username===username&&user.password===password)
            return true;
    }
    return false;
}

function showRegister() {
    document.querySelector('.main-container h1').style.display='none';
    document.querySelector('.btn-container').style.display='none';
    document.getElementById('register-container').style.display = 'block';
}

function showConnect() {
    document.querySelector('.main-container h1').style.display='none';
    document.querySelector('.btn-container').style.display='none';
    document.getElementById('connect-container').style.display = 'block';
}

function goBack() {
    document.querySelector('.main-container h1').style.display='block';
    document.querySelector('.btn-container').style.display='block';
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('connect-container').style.display = 'none';
}
function resetRegForm() {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmPassword").value = "";
    document.getElementById("terms").checked = false;
}
function resetConForm(){
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";
}