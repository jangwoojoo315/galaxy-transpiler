// 간단한 JSX 트랜스파일러 (AST 느낌 포함)
export function transpileJSX(code) {
  // self-closing 태그 처리
  const selfClosingTagRegex = /<(\w+)([^>]*)\/>/g;
  const normalTagRegex = /<(\w+)([^>]*)>(.*?)<\/\1>/gs;

  function parseProps(rawProps) {
    if (!rawProps.trim()) return "null";
    const props = {};
    const propRegex = /(\w+)="([^"]*)"/g;
    let match;
    while ((match = propRegex.exec(rawProps))) {
      const [, key, value] = match;
      props[key] = value;
    }
    return JSON.stringify(props);
  }

  // self-closing 변환
  code = code.replace(selfClosingTagRegex, (_, tag, rawProps) => {
    const props = parseProps(rawProps);
    return `createElement("${tag}", ${props})`;
  });

  // 일반 태그 변환
  function replaceJSX(match, tag, rawProps, inner) {
    const props = parseProps(rawProps);
    const children = inner.replace(normalTagRegex, replaceJSX).trim();
    const child = children ? `"${children}"` : "null";
    return `createElement("${tag}", ${props}, ${child})`;
  }

  return code.replace(normalTagRegex, replaceJSX);
}
