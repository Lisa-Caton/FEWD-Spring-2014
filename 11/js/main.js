
var $calculator;
var $buttons;
var $display;
var currentValue = 0;
var currentOperator = "";
var currentInput = "";
var lastInput = "";
var operators = ["+", "-", "*", "/"];
var lastPress = "";
var hasOperated = false;
var hasInput = false;
var hasCalculated = false;


$(document).ready(function() {
	
	$calculator = $(".calculator");
	$button = $(".button");
	$display = $(".display");

	//best way to write event
	$calculator.on("click", ".button", onButtonClick);
	//shorthadn to write event
	//$buttons.click(onButtonClick);

	reset();

});

function onButtonClick(event) {
	var $target = $(event.target);
	var buttonValue = $target.text().toLowerCase();
	var buttonCharCode = buttonValue.charCodeAt(0);

	if (buttonCharCode === 247) {
		buttonValue = "/";
	} else if (buttonCharCode === 215) {
		buttonValue = "*";
	}

	if (buttonValue === "c") {
		reset();
	} else if(buttonValue === "="){
		calculateValue();
	} else if (operators.indexOf(buttonValue) > -1) {
		setOperator (buttonValue);
	} else {
		appendInput(buttonValue);
	}
}


function reset() {
	currentValue = 0;
	currentOperator = "";
	currentInput = "";
	lastInput = "";

	lastPress = "";
	hasOperated = false;
	hasInput = false;
	hasCalculated = false;

	updateDisplay(currentValue);
}

function appendInput(input) {
	if (input === "." && currentInput.indexOf(".") > -1) {
		return;
	}


	if (currentInput === "operator") {
			currentInput = input;
		} else {
			currentInput += input;
		}

		if (currentInput.length > 1 && currentInput.slice(0, 1) === "0" && currentInput.slice(1, 1) !== ".") {
			currentInput = currentInput.slice(1, currentInput.length);
			//takes 0564 
			//read 564
			//it could read 0.564, but would just use the meat of the number
			//"!==" means (strictly) not equal to
		}

		if(currentInput.slice(0, 1) === ".") {
			currentInput = "0" + currentInput;
			//here adding the zero for a decimal to make it look nice .78 = now it 0.78 , opposite as above
		}

		lastPress = "digit";
		hasInput = true;
		hasCalculated = false;
	
		updateDisplay(currentInput);
}

function setOperator(operator) {
	if(hasOperated && lastPress !== "operator") {
		calculateValue();
	}

	currentOperator = operator;
	currentValue = parseFloat(currentInput);

	if (isNaN(currentValue)){
		// isNaN aka is not a number
		currentValue = 0;
}

	lastPress = "operator";
	hasOperated = true;
	hasInput = false;
	hasCalculated = false;
}

function calculateValue () {
	var input;

	if (hasCalculated) {
		input = parseFloat(lastInput);
	} else {
		input = parseFloat(currentInput);
		lastInput = input;
	}

	lastInput = input;

	switch(currentOperator) {
		case "+":
			currentValue += input;
			//"+=" means to ADD
			break;
		case "-":
			currentValue -= input;
			break;
		case "*":
			currentValue *= input;
			break;
		case"/":
			currentValue /= input;
			break;
		default:
			break;

	}

	lastPress = "operator";
	hasInput = false;
	hasCalculated = true;

	updateDisplay(currentValue);
	currentInput = currentValue.toString();

}

function updateDisplay(value) {
	$display.val(value);
}