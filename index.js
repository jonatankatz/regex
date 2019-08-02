

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

const isError = { userName: true, password: true, passwordMatch: true }
const form = document.getElementById("formValidation");
const DOM = {
    userName: form["userName"],
    userNameMessage: form.querySelector("#userNameMessage"),
    password: form.querySelector("input[name=password]"),
    passwordMatch: form.querySelector("input[name=passwordMatch]"),
    passwordMessage: form.querySelector("#passwordMessage"),
    passwordMatchMessage: form.querySelector("#passwordMatchMessage"),
    sendButton: form.querySelector("#send")
}

DOM.userName.addEventListener("input", function (event) {
    isError.userName = true;
    resetErrors(userNameMessage);
    const { value } = event.currentTarget;
    if (!value) return raiseMessage(DOM.userNameMessage, "Input Is Required", true);
    const emailValidationResult = validateEmail(value);
    if (!emailValidationResult)
        return raiseMessage(DOM.userNameMessage, "Its not an email", true);

    isError.userName = false;
    buttonEnable()
    return raiseMessage(DOM.userNameMessage, "✔️");
});

DOM.password.addEventListener("input", function (event) {
    isError.password = true;
    resetErrors(DOM.passwordMessage)
    const { value } = event.currentTarget
    if (!value) return raiseMessage(DOM.passwordMessage, "Input Is Required",true)
    const PasswordValidationResult = validatePassword(value)
    if (!PasswordValidationResult) return raiseMessage(DOM.passwordMessage, "Weak",true)
    isError.password = false;

    return raiseMessage(DOM.passwordMessage, "strong")
})
DOM.password.addEventListener("input" ,function (event){
    isError.passwordMatchMessage = true;
    resetErrors(DOM.passwordMatchMessage)
    let passwordMatch = document.querySelector("input[name=passwordMatch]").value
    const { value } = event.currentTarget
  
    if(passwordMatch != value) return raiseMessage(DOM.passwordMatchMessage, "Password do Not Match",true)
    isError.passwordMatch = false;
    return raiseMessage(DOM.passwordMatchMessage, "Password Match")
})

DOM.passwordMatch.addEventListener("input", function (event) {
    isError.passwordMatchMessage = true;
    resetErrors(DOM.passwordMatchMessage)
    const { value } = event.currentTarget
    
    if (!value) return raiseMessage(DOM.passwordMatchMessage, "Input Is Required",true)
    const PasswordMatchValidationResult = validatePasswordMatch(value)
    if (!PasswordMatchValidationResult) return raiseMessage(DOM.passwordMatchMessage, "Password do Not Match",true)
    isError.passwordMatch = false;
    return raiseMessage(DOM.passwordMatchMessage, "Password Match")
 
})

function validatePassword(input) {
    console.log(input)
    return passwordRegex.test(input)
}

function validatePasswordMatch(input) {
    let passwordInput = document.querySelector("input[name=password]")
    let password = passwordInput.value
    console.log(password,input)
    if(password === input)return true
    } 
    
    function resetErrors(message) {
    
        message.innerHTML = "";
    
    }
    function validateEmail(input) {
        return emailRegex.test(input.toLowerCase());
    }
        
    function raiseMessage(element, message, isError) {
        if (isError) {
            buttonEnable()
            element.style.color = "red"
        } else {
            buttonEnable()
            element.style.color = "green"
        }
        element.innerHTML = message;
        if(message === "✔️"){
            element.parentElement.style = "display: inline-block;"
        }
    
    }
    

function buttonEnable() {
    let button = DOM.sendButton
    console.log(button)
    if (!isError.userName && !isError.password && !isError.passwordMatch){
        if (button.disabled = "disabled")
       button.disabled = ""
    } 
    else{button.disabled = "disabled"}
}

DOM.sendButton.addEventListener("click", function () {

    if (isError.userName || isError.password || isError.passwordMatch) return;
    console.log("data sent to server....")
})
