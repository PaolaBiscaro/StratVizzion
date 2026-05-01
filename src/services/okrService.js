import { toOKRRequest } from "./dtos/Request/newOKRRequestDTO"; // ajuste o caminho

export async function criarOKR(formData) {
  const payload = toOKRRequest(formData);

  const response = await fetch("https://sua-api.com/okrs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("Erro ao salvar OKR");

  return response.json();
}