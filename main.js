const display = document.getElementById("display");
const calc = document.getElementById("calc");
const historyEl = document.getElementById("history");

let history = [];

/* =========================
   DISPLAY HELPERS
========================= */
function resetIfZero() {
  if (display.value === "0") {
    display.value = "";
  }
}

function showError() {
  display.value = "Error";
  setTimeout(() => {
    display.value = "0";
  }, 1200);
}

/* =========================
   BUTTON HANDLERS
========================= */
window.append = (value) => {
  resetIfZero();
  display.value += value;
};

window.clearDisplay = () => {
  display.value = "0";
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
    const expr = display.value;
    const result = window.calculateExpression(expr);

    // tampilkan hasil
    display.value = result.toString();

    // simpan history
    history.unshift(`${expr} = ${result}`);
    history = history.slice(0, 5); // max 5

    historyEl.innerHTML = history.join("<br>");
  } catch (e) {
    showError();
  }
};

/* =========================
   THEME TOGGLE (FIXED)
========================= */
window.toggleTheme = () => {
  if (calc.classList.contains("dark")) {
    calc.classList.remove("dark");
    calc.classList.add("light");
  } else {
    calc.classList.remove("light");
    calc.classList.add("dark");
  }
};
