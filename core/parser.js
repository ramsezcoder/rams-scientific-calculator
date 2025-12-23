// core/parser.js

function parse(input) {
  if (!input) throw new Error("Input kosong");

  const tokens = input
    .replace(/\s+/g, "")
    .match(/sin|cos|tan|log|ln|sqrt|π|e|\d+\.?\d*|[()+\-*/^%]/g);

  if (!tokens) throw new Error("Input tidak valid");
  return tokens;
}

window.parse = parse;
