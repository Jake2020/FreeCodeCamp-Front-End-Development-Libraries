// javascript-calculator-script

document.addEventListener("DOMContentLoaded", function() {

    // Initilize input & results strings & equalsPressed
    var inputString = "";
    var resultString = "";
    var equalsPressed = false;

    // Get buttons
    var buttons = document.querySelectorAll("button");

    // Add click event listeners to the buttons
    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            var buttonText = button.innerText;

            // Reset after '=' pressed
            if(equalsPressed) {
                
                // If followed by operator:
                // Continue from last result
                if (buttonText === "+" || buttonText === "-" || buttonText === "*" || buttonText === "/") {
                    inputString = resultString + " ";
                    resultString = "";
                    input.innerText = inputString;
                    display.innerText = resultString;

                // If followed by number:
                // Start a new calc    
                } else if(!isNaN(buttonText)) {
                    inputString = "";
                    resultString = "";
                    input.innerText = inputString;
                    display.innerText = resultString;
                }

                equalsPressed = false;
            }

            // If number button pressed:
            // Add button value to strings
            if (!isNaN(buttonText)) {

                // If input string is "0" & next button pressed is 0:
                // Overwrite with "0" to ignore multiple 0's
                if (inputString === "0") {
                    inputString = buttonText;
                    resultString = buttonText;

                // If input string has multiple segments:
                } else {
                    // Get the last number segment
                    const lastSegment = inputString.split(" ").pop();

                    // If "0":
                    // Ignore input
                    if (lastSegment === "0") {
                        // Do nothing

                    // Otherwise add input to end of string
                    } else {
                        inputString += buttonText;
                        resultString += buttonText;
                    }
                }
            }

            // If "." pressed:
            // Add to end of current string if last segment does not already contain a "."
            else if (buttonText === ".") {
                const lastSegment = inputString.split(" ").pop();
                if (!lastSegment.includes(".")) {
                    inputString += buttonText;
                    resultString += buttonText;
                }
            }

            // If operator button pressed:
            else if (buttonText === "+" || buttonText === "-" || buttonText === "*" || buttonText === "/") {

                const lastChar = inputString.trim().slice(-1);
                const secondLastChar = inputString.trim().slice(-2);

                // Check if the last character is an operator
                if ((buttonText !== "-") && (lastChar === "+" || lastChar === "*" || lastChar === "/")) {
                    // overwrite previous operator
                    const lastNumberIndex = inputString.trim().lastIndexOf(" ");
                    inputString = inputString.slice(0, lastNumberIndex) + " " + buttonText + " ";
                    console.log("if");

                } else if (buttonText === "-" && lastChar !== "-") {
                    inputString += " -";
                    console.log("else if");

                } else {
                    inputString += " " + buttonText + " ";
                    console.log("else");
                }
                
                // Reset results string to reset display
                resultString = "";
            }

            
            // If equals button pressed:
            // Calc result
            else if (buttonText === "=") {
                resultString = eval(inputString);
                equalsPressed = true;
            }

            // If clear button pressed:
            // Clear strings & reset
            else if (buttonText === "AC") {
                inputString = "";
                resultString = "";
            }

            // Update the input element
            input.innerText = inputString;
            display.innerText = resultString;

            // Reset screen after 'AC' press & values updated
            if(resultString === "") {
                display.innerText = 0
            }
            
        });
    });
});