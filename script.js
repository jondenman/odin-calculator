const display = document.querySelector('.display');
const displayContent = display.querySelector('.display-content');

const calculator = document.querySelector('.calculator');

let firstValue = null;
let secondValue = null;

let selectedOperator = '';
let prevOperator = '';

let afterOperator = false;

function addNumToDisplay(num) {
    let currentLength = displayContent.textContent.length;
    if (currentLength < 9) {
        displayContent.textContent += num;
    }
}

function clearDisplay() {
    displayContent.textContent = '';
}

function onNumKeyClick(e) {
    let numKey = null;
    if (e.keyCode) {
        console.log (e.keyCode);
        numKey = document.querySelector(`.number[data-key="${e.keyCode}"]`);
        if (!numKey) return;
    } else {
        numKey = e.target;
    }
    if (afterOperator) {
        displayContent.textContent = '';
        afterOperator = false;
    }
    let className = numKey.getAttribute('class');
    num = numKey.getAttribute('data-name');
    addNumToDisplay(num);
}

function onClearKeyClick(e) {
    clearDisplay();
    firstValue = null;
    secondValue = null;
    selectedOperator = '';
}

function onOperatorKeyClick(e) {
    if (selectedOperator === '') {
        firstValue = parseFloat(displayContent.textContent);
    } else {
        result = operate(selectedOperator, firstValue, parseFloat(displayContent.textContent));
        firstValue = result;
        displayContent.textContent = result;
    }
    
    selectedOperator = e.target.getAttribute('data-name');

    afterOperator = true;
}

function onEqualKeyClick(e) {
    if (secondValue === null) {
        secondValue = parseFloat(displayContent.textContent);
    } else {
        selectedOperator = prevOperator;
    }
    if (firstValue === null || selectedOperator.length < 1) return;
    
    result = operate(selectedOperator, firstValue, secondValue);
    length = result.toString().length;
    if (length > 9) {
        result = result.toFixed(1);
    }
    displayContent.textContent = result;
    afterOperator = true;
    firstValue = result;
    prevOperator = selectedOperator;
    selectedOperator = '';
}

function onSignKeyClick(e) {
    value = parseFloat(displayContent.textContent);
    value *= -1;
    displayContent.textContent = value;
}

function onPercentKeyClick(e) {
    value = parseFloat(displayContent.textContent);
    console.log(value);
    value *= .01;
    if (value.toString().length > 9) {
        value = 'ERROR';
    }
    displayContent.textContent = value;
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
    
    if (result.toString().length > 10) {
        return `2BIGNOCALC`;
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

const signKey = calculator.querySelector('#sign');
signKey.addEventListener('click', onSignKeyClick);

const percentKey = calculator.querySelector('#percent');
percentKey.addEventListener('click', onPercentKeyClick);

window.addEventListener('keydown', onNumKeyClick);