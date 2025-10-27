import fs from "fs";
import { transpileJSX } from "./transpiler.js";

// createElement 정의 (실행용 트리 생성)
function createElement(type, props, ...children) {
  // children이 문자열이면 그대로, 배열이면 flatten
  const flatChildren = children
    .flat()
    .map((c) => (typeof c === "string" ? c : c));
  return {
    type,
    props: {
      ...props,
      children: flatChildren.length === 1 ? flatChildren[0] : flatChildren,
    },
  };
}

// AST 느낌 함수 (선택적)
function jsxToAST(node) {
  if (typeof node === "string") return { type: "Text", value: node };
  return {
    type: "Element",
    tagName: node.type,
    props: node.props,
    children: Array.isArray(node.props.children)
      ? node.props.children.map(jsxToAST)
      : [jsxToAST(node.props.children)],
  };
}

// input.jsx 읽기
const input = fs.readFileSync("./input.jsx", "utf-8");

// 트랜스파일
const transpiledCode = transpileJSX(input);
console.log("=== Transpiled Code ===\n", transpiledCode);

// 실행 → Resulting Tree
const elementTree = eval(transpiledCode);
console.log("\n=== Resulting Tree ===\n", elementTree);

// AST 느낌으로 변환
const astTree = jsxToAST(elementTree);
console.log("\n=== AST-like Tree ===\n", JSON.stringify(astTree, null, 2));
