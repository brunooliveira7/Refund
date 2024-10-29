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

//captura o evento de submit para obter os valores
form.onsubmit = (event) => {
  event.preventDefault();

  //objeto dos dados detalhados de despesa do form
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    create_at: new Date(),
  };
  //chama a função que irá adicionar o item na lista 
  expenseAdd(newExpense);
};

//adiciona a despesa a lista
function expenseAdd(newExpense) {
  try {
    //cria o elemento para adicionar na lista
    

    //limpa os inputs
    expense.value = "";
    category.value = "";
    amount.value = "";

  
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas");
    console.log(error);
  }


}