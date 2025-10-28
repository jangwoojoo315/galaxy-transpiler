// codegen.js
export function generateCode(node) {
  if (node.type === "Text") {
    return JSON.stringify(node.value);
  }

  const propsCode = JSON.stringify(node.props);
  const childrenCode = node.children
    .map((child) => generateCode(child))
    .join(", ");

  return `createElement("${node.tagName}", ${propsCode}${
    childrenCode ? ", " + childrenCode : ""
  })`;
}
