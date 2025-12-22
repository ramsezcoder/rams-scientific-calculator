import { parse } from "./parser.js";
import { execute } from "./math.js";

export function calculateExpression(expr) {
  const tokens = parse(expr);
  return execute(tokens);
}
