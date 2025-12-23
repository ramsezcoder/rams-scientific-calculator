// core/calculator.js

function calculateExpression(input) {
  if (!input) throw new Error("Input kosong");

  const tokens = parse(input);
  const result = execute(tokens);

  if (typeof result !== "number" || isNaN(result)) {
    throw new Error("Perhitungan gagal");
  }

  return result;
}

window.calculateExpression = calculateExpression;
