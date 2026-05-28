const loginRoleByEmail = {
  "paulo@empresa.com": "Director",
  "kaio@empresa.com": "Manager",
};

export function createLoginDTO({ email, senha }) {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedSenha = senha.trim();
  const role = loginRoleByEmail[normalizedEmail];

  if (!normalizedEmail || !normalizedSenha) {
    throw new Error("Email e senha são obrigatórios para login.");
  }

  if (!role) {
    throw new Error("Não foi possível identificar o cargo do usuário.");
  }

  return {
    email: normalizedEmail,
    password: normalizedSenha,
    role,
  };
}