const operators = {
  "+": { prec: 1, assoc: "L", fn: (a, b) => a + b },
  "-": { prec: 1, assoc: "L", fn: (a, b) => a - b },
  "*": { prec: 2, assoc: "L", fn: (a, b) => a * b },
  "/": {
    prec: 2,
    assoc: "L",
    fn: (a, b) => {
      if (b === 0) throw new Error("Pembagian dengan nol");
      return a / b;
    }
  },
  "^": { prec: 3, assoc: "R", fn: (a, b) => Math.pow(a, b) },
  "%": { prec: 3, assoc: "R", fn: (a) => a / 100 }
};

const functions = {
  sin: (x) => Math.sin(x * Math.PI / 180),
  cos: (x) => Math.cos(x * Math.PI / 180),
  tan: (x) => {
    if (x % 90 === 0 && x % 180 !== 0) throw new Error("tan tidak terdefinisi");
    return Math.tan(x * Math.PI / 180);
  },
  log: (x) => {
    if (x <= 0) throw new Error("log x ≤ 0");
    return Math.log10(x);
  },
  ln: (x) => {
    if (x <= 0) throw new Error("ln x ≤ 0");
    return Math.log(x);
  },
  sqrt: (x) => {
    if (x < 0) throw new Error("akar bilangan negatif");
    return Math.sqrt(x);
  }
};

export function execute(tokens) {
  const output = [];
  const stack = [];

  tokens.forEach(token => {
    if (!isNaN(token)) {
      output.push(Number(token));
    } else if (token === "π") {
      output.push(Math.PI);
    } else if (token === "e") {
      output.push(Math.E);
    } else if (functions[token]) {
      stack.push(token);
    } else if (operators[token]) {
      while (
        stack.length &&
        operators[stack[stack.length - 1]] &&
        (
          operators[token].prec < operators[stack[stack.length - 1]].prec ||
          (operators[token].prec === operators[stack[stack.length - 1]].prec &&
            operators[token].assoc === "L")
        )
      ) {
        output.push(stack.pop());
      }
      stack.push(token);
    } else if (token === "(") {
      stack.push(token);
    } else if (token === ")") {
      while (stack.length && stack[stack.length - 1] !== "(") {
        output.push(stack.pop());
      }
      stack.pop();
      if (functions[stack[stack.length - 1]]) {
        output.push(stack.pop());
      }
    }
  });

  while (stack.length) output.push(stack.pop());

  return evaluatePostfix(output);
}

function evaluatePostfix(queue) {
  const stack = [];

  queue.forEach(token => {
    if (typeof token === "number") {
      stack.push(token);
    } else if (operators[token]) {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(operators[token].fn(a, b));
    } else if (functions[token]) {
      const a = stack.pop();
      stack.push(functions[token](a));
    }
  });

  return stack.pop();
}
