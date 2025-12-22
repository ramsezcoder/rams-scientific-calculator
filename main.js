import { calculateExpression } from "./core/calculator.js";

const display = document.getElementById("display");
const history = document.getElementById("history");

/* =========================
   UTILITIES
========================= */
const OPERATORS = ["+", "-", "*", "/", "^", "%"];

function resetIfZero() {
  if (display.value === "0") display.value = "";
}

function lastChar() {
  return display.value.slice(-1);
}

function isOperator(char) {
  return OPERATORS.includes(char);
}

function showError(message = "Error") {
  display.value = message;
  setTimeout(() => {
    display.value = "0";
  }, 1200);
}

/* =========================
   BUTTON HANDLERS
========================= */
window.append = (value) => {
  resetIfZero();

  // Cegah operator ganda
  if (isOperator(value) && isOperator(lastChar())) return;

  display.value += value;
};

window.clearDisplay = () => {
  display.value = "0";
  if (history) history.textContent = "";
};

window.deleteLast = () => {
  if (display.value.length <= 1) {
    display.value = "0";
  } else {
    display.value = display.value.slice(0, -1);
  }
};

window.calculate = () => {
  try {
    const expression = display.value;
    const result = calculateExpression(expression);

    if (history) {
      history.textContent = `${expression} = ${result}`;
    }

    display.value = result.toString();
  } catch (e) {
    showError(e.message);
  }
};

/* =========================
   THEME TOGGLE
========================= */
window.toggleTheme = () => {
  const calc = document.getElementById("calc");
  if (!calc) return;

  calc.classList.toggle("light");
  calc.classList.toggle("dark");
};

/* =========================
   KEYBOARD SUPPORT
========================= */
document.addEventListener("keydown", (e) => {
  const key = e.key;

  // Angka
  if (!isNaN(key)) {
    append(key);
    return;
  }

  // Operator
  if (["+", "-", "*", "/", "^", "%"].includes(key)) {
    append(key);
    return;
  }

  // Titik desimal
  if (key === ".") {
    append(".");
    return;
  }

  // Kurung
  if (key === "(" || key === ")") {
    append(key);
    return;
  }

  // Enter / =
  if (key === "Enter" || key === "=") {
    e.preventDefault();
    calculate();
    return;
  }

  // Backspace → DEL
  if (key === "Backspace") {
    deleteLast();
    return;
  }

  // Escape → AC
  if (key === "Escape") {
    clearDisplay();
  }
});
