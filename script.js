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
        numKey = document.querySelector(`.number[data-key="${e.key}"]`);
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
    numKey.classList.add('highlight');
}

function onClearKeyClick(e) {
    const key = calculator.querySelector('#clear');
    key.classList.add('highlight');

    clearDisplay();
    firstValue = null;
    secondValue = null;
    selectedOperator = '';
}

function onOperatorKeyClick(e) {
    let opKey = null;
    if (e.key) {
        opKey = document.querySelector(`.operator[data-key="${e.key}"]`);
        if (!opKey) return;
    } else {
        opKey = e.target;
    }
    if (selectedOperator === '') {
        firstValue = parseFloat(displayContent.textContent);
    } else {
        result = operate(selectedOperator, firstValue, parseFloat(displayContent.textContent));
        firstValue = result;
        displayContent.textContent = result;
    }
    selectedOperator = opKey.getAttribute('data-name');

    afterOperator = true;
    opKey.classList.add('highlight');
}

function onEqualKeyClick(e) {
    const key = calculator.querySelector('.equal');
    key.classList.add('highlight');

    if (secondValue === null) {
        secondValue = parseFloat(displayContent.textContent);
    } else {
        selectedOperator = prevOperator;
    }
    if (firstValue === null || selectedOperator.length < 1) return;
    
    result = operate(selectedOperator, firstValue, secondValue);
    length = result.toString().length;
    if (length > 9) {
        result = result.toString().split(0, 6) + 'ER';
    }
    displayContent.textContent = result;
    afterOperator = true;
    firstValue = result;
    prevOperator = selectedOperator;
    selectedOperator = '';
    
}

function onSignKeyClick(e) {
    const key = calculator.querySelector('#sign');
    key.classList.add('highlight');

    value = parseFloat(displayContent.textContent);
    value *= -1;
    displayContent.textContent = value;
}

function onPercentKeyClick(e) {
    const key = calculator.querySelector('#percent');
    key.classList.add('highlight');

    value = parseFloat(displayContent.textContent);
    value *= .01;
    if (value.toString().length > 9) {
        value = 'ERROR';
    }
    displayContent.textContent = value;
}

function onKeyDown(e) {
    if (e.key >= 0 || e.key <= 9 || e.key === '.') {
        onNumKeyClick(e);
    } 
    if (e.keyCode === 67 || e.keyCode === 27) {
        onClearKeyClick(e);
    }
    if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*') {
        onOperatorKeyClick(e);
    }
    if (e.key === '=') {
        onEqualKeyClick(e);
    }
    if (e.key === '%') {
        onPercentKeyClick(e);
    }
    if (e.keyCode === 83) {
        onSignKeyClick(e);
    }
    
    
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

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('highlight');
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

const allKeys = calculator.querySelectorAll('button');
allKeys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', onKeyDown);