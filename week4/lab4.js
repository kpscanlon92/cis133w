function setMessage(id, message) {
    let messageBox = document.getElementById(id);
    messageBox.innerHTML = message;
}

function getInputValue(id) {
    return document.getElementById(id).value;
}

function generateButton(sign) {
    return "<button type=\"button\" id=\"" + sign + "\">";
}

function generateImage(sign) {
    return "<img class=\"image\" src=\"Zodiac/zodiac_" + sign + "_icon.png\" alt=\"image\"><br>";
}

function generateName(sign) {
    return sign.charAt(0).toUpperCase() + sign.slice(1) + "<br>"
}

function generateDate(sign) {
    switch (sign) {
        case 'aries':
            return "Mar 21 - Apr 19\r\n";
        case 'taurus':
            return "Apr 20 - May 20\r\n";
        case 'gemini':
            return "May 21 - Jun 20\r\n";
        case 'cancer':
            return "Jun 21 - Jul 22\r\n";
        case 'leo':
            return "Jul 23 - Aug 22\r\n";
        case 'virgo':
            return "Aug 23 - Sep 22\r\n";
        case 'libra':
            return "Sep 23 - Oct 22\r\n";
        case 'scorpio':
            return "Oct 23 - Nov 21\r\n";
        case 'sagittarius':
            return "Nov 22 - Dec 21\r\n";
        case 'capricorn':
            return "Dec 22 - Jan 19\r\n";
        case 'aquarius':
            return "Jan 20 - Feb 18\r\n";
        case 'pisces':
            return "Feb 19 - Mar 20\r\n";
        default:
            return "Sign doesn't exist?!?\r\n"
    }
}

function generateHoroscope(sign) {
    switch (sign) {
        case 'aries':
            return "You'll have to give more than initially planned, considering what you'll gain.\r\n";
        case 'taurus':
            return "This person may not bring anything new to the table, but he or she still has something valuable to offer.\r\n";
        case 'gemini':
            return "Protecting what's yours could result in you reaping half the gains. You have to give to get. Be generous, and you can expect the same.\r\n";
        case 'cancer':
            return "No sooner do you settle one debt then you're faced with another, but your financial outlook improves after the 22nd.\r\n";
        case 'leo':
            return "An associate isn't trying to be deceptive; it's just that this person doesn't know how to break the news.\r\n";
        case 'virgo':
            return "Make a point of honoring all obligations -- no matter how tedious and conscientiousness now will be rewarded handsomely later.\r\n";
        case 'libra':
            return "You may be penalized for breaking an agreement, but see if you can be compensated for it\r\n";
        case 'scorpio':
            return "You resent being saddled with such a heavy burden, but take it in stride.\r\n";
        case 'sagittarius':
            return "The downside to collaboration is running everything you do by someone else, you'll learn a few things too.\r\n";
        case 'capricorn':
            return "You need time to yourself, it's the only way to differentiate what you want from what you feel is expected.\r\n";
        case 'aquarius':
            return "Quit while you're ahead, bring the discussion to a close and move on.\r\n";
        case 'pisces':
            return "Seek an older relative's advice, even if this person doesn't know exactly what you're going through.\r\n";
        default:
            return "Sign doesn't exist?!?\r\n";
    }
}

function displayHoroscope() {
    let sign = this.id;
    setMessage("horoscopeText", generateHoroscope(sign));
}

function generateContent(sign) {
    let container = "";
    container += generateButton(sign);
    container += generateImage(sign);
    container += generateName(sign);
    container += generateDate(sign);
    container += "</button>";
    return container;
}

function isCharacterCorrect(value, character, index) {
    let valueChar = value.charAt(index).toLowerCase();
    return valueChar === character;
}

function isYes(value) {
    if (value.length === 0) {
        return "";
    } else if ((value.length === 1) && isCharacterCorrect(value, "y", 0)) {
        return "";
    } else if ((value.length === 2) && isCharacterCorrect(value, "y", 0) && isCharacterCorrect(value, "e", 1)) {
        return "";
    } else if ((value.length === 3) && isCharacterCorrect(value, "y", 0) && isCharacterCorrect(value, "e", 1) && isCharacterCorrect(value, "s", 2)) {
        return "You are welcome.";
    } else {
        return "I'm sorry, yes is the only correct answer";
    }
}

function validateResult() {

    let value = getInputValue("results")
    setMessage("resultMessage",isYes(value));
}

function init() {
    const SIGNS = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"];
    let containerMessage = ""
    for (let i = 0; i < SIGNS.length; i++) {
        containerMessage += generateContent(SIGNS[i]);
    }
    setMessage("container", containerMessage);

    // Container needs to exist before event listeners
    for (let i = 0; i < SIGNS.length; i++) {
        document.getElementById(SIGNS[i]).addEventListener("click", displayHoroscope);
    }
    document.getElementById("results").addEventListener("input", validateResult)
}

window.addEventListener('load', init);