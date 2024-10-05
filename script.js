let firstNumber = '';
let secondNumber = '';
let operator = '';
let shouldResetDisplay = false;

const display = document.querySelector('#display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButtons = document.querySelector('.equals');
const clearButtons = document.querySelector('.clear');

function appendNumber (number) {
    if (shouldResetDisplay) resetDisplay();
    if (display.textContent === '0') {
        display.textContent = number;
    } else {
        display.textContent += number;
    }
}

function resetDisplay () {
    display.textContent = '';
    shouldResetDisplay = false;
}   

function clear () {
    display.textContent = '0';
    firstNumber = '';
    secondNumber = '';
    operator = '';
    shouldResetDisplay = false;
}

function setOperator (op) {
    if (operator !== '') evaluate();
    firstNumber = display.textContent;
    operator = op;
    shouldResetDisplay = true;
}

function evaluate () {
    if (operator === '' || shouldResetDisplay) return;
    secondNumber = display.textContent;
    display.textContent = roundResult(operate(operator, firstNumber, secondNumber));
    operator = '';
    shouldResetDisplay = true;
}

function roundResult (result) {
    return Math.round(result * 1000) / 1000;
}

function operate (op, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num2 === 0 ? 'Error: Div 0' : num1 / num2;
        default:
            return null;
    }
}

numberButtons.forEach((button) => {
    button.addEventListener('click', () => appendNumber(button.value))
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => setOperator(button.value))
});

equalsButtons.addEventListener('click', evaluate);
clearButtons.addEventListener('click', clear);