document.addEventListener("DOMContentLoaded", function() {
    const input = document.querySelector(".input");
    const buttons = document.querySelectorAll(".button");
    let currentInput = "";
    let operator = "";
    let firstOperand = "";
    let secondOperand = "";

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const buttonText = button.textContent;

            if (buttonText === "AC") {
                clearAll();
            } else if (buttonText === "C") {
                clearLastEntry();
            } else if (buttonText === "=") {
                calculateResult();
            } else if (buttonText === "+/-") {
                toggleSign();
            } else if (isOperator(buttonText)) {
                setOperator(buttonText);
            } else {
                appendToInput(buttonText);
            }
        });
    });

    document.addEventListener("keydown", (event) => {
        const key = event.key;

        if (key === "Escape") {
            clearAll();
        } else if (key === "Backspace") {
            clearLastEntry();
        } else if (key === "Enter" || key === "=") {
            calculateResult();
        } else if (key === "±") {
            toggleSign();
        } else if (isOperatorKey(key)) {
            setOperator(convertOperatorKey(key));
        } else if (isNumberKey(key) || key === ".") {
            appendToInput(key);
        }
    });

    function clearAll() {
        currentInput = "";
        operator = "";
        firstOperand = "";
        secondOperand = "";
        updateInputDisplay();
    }

    function clearLastEntry() {
        currentInput = currentInput.slice(0, -1);
        updateInputDisplay();
    }

    function calculateResult() {
        if (firstOperand !== "" && operator !== "" && currentInput !== "") {
            secondOperand = currentInput;
            let result = 0;

            switch (operator) {
                case "+":
                    result = parseFloat(firstOperand) + parseFloat(secondOperand);
                    break;
                case "-":
                    result = parseFloat(firstOperand) - parseFloat(secondOperand);
                    break;
                case "x":
                    result = parseFloat(firstOperand) * parseFloat(secondOperand);
                    break;
                case "/":
                    result = parseFloat(firstOperand) / parseFloat(secondOperand);
                    break;
                case "%":
                    result = parseFloat(firstOperand) % parseFloat(secondOperand);
                    break;
            }

            currentInput = result.toString();
            operator = "";
            firstOperand = "";
            secondOperand = "";
            updateInputDisplay();
        }
    }

    function toggleSign() {
        if (currentInput !== "") {
            currentInput = (parseFloat(currentInput) * -1).toString();
            updateInputDisplay();
        }
    }

    function setOperator(op) {
        if (currentInput !== "") {
            if (firstOperand === "") {
                firstOperand = currentInput;
                currentInput = "";
            }
            operator = op;
            updateInputDisplay();
        }
    }

    function appendToInput(value) {
        currentInput += value;
        updateInputDisplay();
    }

    function updateInputDisplay() {
        input.value = currentInput;
    }

    function isOperator(value) {
        return value === "+" || value === "-" || value === "x" || value === "/" || value === "%";
    }

    function isOperatorKey(key) {
        return key === "+" || key === "-" || key === "*" || key === "/" || key === "%";
    }

    function convertOperatorKey(key) {
        if (key === "*") {
            return "x";
        } else if (key === "/") {
            return "/";
        } else {
            return key;
        }
    }

    function isNumberKey(key) {
        return !isNaN(key);
    }
});
