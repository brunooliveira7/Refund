//seleciona os elementos do formulário
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const form = document.querySelector("form");
//seleciona os elementos da lista
const expenseList = document.querySelector("ul");
//seleciona o total das despesas
const expensesQuantity = document.querySelector("aside header p span");
//seleciona o total dos valores
const expensesTotal = document.querySelector("aside header h2");

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

//adiciona a despesa de um item na lista (ul)
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
    //innerHTML porque tem o small dentro da span
    //toUpperCase - garante que está maiúsculo para garantir que o replace localize
    //já houve formatação no input pra R$
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

    //atualiza os totais
    updateTotals();

    //limpa os inputs
    expense.value = "";
    category.value = "";
    amount.value = "";
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.");
    console.log(error);
  }
}

//atualizar os totais
function updateTotals() {
  try {
    //recupera todos os itens (li) da lista (ul)
    const items = expenseList.children;

    //atualiza a quantidade de itens (li) da lista (ul)
    expensesQuantity.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`;

    //Var para incrementar o total
    let total = 0;
    //percorre cada item (li) da lista (ul)
    for (let item = 0; item < items.length; item++) {
      //recupera a span inteira de itens (li) da lista (ul)
      const itemAmount = items[item].querySelector(".expense-amount");

      //remove caracteres não numéricos e substitui a virgula pelo ponto - pega só o valor da span
      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".");

      //converte o valor para float
      value = parseFloat(value);

      //verifica se o número é válido
      if (isNaN(value)) {
        return alert(
          "Não foi possível calcular o total. O valor não parece ser um número"
        );
      }

      //incrementar o valor total
      total += Number(value);
    }

    //cria a small para adicionar o R$ formatado
    const symbolBRL = document.createElement("small");
    symbolBRL.textContent = "R$";

    //formata o valor e remove o R$ que será exibido pela small com estilo customizado
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");
    //limpa o conteúdo do valor total
    expensesTotal.innerHTML = "";
    //adiciona o símbolo da moeda e o valor total formatado
    expensesTotal.append(symbolBRL, total);

  } catch (error) {
    alert("Não foi possível atualizar os totais.");
    console.log(error);
  }
}

//evento que captura o clique para remover item da lista (ul)
expenseList.addEventListener("click", (event) => {
  //verifica se o elemento clicado é o ícone de remover
  if (event.target.classList.contains("remove-icon")) {
    //obtém a li pai do elemento clicado
    const itemToRemove = event.target.closest(".expense");
    //remove o item da lista
    itemToRemove.remove();  
  }
  //atualiza os totais
  updateTotals();
});
