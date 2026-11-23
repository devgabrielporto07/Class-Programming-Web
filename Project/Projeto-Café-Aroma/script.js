
const SALVAR_NO_NAVEGADOR = true;

// LISTA DE PRODUTOS
const produtos = [
    {
        id: 1,
        nome: "Espresso",
        descricao: "Café curto e intenso, extraído na hora.",
        preco: 6.5,
        imagem: "https://images.pexels.com/photos/38523136/pexels-photo-38523136.jpeg",
    },
    {
        id: 2,
        nome: "Cappuccino",
        descricao: "Espresso, leite vaporizado e espuma cremosa.",
        preco: 12.0,
        imagem: "https://images.pexels.com/photos/39537967/pexels-photo-39537967.jpeg",
    },
    {
        id: 3,
        nome: "Latte",
        descricao: "Bastante leite, um toque de café e arte na xícara.",
        preco: 11.0,
        imagem: "https://images.pexels.com/photos/16628466/pexels-photo-16628466.jpeg",
    },
    {
        id: 4,
        nome: "Café Gelado",
        descricao: "Café coado gelado servido com cubos de gelo, vindos da Noruega.",
        preco: 10.5,
        imagem: "https://images.pexels.com/photos/18142624/pexels-photo-18142624.jpeg",
    },
    {
        id: 5,
        nome: "Mocha",
        descricao: "Espresso com chocolate e leite vaporizado.",
        preco: 13.5,
        imagem: "https://images.pexels.com/photos/20066366/pexels-photo-20066366.jpeg",
    },
    {
        id: 6,
        nome: "Café Coado",
        descricao: "O clássico passado no filtro, suave e aromático.",
        preco: 7.0,
        imagem: "https://images.pexels.com/photos/36643347/pexels-photo-36643347.jpeg",
    },
    {
        id: 7,
        nome: "Suco de Caju",
        descricao: "Caju colhido na hora, no quintal da loja.",
        preco: 25.0,
        imagem: "https://images.pexels.com/photos/15141036/pexels-photo-15141036.jpeg",
    },
    {
        id: 8,
        nome: "Suco de Manga",
        descricao: "Suco feito com mangas selecionadas a dedo do chão do vizinho.",
        preco: 35.0,
        imagem: "https://images.pexels.com/photos/4955264/pexels-photo-4955264.jpeg",
    },
];

// VARIÁVEIS DO SISTEMA
let carrinho = [];
let produtoSelecionado = null;
let quantidade = 1;

// ELEMENTOS DO HTML
const listaProdutos = document.getElementById("lista-produtos");
const itensCarrinho = document.querySelector("#carrinho .offcanvas-body ul");
const contador = document.getElementById("contador");
const total = document.getElementById("total");
const avisoStorage = document.getElementById("aviso-storage");

const modalImagem = document.getElementById("modal-imagem");
const modalNome = document.getElementById("modal-nome");
const modalDescricao = document.getElementById("modal-descricao");
const modalPreco = document.getElementById("modal-preco");
const modalQtd = document.getElementById("modal-qtd");

const btnAdicionar = document.getElementById("btn-adicionar");
const btnRemover =
    document.getElementById("btn-remover") ||
    document.querySelector("#modalProduto .modal-footer .btn-outline-danger");

const modal = new bootstrap.Modal(
    document.getElementById("modalProduto")
);

