const functions = {
  abs: Math.abs,
  ceil: Math.ceil,
  cos: Math.cos,
  floor: Math.floor,
  ln: Math.log,
  log: Math.log10,
  max: Math.max,
  min: Math.min,
  pow: Math.pow,
  round: (value, places = 0) => {
    const digits = Math.max(0, Math.min(12, Math.trunc(places)));
    const multiplier = 10 ** digits;
    return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
  },
  sin: Math.sin,
  sqrt: Math.sqrt,
  tan: Math.tan,
};

function tokenize(expression) {
  const tokens = [];
  let position = 0;

  while (position < expression.length) {
    const remaining = expression.slice(position);
    const whitespace = remaining.match(/^\s+/);
    if (whitespace) {
      position += whitespace[0].length;
      continue;
    }

    const number = remaining.match(/^(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?/i);
    if (number) {
      tokens.push({ type: "number", value: Number(number[0]) });
      position += number[0].length;
      continue;
    }

    const identifier = remaining.match(/^[a-z]+/i);
    if (identifier) {
      tokens.push({ type: "identifier", value: identifier[0].toLowerCase() });
      position += identifier[0].length;
      continue;
    }

    const character = expression[position];
    if ("+-*/%^(),".includes(character)) {
      tokens.push({ type: character, value: character });
      position += 1;
      continue;
    }

    throw new Error(`Unsupported character: ${character}`);
  }

  return tokens;
}

export function calculate(expression) {
  if (typeof expression !== "string" || !expression.trim()) {
    throw new Error("A calculation is required.");
  }
  if (expression.length > 300) throw new Error("The calculation is too long.");

  const tokens = tokenize(expression);
  let index = 0;

  const peek = (type) => tokens[index]?.type === type;
  const take = (type) => {
    if (!peek(type)) throw new Error(`Expected '${type}'.`);
    return tokens[index++];
  };
  let parseExpression;
  let parseUnary;

  const parsePrimary = () => {
    if (peek("number")) return take("number").value;

    if (peek("(")) {
      take("(");
      const value = parseExpression();
      take(")");
      return value;
    }

    if (peek("identifier")) {
      const name = take("identifier").value;
      if (name === "pi") return Math.PI;
      if (name === "e") return Math.E;
      if (!functions[name]) throw new Error(`Unknown function or constant: ${name}`);

      take("(");
      const args = [];
      if (!peek(")")) {
        args.push(parseExpression());
        while (peek(",")) {
          take(",");
          args.push(parseExpression());
        }
      }
      take(")");
      const result = functions[name](...args);
      if (!Number.isFinite(result)) throw new Error("That calculation has no finite result.");
      return result;
    }

    throw new Error("Expected a number, constant, or function.");
  };

  const parsePower = () => {
    const base = parsePrimary();
    if (!peek("^")) return base;
    take("^");
    return base ** parseUnary();
  };

  parseUnary = () => {
    if (peek("+")) {
      take("+");
      return parseUnary();
    }
    if (peek("-")) {
      take("-");
      return -parseUnary();
    }
    return parsePower();
  };

  const parseTerm = () => {
    let value = parseUnary();
    while (peek("*") || peek("/") || peek("%")) {
      const operator = tokens[index++].type;
      const right = parseUnary();
      if ((operator === "/" || operator === "%") && right === 0) throw new Error("Cannot divide by zero.");
      if (operator === "*") value *= right;
      if (operator === "/") value /= right;
      if (operator === "%") value %= right;
    }
    return value;
  };

  parseExpression = () => {
    let value = parseTerm();
    while (peek("+") || peek("-")) {
      const operator = tokens[index++].type;
      const right = parseTerm();
      value = operator === "+" ? value + right : value - right;
    }
    return value;
  };

  const result = parseExpression();
  if (index !== tokens.length) throw new Error("The calculation could not be understood.");
  if (!Number.isFinite(result)) throw new Error("That calculation has no finite result.");
  return Object.is(result, -0) ? 0 : result;
}
