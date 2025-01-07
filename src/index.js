const regform = document.getElementById("registerForm");
const connectform = document.getElementById("connectForm");

regform.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const firstname = document.getElementById("firstName").value;
    const lastname = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const username =document.getElementById("username").value;
    const passwordField= document.getElementById("password");
    const password =passwordField.value;
    const confirmPasswordField=document.getElementById("confirmPassword");
    const comfirmPassword=confirmPasswordField.value;

    if(!firstname||!lastname||!email||!username||!password||!comfirmPassword){
        alert("Oops! It looks like you missed some fields\n we need all your details:)");
        return;
    }

    if(passwordField.value !== confirmPasswordField.value){

        //do the fileds empty again
        passwordField.value = "";
        confirmPasswordField.value = "";
        passwordField.style.border = "2px solid red";
        confirmPasswordField.style.border = "2px solid red";
        alert("Password verification does not match the password you entered, please try again");

        return;
    }
   
    if(!document.getElementById("terms").checked){
        alert("Please confirm the usage details.");  
        return;  
    }
    
    const user = {   //create an object
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: password,
        games: [0,0], //tetris is 0 and 2048 in in 1
        totalScore:+0
    };
    //get all the users from the local storage
    let users = JSON.parse(localStorage.getItem("usersDetails")) || [];

    // save in LocalStorage
    users.push(user);
    
    localStorage.setItem("usersDetails", JSON.stringify(users));
    
    alert("Your details have been saved successfully!");
    resetRegForm();
    setCookie("username",username,1); //saved it for 1 day
    setCookie("password",password,1); //saved it for 1 day
    localStorage.setItem('currentUser', username);
    window.location.href="html/games.html";

});

connectform.addEventListener("submit", (event) => {
    event.preventDefault();
    const usernameField=document.getElementById("loginUsername");
    const passwordField= document.getElementById("loginPassword");
    if(!passwordField.value||!usernameField.value)
    {
        alert("Oops! It looks like you missed some fields");
        return;
    }
    if(verifyUser(usernameField.value,passwordField.value)){
        setCookie("username",usernameField.value,1); //saved it for 1 day
        setCookie("password",passwordField.value,1); //saved it for 1 day
        localStorage.setItem('currentUser', usernameField.value);
        resetConForm();
        window.location.href="html/games.html";

    }
    else{
        alert("The username or password is incorrect, please try again.")
        resetConForm();
        passwordField.style.border = "2px solid red";
        usernameField.style.border = "2px solid red";
    }

});

function autoLogin(){
    const username = getCookie("username");
    const password = getCookie("password");
    //return if there is username, and there is password, and if they matched, in the cookie
    return username && password && verifyUser(username,password);
}
function verifyUser(username,password){
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
    document.querySelector('h1').style.display='none';
    document.querySelector('.btn-container').style.display='none';
    document.getElementById('register-container').style.display = 'block';
}

function showConnect() {
    if(autoLogin())  //if there is cookie
    {
        window.location.href="html/games.html"; 
        return;
    }
    document.querySelector('h1').style.display='none';
    document.querySelector('.btn-container').style.display='none';
    document.getElementById('connect-container').style.display = 'block';
}

function goBack() {
    resetRegForm();
    resetConForm();
    document.querySelector('h1').style.display='block';
    document.querySelector('.btn-container').style.display='flex';
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


