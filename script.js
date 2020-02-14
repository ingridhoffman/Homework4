// jQuery
$(function() {});

// define variable for score
var score;

// define variable for time allowed
var time;

// define variable for interval timer
var quizTime;

// object array for questions, choices, and answers
var quiz = [
	{
		question: "Which of the following is correct about JavaScript?",
		1: "JavaScript is a lightweight, interpreted programming language",
		2: "JavaScript has object-oriented capabilities that allows you to build interactivity into otherwise static HTML pages",
		3: "The general-purpose core of the language has been embedded in Netscape, Internet Explorer, and other web browsers",
		4: "All of the above",
		correct: 4
	},
	{
		question:
			"Which of the following type of variable is visible everywhere in your JavaScript code?",
		1: "global variable",
		2: "local variable",
		3: "Both of the above",
		4: "None of the above",
		correct: 1
	},
	{
		question:
			"Which built-in method combines the text of two strings and returns a new string?",
		1: "append",
		2: "concat",
		3: "attach",
		4: "None of the above",
		correct: 2
	},
	{
		question:
			"Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
		1: "last",
		2: "put",
		3: "push",
		4: "None of the above",
		correct: 3
	},
	{
		question:
			"Which built-in method returns the calling string value converted to lower case?",
		1: "toLowerCase",
		2: "toLower",
		3: "changeCase(case)",
		4: "None of the above",
		correct: 1
	},
	{
		question:
			"Which of the following function of Array object extracts a section of an array and returns a new array?",
		1: "reverse()",
		2: "shift()",
		3: "slice()",
		4: "some()",
		correct: 3
	}
];

// set initial array for for high scores
var highScores = [];

// check local storage for previous scores
var checkScores = JSON.parse(localStorage.getItem("userScores"));

// set stored scores (if any) to high score list
if (checkScores !== null) {
	highScores = checkScores;
}

// start quiz when user clicks "Start"
$("#start").on("click", startQuiz);

// function to start quiz
function startQuiz() {
	// start score at zero
	score = 0;
	// set timer to 60 seconds
	time = 60;
	// show timer
	$("#content").html(
		"<h6 class='text-center text-primary' id='timer'>Time remaining: </h6><hr>"
	);
	$("#timer").append("<span id='countdown'>" + time + "</span>");
	// start timer
	quizTime = setInterval(function() {
		time--;
		$("#countdown").html("<span>" + time + "</span>");
		if (time <= 0) {
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
		clearInterval(quizTime);
		return;
	}
	// prevent new question if out of time
	if (time > 0) {
		// create div for quiz questions
		$("#content").append("<div id='questions'></div>");
		// ask question
		askQuestion(currentQ);
		// get user answer
		$(".choices").on("click", function() {
			var userAnswer = parseInt(this.id);
			// check if correct and update score
			checkAnswer(quiz[currentQ].correct, userAnswer);
			// go to next question after pause
			currentQ++;
			setTimeout(takeQuiz, 500, currentQ);
		});
	}
}

// function to provide question and answer choices
function askQuestion(questionNum) {
	// question
	$("#questions").html("<h5>" + quiz[questionNum].question + "</h5>");
	// multiple choice answer buttons
	for (x = 1; x <= 4; x++) {
		var newBtn = $("<input/>").attr({
			type: "button",
			class: "choices btn btn-light btn-wrap-text my-3 btn-block",
			style: "white-space: normal",
			id: x,
			value: quiz[questionNum][x]
		});
		$("#questions").append(newBtn);
	}
}

// function to check if answer is correct and update score
function checkAnswer(correct, user) {
	// correct or wrong?
	if (user === correct) {
		var isCorrect = "Correct!";
		$("#questions").append(
			"<h4 class='text-center text-primary'>" + isCorrect + "</h4>"
		);
		// update score
		score++;
	} else {
		var isCorrect = "Wrong.";
		$("#questions").append(
			"<h4 class='text-center text-danger'>" + isCorrect + "</h4>"
		);
		time = time - 10;
	}
}

// at end of quiz
function endQuiz() {
	$("#content").html("<h2 class='text-center'>Quiz Complete!</h2>");
	$("#content").append(
		"<h5 class='text-center text-primary'>Your score is: " + score + "</h5>"
	);
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
		class: "form-control",
		id: "initialsBox",
		maxlength: 3
	});
	var initSubmit = $("<input/>").attr({
		type: "submit",
		class: "btn btn-info mt-4",
		id: "initialsSubmit"
	});
	$("#content").append(initLabel);
	$("#content").append(initBox);
	$("#content").append(initSubmit);
	$("#initialsSubmit").on("click", function() {
		addUser($("#initialsBox").val(), points);
		showScores();
	});
}

// function to add user to high scores array
function addUser(id, points) {
	highScores.push({
		initials: id,
		score: points
	});
	highScores.sort((a, b) => (a.score > b.score ? -1 : 1));
	localStorage.setItem("userScores", JSON.stringify(highScores));
}

// show high scores
function showScores() {
	$("#content").html("<h3 class='text-center'>High Scores</h3>");
	$("#content").append("<div id='scoreList'></div>");
	$.each(highScores, function(key, value) {
		$("#scoreList").append(
			"<h5 class='text-center text-primary'>" +
				value.initials +
				"....." +
				value.score +
				"</h3>"
		);
	});

	// try again button
	var againBtn = $("<input/>").attr({
		type: "button",
		class: "btn btn-info btn-wrap-text mt-3",
		id: "again",
		value: "Try Again"
	});
	// clear scores button
	var clearBtn = $("<input/>").attr({
		type: "button",
		class: "btn btn-light btn-wrap-text mt-3",
		id: "clear",
		value: "Clear High Scores"
	});
	$("#content").append(againBtn);
	$("#content").append(clearBtn);

	// if user clicks "Try Again" start the quiz again
	$("#again").on("click", startQuiz);

	// if user clicks "Clear High Scores" delete all stored scores
	$("#clear").on("click", function() {
		highScores = [];
		localStorage.removeItem("userScores");
		$("#scoreList").html("<h3></h3>");
	});
}
