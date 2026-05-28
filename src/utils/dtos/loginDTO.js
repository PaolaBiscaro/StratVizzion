export function createLoginDTO({ email, senha }) {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedSenha = senha.trim();

  if (!normalizedEmail || !normalizedSenha) {
    throw new Error("Email e senha são obrigatórios para login.");
  }

  return {
    email: normalizedEmail,
    password: normalizedSenha,
  };
}