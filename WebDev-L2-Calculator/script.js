const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const actionButtons = document.querySelectorAll("[data-action]");

let currentInput = "0";
let previousInput = "";
let operator = null;
let shouldReset = false;

function updateDisplay() {
  resultDisplay.textContent = currentInput;
  expressionDisplay.textContent =
    previousInput && operator ? `${previousInput} ${operator}` : "";
}

function appendNumber(number) {
  if (shouldReset) {
    currentInput = "";
    shouldReset = false;
  }

  if (number === "." && currentInput.includes(".")) return;

  if (currentInput === "0" && number !== ".") {
    currentInput = number;
  } else {
    currentInput += number;
  }

  updateDisplay();
}

function chooseOperator(nextOperator) {
  if (operator && !shouldReset) {
    calculate();
  }

  previousInput = currentInput;
  operator = nextOperator;
  shouldReset = true;

  updateDisplay();
}

function calculate() {
  if (!operator || previousInput === "") return;

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  let result;

  switch (operator) {
    case "+":
      result = prev + current;
      break;

    case "-":
      result = prev - current;
      break;

    case "*":
      result = prev * current;
      break;

    case "/":
      if (current === 0) {
        currentInput = "Error";
        previousInput = "";
        operator = null;
        updateDisplay();
        return;
      }
      result = prev / current;
      break;

    default:
      return;
  }

  currentInput = Number(result.toFixed(8)).toString();
  previousInput = "";
  operator = null;
  shouldReset = true;

  updateDisplay();
}

function clearCalculator() {
  currentInput = "0";
  previousInput = "";
  operator = null;
  shouldReset = false;
  updateDisplay();
}

// Delete last character
function deleteCharacter() {
  if (shouldReset) return;

  if (currentInput.length === 1 || currentInput === "Error") {
    currentInput = "0";
  } else {
    currentInput = currentInput.slice(0, -1);
  }

  updateDisplay();
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.dataset.number);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperator(button.dataset.operator);
  });
});

actionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;

    switch (action) {
      case "clear":
        clearCalculator();
        break;

      case "delete":
        deleteCharacter();
        break;

      case "equals":
        calculate();
        break;
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key) || e.key === ".") {
    appendNumber(e.key);
  }

  if (["+", "-", "*", "/"].includes(e.key)) {
    chooseOperator(e.key);
  }

  if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    calculate();
  }

  if (e.key === "Backspace") {
    deleteCharacter();
  }

  if (e.key === "Escape") {
    clearCalculator();
  }
});

updateDisplay();