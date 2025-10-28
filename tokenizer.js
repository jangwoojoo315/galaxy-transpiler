// tokenizer.js
export function tokenize(input) {
  const tokens = [];
  let i = 0;

  while (i < input.length) {
    const char = input[i];

    // 1. 공백 무시
    if (/\s/.test(char)) {
      i++;
      continue;
    }

    // 2. 태그 시작 / 종료 관련
    if (char === "<") {
      if (input[i + 1] === "/") {
        tokens.push({ type: "tagEndOpen", value: "</" });
        i += 2;
      } else {
        tokens.push({ type: "tagOpen", value: "<" });
        i++;
      }
      continue;
    }

    if (char === ">") {
      tokens.push({ type: "tagClose", value: ">" });
      i++;
      continue;
    }

    if (char === "/") {
      tokens.push({ type: "slash", value: "/" });
      i++;
      continue;
    }

    if (char === "=") {
      tokens.push({ type: "equals", value: "=" });
      i++;
      continue;
    }

    if (char === '"') {
      let value = "";
      i++;
      while (i < input.length && input[i] !== '"') {
        value += input[i++];
      }
      tokens.push({ type: "string", value });
      i++; // closing quote
      continue;
    }

    // 3. 텍스트 or identifier
    if (/[a-zA-Z0-9_!]/.test(char)) {
      let value = "";
      while (i < input.length && /[a-zA-Z0-9_!]/.test(input[i])) {
        value += input[i++];
      }
      tokens.push({ type: "identifier", value });
      continue;
    }

    i++;
  }

  return tokens;
}
