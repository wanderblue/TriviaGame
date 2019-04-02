$(document).ready(function() {

var questions = [
{
	question: "who will take the Iron Throne and rule the Seven Kingdoms of Westeros?",
	choices: ["TONY STARK", "DAENERYS", "SANSA STARK",  "TYRION LANNISTER", " JON SNOW"],
	choicesAnswer: 0
},
{
	question: "Which Dragon will Jon Snow ride?",
	choices: ["Viserion",  "Rhaegar", " Targaryen", "Drogon", "None"],
	choicesAnswer: 1
},
{
	question: "Which Dragon does Dany ride?",
	choices: ["Viserion",  "Rhaegar", " Targaryen", "Drogon", "None"],
	choicesAnswer: 3
},
{
	question: "What is the name of the direwolve of Arya Stark?",
	choices: ["NYMERIA", "GHOST", "LADY", "SUMMER", " GREY WIND"],
	choicesAnswer: 0
},
{
	question: "What is the name of the direwolve of Sansa Stark?",
	choices: ["NYMERIA", "GHOST", "LADY", "SUMMER", " GREY WIND"],
	choicesAnswer: 2
},
{
	question: "Where will the final battle take place?",
	choices: ["Westeros", "Winterfell", "King’s Landing", "Iceland", "Beyond the Wall"],
	choicesAnswer: 1
}];

var aTimer = 1000;
var correct = 0;
var incorrect = 0;
var skipped = 0;
var chosedAns = [];
var questionNum = 0;


//Function to submit answers
function getAnswer() {
	$("#submit").on("click", function(e) {
		e.preventDefault();
		chosedAns.length = 0;
			
		//Record user answer to question
		var selectAnswer = $("#choices input:radio[name=optionsRadios]:checked").val();
		chosedAns.push(selectAnswer);
			nextTest();
	});
};
	

var secLeft = 10;
var invTimer;

function setTimer() {
	invTimer = setInterval(countInv, 1000);
};

function countInv() {
	secLeft--;
	$("#time-remain").html("Remaining time is: " + secLeft + " seconds");
	if (secLeft === 0) {
		stopTimer();
		chosedAns.length = 0;		
	 var selectAnswer = $("#choices input:radio[name=optionsRadios]:checked").val();
		chosedAns.push(selectAnswer);
		nextTest();
	};
};

function resetTimer() {
	secLeft = 10;
	$("#time-remain").html("Remaining time is: " + secLeft + " seconds");
};

function displayTimer() {
	$("#time-remain").html("Answer Review");
};

function stopTimer() {
	clearInterval(invTimer);
};

//Function to display the given response options
function createRadios() {
	var responseOptions = $("#choices");
	//Empty array for user answer
	responseOptions.empty();
		
	for (var i = 0; i < questions[questionNum].choices.length; i++) {
	

	responseOptions.append('<input type="radio" name="optionsRadios" id="optionsRadios2" value="' + [i] +'"><label><div class="got-opt">' + questions[questionNum].choices[i] + '</div></label>');
};
};

//display question
function showTest() {
	clearTest();
	resetTimer();

		$(".questionTxt").html(questions[questionNum].question);

	createRadios();

	$("#submitBut").append('<button type="submit" class="btn btn-primary btn-lg" id="submit">' + "Submit" + '</button>');
	setTimer()
	getAnswer();
};

//Display first page
function startGame() {
	$("#mainSec").append('<a href="#" class="btn btn-primary btn-lg" id="start-button">' + "Start" + '</a>');
	//Start game
	$("#start-button").on("click", function(event) {
		event.preventDefault();
		//Displays the first question
		startTest();
		resetTimer();
	});
};

//Reset
function reset() {
	questionNum = 0;
	correct = 0;
	incorrect = 0;
	skipped = 0;
	chosedAns = [];
	resetTimer();
};

//Display review page
function answerReview() {
	clearTest();
	$("#mainSec").append('<h4>' + "Correct: " + correct + '</h4><br><h4>' + "Incorrect: " + incorrect + '</h4><br><h4>' + "Skipped: " + skipped + '</h4><br><br><a href="#" class="btn btn-primary btn-lg" id="restart-button">' + "Restart" + '</a>');
	//Restart game
	$("#restart-button").on("click", function(event) {
		event.preventDefault();
		//Displays 
		reset();
		clearTest();
		startGame();
	});
};

// clear the question
function clearTest() {
	var questionSec = $(".questionTxt");
	questionSec.empty();

	var responsesSec = $("#choices");
	responsesSec.empty();

	var submitSec = $("#submitBut");
	submitSec.empty();

	var contentSec = $("#mainSec");
	contentSec.empty();

	stopTimer();
};


function checkTest() {
	clearTest();
	var correctAnswer = questions[questionNum].choicesAnswer;
	if (chosedAns[0] == questions[questionNum].choicesAnswer) {
		$("#mainSec").append('<h4>'+"Your answer is correct!" + '</h4>');
		correct++;
		displayTimer();
	}
	else if (chosedAns[0] === undefined) {
		$("#mainSec").append('<h4>'+"Time's up!" + '</h4><br><br><h4>' + "The correct answer was: " + questions[questionNum].choices[correctAnswer] + '</h4>');
		skipped++;
		displayTimer();
	}
	else {
		$("#mainSec").append('<h4>'+"Wrong answer." + '</h4><br><br><h4>' + "The correct answer was: " + questions[questionNum].choices[correctAnswer] + '</h4>');
		incorrect++;
		displayTimer();
	};
};

//next question 
function nextTest() {
	checkTest();

	questionNum++;
	//counts reset to 0
	if (questionNum === questions.length) {
		setTimeout(answerReview, aTimer);
	} 
	else {
		setTimeout(showTest, aTimer);
	};
};

//display the first question
function startTest() {
	var startContent = $("#mainSec");
	startContent .empty(); 
	showTest();
};

//
startGame();

});