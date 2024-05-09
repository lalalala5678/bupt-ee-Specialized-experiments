let display = document.querySelector('.display');
let clearButton = document.getElementById('clear');
let divideButton = document.getElementById('divide');
let multiplyButton = document.getElementById('multiply');
let subtractButton = document.getElementById('subtract');
let addButton = document.getElementById('add');
let equalsButton = document.getElementById('equals');
let resultLight = document.querySelector('.light span');

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
  resultLight.className = '';
}

function calculate() {
  try {
    let result = eval(display.value);
    display.value = result;
    resultLight.className = result % 2 === 0 ? 'even' : 'odd';
  } catch (error) {
    display.value = 'Error';
  }
}
