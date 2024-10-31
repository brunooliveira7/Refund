//seleciona os elementos do formulário
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const form = document.querySelector("form");
//seleciona os elementos da lista
const expenseList = document.querySelector("ul");

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
    expense: expense.value, //nome
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
    //cria o elemento para adicionar o item (li) na lista (ul)
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    //cria o ícone da categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    //cria o texto com a info da despesa - div
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");
    //cria o nome da despesa - strong
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;
    //cria a categoria da despesa - span
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    //cria o valor da despesa - span
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    //innerHTML porque tem uma coisa(small) dentro da outra(span)
    //toUpperCase - garante que está tudo em maiúsculo para garantir que o replace vai encontrar
    //já houve formatação no input
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    //cria o ícone de remover - img
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.setAttribute("alt", "remover");
    

    //adiciona name(strong) e category(span) a info(div)
    expenseInfo.append(expenseName, expenseCategory);

    //adiciona tudo nas informações no item li
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    //adiciona o item na lista ul
    expenseList.append(expenseItem);
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas");
    console.log(error);
  }
}
