// jQuery
$(function() {
	console.log("ready!");
});

// object array for questions, choices, and answers
var quiz = [
	{
		question: "first question",
		1: "first answer",
		2: "second answer",
		3: "third answer",
		4: "fourth answer",
		correct: 4
	},
	{
		question: "second question",
		1: "23",
		2: "67",
		3: "90",
		4: "56",
		correct: 2
	},
	{
		question: "third question",
		1: "12",
		2: "623",
		3: "9345",
		4: "456",
		correct: 3
	},
	{
		question: "fourth question",
		1: "278",
		2: "345",
		3: "78",
		4: "52",
		correct: 1
	}
];
console.log(quiz);

// start score at zero
var score = 0;
console.log("score is: " + score);

// start at first question
var currentQ = 0;
console.log("current question is: " + currentQ);

// start timer at 60 second
var time = 60;
$("#countdown").html(time);

// function to provide question and answer choices
function askQuestion(i) {
	// check if all questions answered
	// if
	// question
	$("#content").html("<h2>" + quiz[i].question + "</h2>");
	// multiple choice answer buttons
	for (x = 1; x <= 4; x++) {
		var newButton = $("<input/>").attr({
			type: "button",
			class: "choices",
			id: x,
			value: quiz[i][x]
		});
		$("#content").append(newButton);
	}
}

// function to check if answer is correct and update score
function checkAnswer(i, userAnswer) {
	// correct or wrong?
	if (userAnswer === quiz[i].correct) {
		var isCorrect = "Correct!";
		console.log("user answer is: " + isCorrect);
		// update score
		score++;
		console.log("score is: " + score);
	} else {
		var isCorrect = "Wrong.";
		console.log("user answer is: " + isCorrect);
		console.log("score is: " + score);
	}
	$("#content").append("<h3>" + isCorrect + "</h3>");
}

// function to take quiz
function takeQuiz() {
	// provide next question
	if (quiz[currentQ] === undefined) {
		endQuiz();
		return;
	}
	console.log(quiz[currentQ].question);
	askQuestion(currentQ);
	// get user answer
	$(".choices").on("click", function() {
		var userAnswer = parseInt(this.id);
		console.log("user chose: " + userAnswer);
		//check answer
		checkAnswer(currentQ, userAnswer);
		// go to next question
		currentQ++;
		setTimeout(takeQuiz, 1000);
	});
}

// end quiz
function endQuiz() {
	$("#content").html("<h2>Quiz Complete!</h2>");
	$("#content").append("<h3>Your score is: " + score + "</h3>");
	$("#timer").html("");
}

// quiz to last for specified duration or end after last question answered
function timedQuiz() {
	takeQuiz();
	var quizTime = setInterval(function() {
		time--;
		$("#countdown").html(time);
		if (time === 0) {
			clearInterval(quizTime);
			endQuiz();
		}
	}, 1000);
}

// show score

// log user initials

// rank user in list of scores

// show list of highscores

// try again?

// event listener to start quiz
document.getElementById("start").addEventListener("click", timedQuiz);
