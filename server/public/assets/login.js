function ShowRegister() {
    var forminput = document.getElementsByClassName("login-form")[0];
    forminput.style.display = "none";
    var formregister = document.getElementsByClassName("register-form")[0];
    formregister.style.display = "block";
}

function ShowLogin() {
    var formregister = document.getElementsByClassName("register-form")[0];
    formregister.style.display = "none";
    var forminput = document.getElementsByClassName("login-form")[0];
    forminput.style.display = "block";
}