// FORMATAR PREÇOS
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// MOSTRAR PRODUTOS NA TELA
function renderizarProdutos() {
    listaProdutos.innerHTML = "";

    produtos.forEach((produto) => {
        listaProdutos.innerHTML += `
            <div class="col-6 col-md-4 col-lg-3">
                <div class="card card-cafe h-100" onclick="abrirModal(${produto.id})">
                

                    <img
                        class="card-img-top"
                        src="${produto.imagem}"
                        alt="${produto.descricao}"
                    >

                    <div class="card-body">
                        <h5 class="card-title">${produto.nome}</h5>

                        <p class="card-text text-muted small">
                            ${produto.descricao}
                        </p>

                        <div class="d-flex justify-content-between align-items-center">
                            <span class="preco">
                                ${formatarPreco(produto.preco)}
                            </span>

                            <button class="btn-add" type="button">+</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

// ABRIR MODAL DO PRODUTO
function abrirModal(id) {
    produtoSelecionado = produtos.find((produto) => produto.id === id);

    if (!produtoSelecionado) return;

    quantidade = 1;

    modalImagem.src = produtoSelecionado.imagem;
    modalImagem.alt = produtoSelecionado.nome;
    modalNome.textContent = produtoSelecionado.nome;
    modalDescricao.textContent = produtoSelecionado.descricao;
    modalPreco.textContent = formatarPreco(produtoSelecionado.preco);

    atualizarModal();

    modal.show();
}

// ATUALIZAR INFORMAÇÕES DO MODAL
function atualizarModal() {
    modalQtd.textContent = quantidade;

    const subtotal = produtoSelecionado.preco * quantidade;

    btnAdicionar.textContent = `Adicionar ${formatarPreco(subtotal)}`;
}

// AUMENTAR QUANTIDADE NO MODAL
document.getElementById("btn-mais").addEventListener("click", () => {
    quantidade++;
    atualizarModal();
});

// DIMINUIR QUANTIDADE NO MODAL
document.getElementById("btn-menos").addEventListener("click", () => {
    if (quantidade > 1) {
        quantidade--;
        atualizarModal();
    }
});

// ADICIONAR PRODUTO AO CARRINHO
btnAdicionar.addEventListener("click", () => {
    if (!produtoSelecionado) return;

    adicionarAoCarrinho(produtoSelecionado, quantidade);

    modal.hide();
});

// REMOVER PRODUTO DO CARRINHO PELO MODAL
btnRemover.addEventListener("click", () => {
    if (!produtoSelecionado) return;

    removerDoCarrinho(produtoSelecionado.id);

    modal.hide();
});

// FUNÇÃO PARA ADICIONAR PRODUTO
function adicionarAoCarrinho(produto, qtd) {
    const item = carrinho.find((item) => item.id === produto.id);

    if (item) {
        item.quantidade += qtd;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade: qtd
        });
    }

    atualizarCarrinho();
}

// ALTERAR QUANTIDADE DO PRODUTO NO CARRINHO
function alterarQuantidade(id, valor) {
    const item = carrinho.find((item) => item.id === id);

    if (!item) return;

    item.quantidade += valor;

    if (item.quantidade <= 0) {
        removerDoCarrinho(id);
    } else {
        atualizarCarrinho();
    }
}

// REMOVER PRODUTO DO CARRINHO
function removerDoCarrinho(id) {
    carrinho = carrinho.filter((item) => item.id !== id);

    atualizarCarrinho();
}

// MOSTRAR ITENS DO CARRINHO
function renderizarCarrinho() {
    itensCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
        itensCarrinho.innerHTML = `
            <li class="text-center text-muted mt-5">
                Seu carrinho está vazio.
            </li>
        `;
    }

    carrinho.forEach((item) => {
        itensCarrinho.innerHTML += `
            <li class="item-carrinho">

                <img src="${item.imagem}" alt="${item.nome}">

                <div class="flex-grow-1">
                    <strong>${item.nome}</strong>

                    <div class="text-muted small">
                        ${formatarPreco(item.preco)}
                    </div>
                </div>

                <div class="quantidade">
                    <button
                        class="btn-qtd"
                        onclick="alterarQuantidade(${item.id}, -1)"
                    >-</button>

                    <span>${item.quantidade}</span>

                    <button
                        class="btn-qtd"
                        onclick="alterarQuantidade(${item.id}, 1)"
                    >+</button>
                </div>

                <button
                    class="btn btn-sm text-danger"
                    onclick="removerDoCarrinho(${item.id})"
                >
                    <i class="bi bi-trash"></i>
                </button>

            </li>
        `;
    });

    // CALCULAR VALOR TOTAL
    const valorTotal = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );

    // CALCULAR QUANTIDADE DE ITENS
    const totalItens = carrinho.reduce(
        (soma, item) => soma + item.quantidade,
        0
    );

    total.textContent = formatarPreco(valorTotal);
    contador.textContent = totalItens;
}

// ATUALIZAR CARRINHO
function atualizarCarrinho() {
    renderizarCarrinho();
    salvarCarrinho();
}

// LIMPAR CARRINHO
document.getElementById("btn-limpar").addEventListener("click", () => {
    carrinho = [];
    atualizarCarrinho();
});

// FINALIZAR PEDIDO
document.getElementById("btn-finalizar").addEventListener("click", () => {
    if (carrinho.length === 0) {
        alert("Adicione algum produto antes de finalizar!");
        return;
    }

    alert("Pedido realizado com sucesso!");

    carrinho = [];
    atualizarCarrinho();
});

// SALVAR CARRINHO NO NAVEGADOR
function salvarCarrinho() {
    if (SALVAR_NO_NAVEGADOR) {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }
}

// CARREGAR CARRINHO SALVO
function carregarCarrinho() {
    if (SALVAR_NO_NAVEGADOR) {
        try {
            const dados = localStorage.getItem("carrinho");

            if (dados) {
                carrinho = JSON.parse(dados);
            }

        } catch (erro) {
            console.error("Erro ao carregar o carrinho:", erro);
            carrinho = [];
        }

        avisoStorage.textContent = "Salvando no navegador";

    } else {
        avisoStorage.textContent = "Sem salvar: o carrinho some ao recarregar";
    }
}

carregarCarrinho();
renderizarProdutos();
renderizarCarrinho();