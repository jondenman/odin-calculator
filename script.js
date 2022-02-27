const display = document.querySelector('.display');
const displayContent = display.querySelector('.display-content');

const calculator = document.querySelector('.calculator');

let firstValue = null;
let secondValue = null;

let selectedOperator = '';

let afterOperator = false;

function addNumToDisplay(num) {
    let currentLength = displayContent.textContent.length;
    if (currentLength < 10) {
        displayContent.textContent += num;
    }
}

function clearDisplay() {
    displayContent.textContent = '';
}

function onNumKeyClick(e) {
    if (afterOperator) {
        displayContent.textContent = '';
        afterOperator = false;
    }
    let className = e.target.getAttribute('class');
    num = e.target.getAttribute('data-name');
    addNumToDisplay(num);
}

function onClearKeyClick(e) {
    clearDisplay();
    firstValue = null;
    secondValue = null;
    selectedOperator = '';
}

function onOperatorKeyClick(e) {
    firstValue = parseFloat(displayContent.textContent);
    selectedOperator = e.target.getAttribute('data-name');


    afterOperator = true;
}

function onEqualKeyClick(e) {
    if (firstValue === null || selectedOperator.length < 1) return;
    if (secondValue === null) {
        secondValue = parseFloat(displayContent.textContent);
    }
    result = operate(selectedOperator, firstValue, secondValue);
    length = result.toString().length;
    if (length > 9) {
        result = result.toFixed(1);
    }
    displayContent.textContent = result;
    afterOperator = true;
    firstValue = result;
}

function add(a, b) {
    if (typeof(a) !== 'number' || typeof(b) !== 'number') return 'ERROR';
    return a + b;
}

function subtract(a, b) {
    if (typeof(a) !== 'number' || typeof(b) !== 'number') return 'ERROR';
    return a - b;
}

function multiply(a, b) {
    if (typeof(a) !== 'number' || typeof(b) !== 'number') return 'ERROR';
    return a * b;
}

function divide(a, b) {
    if (typeof(a) !== 'number' || typeof(b) !== 'number' || b === 0) return 'ERROR'; 
    return a / b;
}

function operate(operator, a, b) {
    result = 0;
    switch (operator) {
        case 'add':
            result = add(a, b);
            break;
        case 'subtract':
            result = subtract(a, b);
            break;
        case 'multiply':
            result = multiply(a, b);
            break;
        case 'divide':
            result = divide(a, b);
            break;
        default:
            result = 'ERROR';
    }
    return result;
}

const numKeys = calculator.querySelectorAll('.number');
numKeys.forEach(key => key.addEventListener('click', onNumKeyClick));

const clearKey = calculator.querySelector('#clear');
clearKey.addEventListener('click', onClearKeyClick);

const operatorKeys = calculator.querySelectorAll('.operator');
operatorKeys.forEach(key => key.addEventListener('click', onOperatorKeyClick));

const equalKey = calculator.querySelector('.equal');
equalKey.addEventListener('click', onEqualKeyClick);
