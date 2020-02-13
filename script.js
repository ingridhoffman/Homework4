// jQuery
$(function() {
	console.log("ready!");
});

// start score at zero
var score = 0;
console.log("score is: " + score);

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

// object array for high scores
var highScores = [
	{
		initials: "xxx",
		score: 0
	}
];

// start quiz when user clicks "Start"
$("#start").on("click", function() {
	startQuiz();
});

// function to start quiz
function startQuiz() {
	// set timer to 60 seconds
	var time = 60;
	$("#countdown").html(time);
	// start timer
	var quizTime = setInterval(function() {
		time--;
		$("#countdown").html(time);
		if (time === 0) {
			clearInterval(quizTime);
			// end quiz if time is up
			endQuiz();
		}
	}, 1000);

	// cycle through quiz questions starting with first
	takeQuiz(0);
}

// function to take quiz
function takeQuiz(currentQ) {
	// end quiz if all questions have been answered
	if (quiz[currentQ] === undefined) {
		endQuiz();
		return;
	}
	// ask question
	askQuestion(currentQ);
	// get user answer
	$(".choices").on("click", function() {
		var userAnswer = parseInt(this.id);
		console.log("user chose: " + userAnswer);
		console.log(typeof userAnswer);
		// check if correct and update score
		console.log("correct answer is: " + quiz[currentQ].correct);
		console.log(typeof quiz[currentQ].correct);
		checkAnswer(quiz[currentQ].correct, userAnswer);
		// go to next question after pause
		currentQ++;
		setTimeout(takeQuiz, 500, currentQ);
	});
}

// function to provide question and answer choices
function askQuestion(questionNum) {
	// question
	$("#content").html("<h2>" + quiz[questionNum].question + "</h2>");
	// multiple choice answer buttons
	for (x = 1; x <= 4; x++) {
		var newBtn = $("<input/>").attr({
			type: "button",
			class: "choices",
			id: x,
			value: quiz[questionNum][x]
		});
		$("#content").append(newBtn);
	}
}

// function to check if answer is correct and update score
function checkAnswer(correct, user) {
	// correct or wrong?
	if (user === correct) {
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

// at end of quiz
function endQuiz() {
	$("#content").html("<h2>Quiz Complete!</h2>");
	$("#content").append("<h3>Your score is: " + score + "</h3>");
	$("#timer").html("");
	// add user to scores list
	logUser(score);
}

// function to log user and go to scores
function logUser(points) {
	var initLabel = $("<input/>").attr({
		for: "initialsBox",
		value: "Enter your initials to log your score:"
	});
	var initBox = $("<input/>").attr({
		type: "text",
		id: "initialsBox",
		maxlength: 3
	});
	var initSubmit = $("<input/>").attr({
		type: "submit",
		id: "initialsSubmit"
	});
	$("#content").append(initLabel);
	$("#content").append(initBox);
	$("#content").append(initSubmit);
	$("#initialsSubmit").on("click", function() {
		console.log("user entered: " + $("#initialsBox").val());
		addUser($("#initialsBox").val(), points);
		showScores();
	});
}

// function to add user to high scores array
function addUser(id, points) {
	console.log("user id: " + id);
	console.log("user points: " + points);
	highScores.push({
		initials: id,
		score: points
	});
	console.log(highScores);
}

// show high scores
function showScores() {
	$("#content").html("<h2>High Scores:</h2>");
	$("#content").append("<div id='scoreList'></div>");
	$.each(highScores, function(key, value) {
		console.log(value.initials + " | " + value.score);
		$("#scoreList").append(
			"<h3>" + value.initials + " : " + value.score + "</h3>"
		);
	});

	// try again button
	var againBtn = $("<input/>").attr({
		type: "button",
		id: "again",
		value: "Try Again"
	});
	// clear scores button
	var clearBtn = $("<input/>").attr({
		type: "button",
		id: "clear",
		value: "Clear High Scores"
	});
	$("#content").append(againBtn);
	$("#content").append(clearBtn);

	// if user clicks "Try Again" start the quiz again
	$("#again").on("click", function() {
		startQuiz();
	});

	// if user clicks "Clear High Scores" delete all stored scores
	$("#clear").on("click", function() {
		var highScores = [{}];
		console.log(highScores);
		$("#scoreList").html("<h3></h3>");
	});
}
