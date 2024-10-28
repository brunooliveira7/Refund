//seleciona os elementos do formulário
const amount = document.getElementById("amount");

//capta quando entra conteúdo no input
amount.oninput = () => {
  //captura o valor do input e substitui valor não numérico por vazio
  let value = amount.value.replace(/\D/g, "")
  //não deixa aparecer o valor que não é numero
  amount.value = value;
  
};
