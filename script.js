// jQuery
$(function() {
	console.log("ready!");
});

// object for questions, choices, and answers
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
console.log(score);

// start at first question
var currentQ = 0;
console.log(currentQ);

function askQuestion(i) {
	// provide question and answer choices
	$("#content").html("<h2>" + quiz[i].question + "</h2>");
	for (x = 1; x <= 4; x++) {
		console.log(x);
		console.log(quiz[i][x]);
		var newButton = $("<input/>").attr({
			type: "button",
			class: "choices",
			id: x,
			value: quiz[i][x]
		});
		$("#content").append(newButton);
	}
}

function checkAnswer(i, userAnswer) {
	// correct or wrong?
	if (userAnswer === quiz[i].correct) {
		var isCorrect = "Correct!";
		console.log(isCorrect);
		// update score
		score++;
		console.log(score);
	} else {
		var isCorrect = "Wrong.";
		console.log(isCorrect);
		console.log(score);
	}
	$("#content").append("<h3>" + isCorrect + "</h3>");
}

// function to take quiz
function takeQuiz() {
	// start timer
	// provide next question
	console.log(quiz[currentQ].question);
	askQuestion(currentQ);
	// get user answer
	$(".choices").on("click", function() {
		var userAnswer = parseInt(this.id);
		console.log(userAnswer);
		//check answer
		checkAnswer(currentQ, userAnswer);
		// go to next question
		currentQ++;
		setTimeout(takeQuiz, 1000);
	});

	// end quiz
}

// show score

// log user initials

// rank user in list of scores

// show list of highscores

// try again?

// event listener to start quiz
document.getElementById("start").addEventListener("click", takeQuiz);
