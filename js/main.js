// Obtener elementos del DOM
const display = document.querySelector('.display p');
const buttons = Array.from(document.querySelectorAll('button'));
const operationHistoryElement = document.querySelector('.operation-history');
const backButton = document.querySelector('.back-button');

// Historial y resultado
let history = [];
let result = '';
let operationHistory = [];

// Eventos de los botones
buttons.forEach(button => {
    button.addEventListener('click', handleClick);
});
backButton.addEventListener('click', goBack);

// Función de manejo de clics
function handleClick(e) {
    const value = e.target.textContent;

    switch (value) {
        case 'AC':
            clearHistory();
            break;
        case '=':
            calculate();
            break;
        default:
            addToHistory(value);
            break;
    }
}

// Agregar valor al historial
function addToHistory(value) {
    if (value === '÷') {
        value = '/';
    } else if (value === '×') {
        value = '*';
    } else if (value === '−') {
        value = '-';
    }

    history.push(value);
    display.textContent = history.join('');
}

// Calcular resultado
function calculate() {
    try {
        const expression = history.join('');
        result = eval(expression);
        display.textContent = result;
        operationHistory.push(`${history.join('')} = ${result}`);
        updateOperationHistory();
        history = [result.toString()];
    } catch (error) {
        display.textContent = 'Error';
    }
}

// Retroceder un paso en el historial
function goBack() {
    if (operationHistory.length > 0) {
        operationHistory.pop();
        updateOperationHistory();
        if (operationHistory.length > 0) {
            const previousResult = operationHistory[operationHistory.length - 1].split('=')[1].trim();
            display.textContent = previousResult;
            history = [previousResult];
        } else {
            display.textContent = '0';
            history = [];
        }
    }
}

// Limpiar historial
function clearHistory() {
    history = [];
    result = '';
    display.textContent = '0';
    operationHistory = [];
    updateOperationHistory();
}

// Actualizar historial de operaciones
function updateOperationHistory() {
    operationHistoryElement.innerHTML = operationHistory.map((operation, index) => `<span>${index + 1}. ${operation}</span>`).join('');
}