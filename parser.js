// parser.js
export function parse(tokens) {
  let i = 0;

  function parseElement() {
    if (tokens[i]?.type !== "tagOpen") return null;
    i++; // '<'

    const tagName = tokens[i++].value;
    const props = {};

    // props 읽기
    while (tokens[i] && tokens[i].type === "identifier") {
      const key = tokens[i++].value;
      if (tokens[i]?.type === "equals") i++;
      const valueToken = tokens[i++];
      props[key] = valueToken?.value || true;
    }

    // self-closing 태그 (<img />)
    if (tokens[i]?.type === "slash") {
      i += 2; // '/' + '>'
      return { type: "Element", tagName, props, children: [] };
    }

    i++; // '>' 지나가기

    // children 파싱
    const children = [];
    while (i < tokens.length && tokens[i]?.type !== "tagEndOpen") {
      if (tokens[i]?.type === "tagOpen") {
        children.push(parseElement());
      } else {
        // 텍스트 노드
        children.push({
          type: "Text",
          value: tokens[i++].value,
        });
      }
    }

    // 닫는 태그 스킵
    if (tokens[i]?.type === "tagEndOpen") {
      i += 3; // '</', identifier, '>'
    }

    return { type: "Element", tagName, props, children };
  }

  return parseElement();
}
