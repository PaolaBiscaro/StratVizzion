export const getEquipes = () => {
  return [
    { id: 1, nome: "Designers", dev: "Clara Almeira, Jonas Para, Maria Cecilia", cli: "Cliente A" },
    { id: 2, nome: "Back-end", dev: "Marcos Souza, Julia Lima, Keila Recife, Johnattan Silva", cli: "Cliente B" },
    { id: 3, nome: "Marketing", dev: "Sarah Pereira, João Silva, Marcos Antônio, Marcos Ferreira", cli: "Cliente C" },
    { id: 4, nome: "Front-end", dev: "MariaSarah, João Silveira, Marcos Enzo, Amelia Cristina", cli: "Cliente D" }
  ];
};


export const getOKR = () => {
  return [
    { id: "OKR_0001", porcentagem: 86, prazo: "29/03/2027", descricao: "Atingir R$ 500 mil em Novos Negócios até o final do trimestre." },
    { id: "OKR_0002", porcentagem: 20, prazo: "30/04/2027", descricao: "Reduzir o custo por aquisição (CPA) de R$45 para R$28" },
    { id: "OKR_0003", porcentagem: 1, prazo: "30/05/2027", descricao: "Atingir taxa de conversão do onboarding de 40% para 62%" },
  { id: "OKR_0001", porcentagem: 50, prazo: "29/03/2027", descricao: "Atingir R$ 500 mil em Novos Negócios até o final do trimestre." },
  ];
};
const listaParaExibirOkr = getOKR();
const listaParaExibirEquipes = getEquipes();

console.log(listaParaExibirOkr, listaParaExibirEquipes);