// ================================================================
// app.js - Arquivo JavaScript da Pizzaria Fatec
// Manipula o carrinho, adiciona itens, calcula total e atualiza DOM
// ================================================================

// Carrinho armazenará objetos:
// { sabor: "Calabresa", preco: 45 }
let carrinho = [];

// Seleciona todos os botões de "Pedir Agora"
const botoes = document.querySelectorAll(".botao-pedir");

// Seletores do carrinho
const listaCarrinho = document.getElementById("lista-carrinho");
const totalCarrinho = document.getElementById("total");

// ================================================================
// Função: atualizarCarrinho()
// Atualiza visualmente a lista e soma total.
// ================================================================
function atualizarCarrinho() {
    listaCarrinho.innerHTML = "";  // limpa a lista antes de atualizar
    let soma = 0;

    // Adicionado o parâmetro 'index' para identificar a posição real de cada item
    carrinho.forEach((item, index) => {
        soma += item.preco;

        // cria um elemento de item
        const li = document.createElement("li");
        li.classList.add("item-carrinho");
        
        // Estrutura o HTML interno com o texto do item e o botão de exclusão vinculado ao index
        li.innerHTML = `
            <span>${item.sabor} — R$ ${item.preco.toFixed(2)}</span>
            <button class="btn-remover" onclick="removerItem(${index})">Remover</button>
        `;
        
        listaCarrinho.appendChild(li);
    });

    totalCarrinho.textContent = `Total: R$ ${soma.toFixed(2)}`;
}

// ================================================================
// Função: removerItem(index)
// Remove uma pizza específica do array pelo seu índice e atualiza a tela.
// ================================================================
function removerItem(index) {
    // Remove exatamente 1 elemento a partir da posição passada por parâmetro
    carrinho.splice(index, 1);

    // Atualiza a interface imediatamente após a remoção (sem recarregar a página)
    atualizarCarrinho();
}

// ================================================================
// EVENTO: ao clicar em qualquer botão de pizza
// ================================================================
botoes.forEach(botao => {

    botao.addEventListener("click", function(event) {
        event.preventDefault(); // impede reload da página

        // Lê dados do HTML via data-*
        let sabor = this.dataset.sabor;
        let preco = Number(this.dataset.preco);

        // Cria objeto da pizza pedida
        let pedido = { sabor, preco };

        // Adiciona ao array
        carrinho.push(pedido);

        // Atualiza a interface
        atualizarCarrinho();
    });
});