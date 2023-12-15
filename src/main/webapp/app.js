// Simulated quiz data in JSON format
const quizData = [
    { question: "In Java, what is the purpose of the 'super' keyword?", options: ["To refer to the superclass object", "To call the superclass constructor", "To invoke a static method", "To define a constant variable"], correctAnswer: "To refer to the superclass object" },
    { question: "Which SQL statement is used to update data in a database?", options: ["UPDATE", "MODIFY", "ALTER", "CHANGE"], correctAnswer: "UPDATE" },
    { question: "What is the default value of a local variable in Java?", options: ["0", "null", "undefined", "Depends on the data type"], correctAnswer: "undefined" },
    { question: "In SQL, what is the purpose of the HAVING clause?", options: ["To filter rows before grouping", "To filter rows after grouping", "To order the result set", "To perform joins between tables"], correctAnswer: "To filter rows after grouping" },
    { question: "Which Java collection interface extends the Collection interface?", options: ["List", "Set", "Map", "Queue"], correctAnswer: "Map" },
    { question: "In SQL, which JOIN clause is used to combine rows from two or more tables based on a related column between them?", options: ["INNER JOIN", "OUTER JOIN", "FULL JOIN", "CROSS JOIN"], correctAnswer: "INNER JOIN" },
    { question: "What will be the result of the following Java code?\n\nint x = 5;\nSystem.out.println(x++);", options: ["5", "6", "7", "Compilation Error"], correctAnswer: "5" },
    { question: "Which SQL statement is used to delete all records from a table without removing the table itself?", options: ["DELETE ALL", "DELETE", "REMOVE", "DROP ALL"], correctAnswer: "DELETE" },
    { question: "In Java, what is the purpose of the 'final' keyword when applied to a variable?", options: ["To indicate that the variable can be modified", "To make the variable constant and unchangeable", "To specify the data type of the variable", "To declare a variable as a class variable"], correctAnswer: "To make the variable constant and unchangeable" },
    { question: "Which SQL function is used to find the total number of rows in a table?", options: ["ROWS()", "COUNT()", "TOTAL()", "SUM()"], correctAnswer: "COUNT()" },
    // Add more questions as needed
];

let userAnswers = [];

function startQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";

    // Render quiz questions
    quizData.forEach((question, index) => {
        quizContainer.innerHTML += `
            <div>
                <p>${index + 1}. ${question.question}</p>
                ${renderOptions(question.options, index)}
            </div>
        `;
    });

    // Show the review section after completing the quiz
    document.getElementById("review-section").style.display = "block";
}

function renderOptions(options, questionIndex) {
    return options.map((option, index) => `
        <input type="radio" name="q${questionIndex}" value="${option}" onchange="saveAnswer(${questionIndex}, '${option}')">
        <label>${option}</label><br>
    `).join('');
}

function saveAnswer(questionIndex, answer) {
    userAnswers[questionIndex] = answer;
}

function reviewAndDisplayResult() {
    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = "<h3>Results:</h3>";

    // Evaluate and display results
    quizData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        resultContainer.innerHTML += `
            <p>
                ${index + 1}. ${question.question}<br>
                Your Answer: ${userAnswer || "Not answered"}<br>
                ${isCorrect ? '<span style="color:green;">Correct</span>' : '<span style="color:red;">Incorrect</span>'}
            </p>
        `;
    });

    // Update total score and display pass/fail message
    totalScore = calculateTotalScore();
    displayTotalScore();
}

function calculateTotalScore() {
    let score = 0;
    quizData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        if (userAnswer === question.correctAnswer) {
            score++;
        }
    });
    return score;
}

function displayTotalScore() {
    const totalScoreSection = document.getElementById("total-score-section");
    totalScoreSection.innerHTML = `<h3>Total Score: ${totalScore}/${quizData.length}</h3>`;

    // Check if the learner has passed or failed
    const passThreshold = 6; // Adjust the threshold as needed
    const passOrFailMessage = totalScore >= passThreshold ? '<span style="color:green;">Pass</span>' : '<span style="color:red;">Fail</span>';
    totalScoreSection.innerHTML += `<p>${passOrFailMessage}</p>`;
}

// displayTotalScore();
/**
 * 
 */
