function checkAnswers(){
    //Track the number of correct answers
    let totalCorrect = 0.0;
    const totalQuestions = 5;
    const multiChoiceQuestions = 3;
    const textQuestions = 1;
    const multiSelectionQuestions = 1;

    //Check if multi-choice answers are correct
    for(i = 1; i < multiChoiceQuestions + 1; i++){
        let answers = document.getElementsByName("mc" + i); //Get all radio buttons for this question
        for(j = 0; j < answers.length; j++){
            answers[j].parentElement.className = "option-incorrect";    //Set styles to incorrect
        }
        let correctAnswerID = "mc"+i+"-answer"; //locate the element ID of the correct answer
        console.log("mc"+i+"-answer");
        document.getElementById(correctAnswerID).parentElement.className = "option-correct";    //set style to correct
        
        //Identify whether the correct option was selected and announce it
        let result = document.createElement("p");
        result.className = "quiz-result";
        if(document.getElementById(correctAnswerID).checked)
        {
            totalCorrect++;
            result.innerText = "Correct! (1 point)";
        }
        else
        {
            result.innerText = "Incorrect. (0 points)";
        }
        document.getElementById("mc"+i+"-container").appendChild(result);
    }
    
    //Check if text input answers are correct
    for(i = 1; i < textQuestions+1; i++){
        let result = document.createElement("p");
        result.className = "quiz-result";
        let answerField = document.getElementById("t"+i+"-answer");
        if(answerField.value === "1990")
        {
            totalCorrect++;
            result.innerText = "Correct! (1 point)";
            answerField.className = "textfield-correct";
        }
        else
        {
            result.innerText = "Incorrect, the correct answer is \"1990\". (0 points)";
            answerField.className = "textfield-incorrect";
        }
        document.getElementById("t"+i+"-container").appendChild(result);
    }
    
    //Check if multi-selection answers are correct
    let correctAnswers = 0;
    if(document.getElementById("ms1-answer1").checked)   //Q5
    {
        totalCorrect += 0.25;
        correctAnswers++;
    }
    document.getElementById("ms1-answer1").parentElement.className = "option-correct";
    if(document.getElementById("ms1-answer2").checked)
    {
        totalCorrect += 0.25;
        correctAnswers++;
    }    
    document.getElementById("ms1-answer2").parentElement.className = "option-correct";
    if(document.getElementById("ms1-answer3").checked) {
        totalCorrect += 0.25;
        correctAnswers++;
    }
    document.getElementById("ms1-answer3").parentElement.className = "option-correct";
    if(document.getElementById("ms1-answer4").checked)
    {
        totalCorrect += 0.25;
        correctAnswers++;
    }
    document.getElementById("ms1-answer4").parentElement.className = "option-correct";
    if(document.getElementById("ms1-op5").checked)   //penalize incorrectly selected answers
        totalCorrect -= 0.25;
    document.getElementById("ms1-op5").parentElement.className = "option-incorrect";
    //Announce result
    let result = document.createElement("p");
    result.className = "quiz-result";
    result.innerText = correctAnswers + " out of 4 correct selections. (" + (correctAnswers * 0.25) + " point)";
    document.getElementById("ms1-container").appendChild(result);

    //Display calculated score
    let finalScore = Math.round(totalCorrect / totalQuestions * 100);    //round to whole number
    const finalResult = document.createElement("p");
    finalResult.innerText = "You got " + totalCorrect + " out of " + totalQuestions + " correct (" + finalScore + "%). Want to try again?";
    finalResult.style.fontWeight = "bold";
    document.getElementById("resultsContainer").appendChild(finalResult);
    
    //Remove submit button and display reset button
    document.getElementById("submit").remove();
    const reset = document.createElement("button");
    reset.className = "quiz-button";
    reset.innerText = "Start Over";
    reset.addEventListener("click", resetQuiz);
    document.getElementById("resultsContainer").appendChild(reset);
}

function resetQuiz(){
    location.replace("quiz.html");
}