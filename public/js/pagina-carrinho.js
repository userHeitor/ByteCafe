import { lerCarrinho, adicionarItem, removerItem, valorTotal } from './carrinho.js';
import { criar, icone, formatarPreco, renderLayout, mensagem, linkLoja } from './dom.js';

function botaoQuantidade(nomeIcone, titulo, acao) {
  const botao = criar('button', {
    className: 'btn btn-sm btn-outline-secondary',
    title: titulo,
    onclick: () => { acao(); renderPagina(); },
  });
  botao.append(icone(nomeIcone));
  return botao;
}

function renderPagina() {
  const main = renderLayout('Carrinho de Compras');
  const itens = lerCarrinho();

  if (itens.length === 0) {
    main.append(mensagem('info', 'Seu carrinho está vazio.'), linkLoja('Ver cafés'));
    return;
  }

  const lista = criar('ul', { className: 'list-group list-group-flush' });

  itens.forEach((item) => {
    const linha = criar('li', { className: 'list-group-item d-flex flex-wrap justify-content-between align-items-center gap-2 py-3' });

    const info = criar('div', { className: 'flex-grow-1' });
    info.append(
      criar('div', { className: 'fw-bold', textContent: item.title }),
      criar('small', { className: 'text-body-secondary', textContent: formatarPreco(item.price) + ' cada' })
    );

    const quantidade = criar('div', { className: 'd-flex align-items-center gap-2' });
    quantidade.append(
      botaoQuantidade('dash', 'Remover uma unidade', () => removerItem(item.id)),
      criar('span', { className: 'px-1', textContent: item.quantidade }),
      botaoQuantidade('plus', 'Adicionar uma unidade', () => adicionarItem(item))
    );

    const subtotal = criar('span', { className: 'fw-bold text-end', style: 'min-width: 90px', textContent: formatarPreco(item.price * item.quantidade) });

    linha.append(info, quantidade, subtotal);
    lista.append(linha);
  });

  const finalizar = criar('button', {
    className: 'btn btn-success',
    onclick: () => { window.location.href = 'finalizacao.html'; },
  });
  finalizar.append(icone('bag-check', 'me-1'), 'Finalizar Compra');

  const rodape = criar('div', { className: 'card-footer d-flex flex-wrap justify-content-between align-items-center gap-2 py-3' });
  rodape.append(criar('span', { className: 'fs-5', textContent: 'Total: ' + formatarPreco(valorTotal()) }), finalizar);

  const card = criar('div', { className: 'card border-0 shadow-sm' });
  card.append(lista, rodape);
  main.append(card);
}

renderPagina();
