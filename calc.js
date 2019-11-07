let displayValue = "";
let storedOperator = "";
let storedValue = "";

const calculator = document.getElementById("calculator");
const numberInput = document.getElementById("numberInput");
const inputs = calculator.children;

numberInput.addEventListener('input', e => updateDisplayValue(e.target.value));

document.addEventListener("keypress", e => {
  console.log(event.keyCode);
  if (event.keyCode > 47 && event.keyCode < 58) {
    numPress(event.keyCode - 48);
  }
})

document.addEventListener('keydown', e => {
  if (event.keyCode == 8) {
    eraseNum();
  }
})

for (let i = 0; i < inputs.length; i++) {
  const inputElement = inputs[i];

  switch(inputElement.innerHTML) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      inputElement.addEventListener('click', e => {
        numPress(e.target.innerText);
      });
      break;
    case 'x':
    case '+':
    case '-':
    case '/':
    case '%':
      inputElement.addEventListener('click', e => {
        storeOperandOperator(inputElement.innerText);
      });
      break;
    case '+/-':
      break;
    case '=':
      inputElement.addEventListener('click', e => {
        evaluate();
      });
      break;
    case 'AC':
      break;
    case '.':
      break;
  }
}

const add = function(a, b) {
  return a + b;
}

const subtract = function(a, b) {
  return a - b;
}

const multiply = function(a, b) {
  return a * b;
}

const divide = function(a, b) {
  return a / b;
}

const remainder = function(a, b) {
  return a % b;
}

const operate = function(operator, a, b) {
  switch(operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case 'x':
      return multiply(a, b);
    case '/':
      return divide(a, b); 
    case '%':
      return remainder(a, b);
  }
}

const numPress = function(num) {
  if (displayValue === "0" || displayValue == storedValue) updateDisplayValue(num);
  else updateDisplayValue(displayValue + num);
}

const eraseNum = function() {
  updateDisplayValue(displayValue.slice(0,-1));
}

const storeOperandOperator = function(operator) {
  const eval = !(storedOperator === "" || storedValue === "" || displayValue === "");
  
  if (eval) {
    storedValue = evaluate();
  }
  else {
    storedValue = Number(displayValue);
    displayValue = "";
  }

  storedOperator = operator;
}

const evaluate = function() {
  const result = operate(storedOperator, Number(storedValue), Number(displayValue))
  updateDisplayValue(result)
  return result;
}

const updateDisplayValue = function(newDisplay) {
  displayValue = newDisplay === "" ? "0" : String(newDisplay);
  numberInput.value = displayValue;
}