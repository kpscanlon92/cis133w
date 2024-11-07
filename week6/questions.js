console.log("PCC Housing Insecurity Survey Questions");

function createSurveyQuestions() {
    let q1 = new MultipleSelectQuestionOther(
        "Status",
        "What is your your status at PCC? ( select  more than one if applicable)",
        [
            "Full time student",
            "Part time student",
            "GED student",
            "High School dual enrollment",
            "International Student",
            "Work Study",
            "Full time Faculty",
            "Part time Faculty",
            "Full time staff",
            "Part time staff",
            "Management"
        ]
    );
    let q2 = new MultipleSelectQuestion(
        "Campus",
        "What location do you primarily spend your time when at PCC? (IF equally split between campuses - check both)",
        [
            "Cascade Campus",
            "Rock Creek Campus",
            "Southeast Campus",
            "Sylvania Campus",
            "Online courses only",
            "Other PCC Center/location"
        ]
    );

    let q3 = new ShortAnswerQuestion("Zipcode", "What is your zip code?");

    let q11 = new MultipleChoiceQuestionOther(
        "Current Housing Type",
        "What type of housing do you currently live in?",
        [
            "House",
            "Condominium /Townhouse",
            "Apartment",
            "Duplex",
            "Mobile Home",
            "Homeless (if yes skip to #16)"
        ]
    );

    let q12 = new MultipleChoiceQuestion(
        "Housing Ownership",
        "Is your living space rented or owned?",
        [
            "Rent",
            "Own"
        ]
    );

    let allQuestions = [q1, q2, q3, q11, q12];

    for (let counter = 0; counter < allQuestions.length; counter++) {
        allQuestions[counter].number = counter + 1;
    }

    let s1 = new QuestionSection("Demographics", [q1, q2, q3]);
    let s2 = new QuestionSection("Housing Information", [q11, q12]);

    let allSections = [s1, s2];

    for (let counter = 0; counter < allSections.length; counter++) {
        allSections[counter].number = counter + 1;
    }

    return new Survey("PCC Housing Insecurity Survey", [s1, s2]);
}