let displayValue = "";
let storedOperator = "";
let storedValue = "";

const calculator = document.getElementById("calculator");
const numberInput = document.getElementById("numberInput");
const decimalButton = document.getElementById("decimal");
const inputs = calculator.children;

numberInput.addEventListener('input', e => updateDisplayValue(e.target.value));

let keysPressed = {};

document.addEventListener('keydown', (event) => {
   keysPressed[event.key] = true;
   console.log(event.key);
   if (keysPressed['Backspace']) eraseNum();
   else if (keysPressed['Enter']) finishChain();
});

document.addEventListener('keyup', (event) => {
  delete keysPressed[event.key];
});

document.addEventListener('keypress', e => {
  keysPressed[event.key] = true;
  console.log(event.key);
  
  if (keysPressed['.'] || !isNaN(event.key)) numPress(event.key);
  else if (keysPressed['*'] || keysPressed['-'] || keysPressed['/'] || keysPressed['%'] || keysPressed['+']) storeOperandOperator(event.key);
  else if (keysPressed['=']) finishChain();
  else if (keysPressed['a'] && keysPressed['c']) clear();
  else if (event.keyCode > 47 && event.keyCode < 58) numPress(event.keyCode - 48);

})



for (let i = 0; i < inputs.length; i++) {
  const inputElement = inputs[i];

  inputElement.addEventListener('mousedown', e => e.preventDefault());

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
    case '.':
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
      inputElement.addEventListener('click', e => {
        flipSign();
      });
      break;
    case '=':
      inputElement.addEventListener('click', e => {
        finishChain();
      });
      break;
    case 'AC':
      inputElement.addEventListener('click', e => {
        clear();
      });
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
    case '*':
      return multiply(a, b);
    case '/':
      if (b === 0) {
        alert("You take that back.");
        return a;
      }
      return divide(a, b); 
    case '%':
      return remainder(a, b);
    default:
      return b;
  }
}

const numPress = function(num) {
  if (displayValue === "0" || displayValue == storedValue) updateDisplayValue(num);
  else if (num === '.' && displayValue.includes('.'));
  else updateDisplayValue(displayValue + num);
}

const finishChain = function() {
  evaluate();
  storedOperator = "";
}

const eraseNum = function() {
  updateDisplayValue(displayValue.slice(0,-1));
}

const storeOperandOperator = function(operator) {
  const reflexiveOp = displayValue === "" && storedOperator === operator;

  if (displayValue !== "" || storedOperator === operator) {
    const eval = storedOperator !== "" && storedValue !== "";
    if (eval) {
      if (reflexiveOp) displayValue = String(storedValue);
      storedValue = evaluate();
      if (reflexiveOp) displayValue = "";
    }
    else {
      storedValue = Number(displayValue);
      displayValue = "";
    }
  }

  storedOperator = operator;
  decimalButton.disabled = false;
}

const clear = function() {
  storedValue = "";
  storedOperator = "";
  updateDisplayValue("");
}

const flipSign = function() {
  updateDisplayValue(-1 * Number(displayValue))
}

const evaluate = function() {
  const result = operate(storedOperator, Number(storedValue), Number(displayValue))
  updateDisplayValue(result)
  return result;
}

const updateDisplayValue = function(newDisplay) {
  displayValue = newDisplay === "" ? "0" : String(newDisplay);
  numberInput.value = displayValue;

  decimalButton.disabled = displayValue.includes('.');
}