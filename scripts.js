//seleciona os elementos do formulário
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const form = document.querySelector("form");

//capta quando entra conteúdo no input
amount.oninput = () => {
  //captura o valor do input e substitui valor não numérico por vazio
  let value = amount.value.replace(/\D/g, "");

  //transforma o valor para centavos
  value = Number(value) / 100;

  //não deixa aparecer os valores não numérico - atualiza
  amount.value = formatCurrencyBRL(value);
};

//formata o que foi digitado para o padrão BRL
function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  //retorna o valor formatado
  return value;
}

form.onsubmit = (event) => {
  event.preventDefault();
}
