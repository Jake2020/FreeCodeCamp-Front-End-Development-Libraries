// javascript-calculator-script

var previousResult = 0;
var isNewCalculation = true;

//
// Assign buttons to vars & add event listeners
//

// AC | / | * Row
var clearButton = document.getElementById('clear');
clearButton.addEventListener('click', handleClearButtonClick);

var divideButton = document.getElementById('divide');
divideButton.addEventListener('click', function() {
    handleOperatorClick('/');
  });

var multiplyButton = document.getElementById('multiply');
multiplyButton.addEventListener('click', function() {
    handleOperatorClick('*');
  });

// 7 | 8 | 9 | - Row
var sevenButton = document.getElementById('seven');
sevenButton.addEventListener('click', function() {
    handleNumberButtonClick('7');
});

var eightButton = document.getElementById('eight');
eightButton.addEventListener('click', function() {
    handleNumberButtonClick('8');
});

var nineButton = document.getElementById('nine');
nineButton.addEventListener('click', function() {
    handleNumberButtonClick('9');
});

var subtractButton = document.getElementById('subtract');
subtractButton.addEventListener('click', function() {
    handleOperatorClick('-');
  });

// 4 | 5 | 6 | + Row
var fourButton = document.getElementById('four');
fourButton.addEventListener('click', function() {
    handleNumberButtonClick('4');
});

var fiveButton = document.getElementById('five');
fiveButton.addEventListener('click', function() {
    handleNumberButtonClick('5');
});

var sixButton = document.getElementById('six');
sixButton.addEventListener('click', function() {
    handleNumberButtonClick('6');
});

var addButton = document.getElementById('add');
addButton.addEventListener('click', function() {
    handleOperatorClick('+');
  });

// 1 | 2 | 3 | = Row
var oneButton = document.getElementById('one');
oneButton.addEventListener('click', function() {
    handleNumberButtonClick('1');
});

var twoButton = document.getElementById('two');
twoButton.addEventListener('click', function() {
    handleNumberButtonClick('2');
});

var threeButton = document.getElementById('three');
threeButton.addEventListener('click', function() {
    handleNumberButtonClick('3');
});

var equalsButton = document.getElementById('equals');
equalsButton.addEventListener('click', handleEqualsButtonClick);

// 0 | .  Row
var zeroButton = document.getElementById('zero');
zeroButton.addEventListener('click', function() {
    handleNumberButtonClick('0');
});

var decimalButton = document.getElementById('decimal');
decimalButton.addEventListener('click', handleDecimalButtonClick);


//
// Functions to handle the button clicks
//

// Handle number button clicks
function handleNumberButtonClick(number) {

    // Get elements and get numbers inside
    var inputElement = document.getElementById('input');
    var displayElement = document.getElementById('display');
    var inputText = inputElement.textContent;
    var displayText = displayElement.textContent;
    
    // If calc in default state or someone pre-clicked 0
    if (displayText === '0' && (inputText === '' || inputText === '0')) {
        // Replace the single '0' with the current number
        inputElement.textContent = number;
        displayElement.textContent = number;
    } else {
        // Get last value in input string
        var segments = inputText.split(' ');
        var lastSegment = segments[segments.length - 1];
        
        // If start of new number (after operator)
        if (lastSegment === '0') {
            // Replace the 0 with the current number
            segments[segments.length - 1] = number;
            inputElement.textContent = segments.join(' ');
            displayElement.textContent = number;
        } else if (displayText === '0') {
            // Stop display showing 0123
            inputElement.textContent += number;
            displayElement.textContent = number;
        } else {
            // Append the current number
            inputElement.textContent += number;
            displayElement.textContent += number;
        }
    }
}

function handleOperatorClick(operator) {

    // Get elements and get numbers inside
    var inputElement = document.getElementById('input');
    var displayElement = document.getElementById('display');
  
    // Check if new calculation
    if (isNewCalculation) {
      // Set the operator as the first input
      inputElement.textContent = previousResult + ' ' + operator + ' ';
      isNewCalculation = false;
    } else {
      // Append the operator
      inputElement.textContent += ' ' + operator + ' ';
    }
  
    displayElement.textContent = '0';
  }

function handleClearButtonClick() {
  document.getElementById('input').textContent = '';
  document.getElementById('display').textContent = '0';
}

function handleEqualsButtonClick() {
    var inputElement = document.getElementById('input');
    var displayElement = document.getElementById('display');
    var inputText = inputElement.textContent;
    var displayText = displayElement.textContent;

    // Remove trailing operators (except -)
    inputText = inputText.replace(/[-+*/]$/, '');
    inputElement.textContent = inputText;

    // Evaluate the expression
    var result = eval(inputText);

    // Store the result for future calculations
    previousResult = result;

    // Display the result
    displayElement.textContent = result;
    
}

function handleDecimalButtonClick() {
    var inputElement = document.getElementById('input');
    var displayElement = document.getElementById('display');
    var inputText = inputElement.textContent;
    var displayText = displayElement.textContent;

    // Check if the current display value already contains a decimal point
    if (displayText.includes('.')) {
        return;
    }

    // Append the decimal point
    inputText += '.';
    displayText += '.';
    inputElement.textContent = inputText;
    displayElement.textContent = displayText;
}