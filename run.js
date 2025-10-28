import fs from "fs";
import { tokenize } from "./tokenizer.js";
import { parse } from "./parser.js";
import { generateCode } from "./codegen.js";

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.length === 1 ? children[0] : children,
    },
  };
}

// 입력 JSX
const input = fs.readFileSync("./input.jsx", "utf-8");

// 1. 토큰화
const tokens = tokenize(input);
console.log("=== Tokens ===");
console.log(tokens);

// 2. 파싱
const ast = parse(tokens);
console.log("\n=== AST ===");
console.log(JSON.stringify(ast, null, 2));

// 3. 코드 생성
const code = generateCode(ast);
console.log("\n=== Generated Code ===\n", code);

// 4. 실행
const result = eval(code);
console.log("\n=== Executed Result ===");
console.log(result);
