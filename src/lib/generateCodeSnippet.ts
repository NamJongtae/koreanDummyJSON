export function generateCodeSnippet(
  fetchUrl: string,
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body?: object
) {
  let code = `fetch('${process.env.NEXT_PUBLIC_BASE_URL}/api${fetchUrl}'`;

  const needOptions = method && (method !== "GET" || body);

  if (needOptions) {
    code += `, {\n`;

    if (method && method !== "GET") {
      code += `  method: '${method}'${body ? "," : ""}\n`;
    }

    // body가 있을 때만 추가
    if (body) {
      code += `  body: JSON.stringify({\n`;
      Object.entries(body).forEach(([key, value]) => {
        code += `    "${key}": ${JSON.stringify(value)},\n`;
      });
      code = code.trimEnd().slice(0, -1); // 마지막 쉼표 제거
      code += `\n  })${method !== "GET" ? "," : ""}\n`;
    }

    if (method && method !== "GET" && method !== "DELETE") {
      code += `  headers: {\n`;
      code += `    "Content-Type": "application/json"\n`;
      code += `  }\n`;
    }

    code += `}`;
  }

  code += `)\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error('Error fetching data:', error));\n`;

  return code;
}
