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
		question: "next question",
		1: "23",
		2: "67",
		3: "90",
		4: "56",
		correct: 2
	}
];
console.log(quiz);

// start score at zero
var score = 0;
console.log(score);

// function to take quiz
function takeQuiz() {
	// start timer
	// loop until time is up:
	// provide question and answer choices
	$("#content").html("<h2>" + quiz[0].question + "</h2>");
	for (i = 1; i <= 4; i++) {
		console.log(i);
		console.log(quiz[0][i]);
		var newButton = $("<input/>").attr({
			type: "button",
			class: "choices",
			id: i,
			value: quiz[0][i]
		});
		$("#content").append(newButton);
	}
	// get user answer
	$(".choices").on("click", function() {
		var userAnswer = parseInt(this.id);
		console.log(userAnswer);
		console.log(typeof userAnswer);
		console.log(typeof quiz[0].correct);
		// correct or wrong?
		if (userAnswer === quiz[0].correct) {
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
