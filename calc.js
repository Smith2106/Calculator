let displayValue = "0";

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
      inputElement.addEventListener('click', (e) => {
        numPress(e.target.innerText);
      });
      break;
    case 'x':
    case '+':
    case '-':
    case '/':
    case '%':
      break;
    case '+/-':
      break;
    case '=':
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

const operate = function(operator, a, b) {
  switch(operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b); 
  }
}

const numPress = function(num) {
  updateDisplayValue(String((Number(displayValue) * 10) + Number(num)));
}

const eraseNum = function() {
  updateDisplayValue(displayValue.slice(0,-1));
}

const updateDisplayValue = function(newDisplay) {
  displayValue = newDisplay === "" ? "0" : newDisplay;
  numberInput.value = displayValue;
}