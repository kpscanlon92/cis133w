const REQUIRED_PASSWORD_CHARACTERS = "!@~#$%^&*+=";

function isLower(character) {
    return character >= "a" && character <= "z";
}

function isUpper(character) {
    return character >= "A" && character <= "Z";
}

function isDigit(character) {
    return character >= "0" && character <= "9";
}

function isValidUsernameCharacter(character) {
    return isLower(character) || isUpper(character) || isDigit(character);
}

function isSpecial(character) {
    return REQUIRED_PASSWORD_CHARACTERS.indexOf(character) >= 0;
}

function setMessage(id, message) {
    let messageBox = document.getElementById(id);
    messageBox.innerHTML = message;
}

function getInputValue(id) {
    return document.getElementById(id).value;
}

function checkUserNameRequirements(value) {
    for (let counter = 0; counter < value.length; counter++) {
        let character = value.charAt(counter);

        if (!isValidUsernameCharacter(character)) {
            setMessage("userNameMessage", "Character '" + character + "' is invalid in the username.");
        }
    }
}

function validateUserName() {
    let value = getInputValue("userName");

    clearMessage("userNameMessage")
    checkUserNameRequirements(value);

}

function clearMessage(id) {
    setMessage(id, "");
}

function validateLength(value) {
    if (value === "") {
        setMessage("passwordMessage", "Password must be at least 8 characters, with at least 1 upper-case, and 1 character from '" + REQUIRED_PASSWORD_CHARACTERS + "'.");
    }

    if (value.length < 8) {
        setMessage("passwordMessage", "Password must be at least 8 characters.");
    }
}

function checkPasswordRequirements(value) {
    let hasUpper = false;
    let hasDigit = false;
    let hasRequired = false;
    for (let counter = 0; counter < value.length; counter++) {
        let character = value.charAt(counter);

        if (isUpper(character)) {
            hasUpper = true;
        } else if (isDigit(character)) {
            hasDigit = true;
        } else if (isSpecial(character)) {
            hasRequired = true;
        }
    }

    if (!hasUpper) {
        setMessage("passwordMessage", "Password must have at least one upper-case letter.");
    } else if (!hasDigit) {
        setMessage("passwordMessage", "Password must have at least one number");
    } else if (!hasRequired) {
        setMessage("passwordMessage", "Password must have 1 character from '" + REQUIRED_PASSWORD_CHARACTERS + "'.");
    }
}

function validatePassword() {
    let value = getInputValue("password");

    clearMessage("passwordMessage");
    validateLength(value);
    checkPasswordRequirements(value);

}

window.addEventListener('load', function (){
    document.getElementById("userName").addEventListener("input", validateUserName);
    document.getElementById("password").addEventListener("input", validatePassword);
});

let x = function () {
    console.log("Hello");
}