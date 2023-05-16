// Obtener elementos del DOM
const display = document.querySelector('.display p');
const buttons = Array.from(document.querySelectorAll('button'));

// Historial y resultado
let history = [];
let result = '';

// Eventos de los botones
buttons.forEach(button => {
  button.addEventListener('click', handleClick);
});

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
    history = [result];
  } catch (error) {
    display.textContent = 'Error';
  }
}

// Limpiar historial
function clearHistory() {
  history = [];
  result = '';
  display.textContent = '0';
}