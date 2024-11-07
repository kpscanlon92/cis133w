console.log("PCC Housing Insecurity Survey.");

function Question(title, text) {
    this.title = title;
    this.text = text;
    this.number = 0;
    this.toHTML = function () {
        let result = "";

        result += "<h3>" + this.number + ". " + this.title + "</h3>\n";
        result += "<p>" + this.text + "</p>\n";

        return result;
    };
    this.getAnswers = function () {
        return {};
    };
}

function MultipleChoiceQuestion(title, text, options) {
    Question.call(this, title, text);

    let superToHTML = this.toHTML;

    this.toHTML = function () {
        let result = superToHTML.call(this);

        result += '<ol id="' + title + '" type="a">\n';
        for (let counter = 0; counter < options.length; counter++) {
            result += '<li><input type="radio" name="' + title + '" value="' + options[counter] + '">' + options[counter] + '</li>\n';
        }
        result += "</ol>\n";
        return result;
    };
    this.getAnswers = function() {
        let answers = {};
        let inputs = document.getElementById(title).getElementsByTagName("input");
        for (let counter = 0; counter < inputs.length; counter++) {
            answers[inputs[counter].value] = inputs[counter].checked;
        }
        return answers;
    };
}

function MultipleChoiceQuestionOther(title, text, options) {
    MultipleChoiceQuestion.call(this, title, text, options);

    let superToHTML = this.toHTML;
    let superGetAnswers = this.getAnswers;

    this.toHTML = function () {
        let result = superToHTML.call(this);

        result += '<p>Other: <input id="' + title + '_other"  type="text" name="Other"></p>\n';
        return result;
    };
    this.getAnswers = function() {
        let answers = superGetAnswers.call(this);
        let input = document.getElementById(title + "_other");
        answers["Other"] = input.value;
        return answers;
    };
}

function MultipleSelectQuestion(title, text, options) {
    Question.call(this, title, text);

    let superToHTML = this.toHTML;

    this.toHTML = function () {
        let result = superToHTML.call(this);

        result += '<ol id="' + title + '" type="a">\n';
        for (let counter = 0; counter < options.length; counter++) {
            result += '<li><input type="checkbox" name="' + title + '" value="' + options[counter] + '">' + options[counter] + '</li>\n';
        }
        result += "</ol>\n";
        return result;
    };
    this.getAnswers = function() {
        let answers = {};
        let inputs = document.getElementById(title).getElementsByTagName("input");
        for (let counter = 0; counter < inputs.length; counter++) {
            answers[inputs[counter].value] = inputs[counter].checked;
        }
        return answers;
    };
}

function MultipleSelectQuestionOther(title, text, options) {
    MultipleSelectQuestion.call(this, title, text, options);

    let superToHTML = this.toHTML;
    let superGetAnswers = this.getAnswers;

    this.toHTML = function () {
        let result = superToHTML.call(this);

        result += '<p>Other: <input id="' + title + '_other" type="text" name="Other"></p>\n';
        return result;
    };
    this.getAnswers = function() {
        let answers = superGetAnswers.call(this);
        let input = document.getElementById(title + "_other");
        answers["Other"] = input.value;
        return answers;
    };
}

function ShortAnswerQuestion(title, text) {
    Question.call(this, title, text);

    let superToHTML = this.toHTML;

    this.toHTML = function () {
        let result = superToHTML.call(this);

        result += '<p>Please type your answer here: <input id="' + title + '" type="text" name="' + title + '"></p>\n';
        return result;
    };
    this.getAnswers = function() {
        let answers = {};
        let input = document.getElementById(title);

        answers[title] = input.value;
        return answers;
    };
}

function QuestionSection(title, questions) {
    this.title = title;
    this.questions = questions;
    this.number = 0;
    this.toHTML = function () {
        let result = "<h2>Section " + this.number + ": " + title + "</h2>\n";

        for (let counter = 0; counter < questions.length; counter++) {
            result += questions[counter].toHTML();
        }
        return result;
    };
    this.getAnswers = function() {
        let answers = {};

        for (let counter = 0; counter < questions.length; counter++) {
            answers[questions[counter].title] = questions[counter].getAnswers();
        }
        return answers;
    };
}

function Survey(title, sections) {
    this.title = title;
    this.sections = sections;
    this.toHTML = function () {
        let result = "<h1>" + title + "</h1>\n";

        for (let counter = 0; counter < sections.length; counter++) {
            result += sections[counter].toHTML();
        }
        result += '<input id="submit" type="button" value="SUBMIT">\n';
        return result;
    };
    this.getAnswers = function() {
        let answers = {};

        for (let counter = 0; counter < sections.length; counter++) {
            answers[sections[counter].title] = sections[counter].getAnswers();
        }
        return answers;
    };
}



window.addEventListener("load", function() {
    let survey = createSurveyQuestions();

    function submit() {
        let answers = survey.getAnswers();
        let form = document.createElement('form');
        form.method = 'POST';
        form.action = 'submit_survey.php';
        form.innerHTML = '<input type="hidden" name="answers" value="' + encodeURIComponent(JSON.stringify(answers)) + '">';
        document.getElementsByTagName('body')[0].appendChild(form);
        form.submit();
    }

    document.getElementById("questions").innerHTML = survey.toHTML();
    document.getElementById("submit").addEventListener("click", submit);
});



