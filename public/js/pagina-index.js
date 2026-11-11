import { buscarCafes } from './api.js';
import { adicionarItem } from './carrinho.js';
import { criar, icone, formatarPreco, renderLayout, atualizarContador, mensagem } from './dom.js';

const main = renderLayout('Nossos Cafés', 'Clássicos e receitas da casa de cafeterias do mundo todo.');

function criarCard(cafe) {
  const coluna = criar('div', { className: 'col-12 col-sm-6 col-lg-4' });
  const card = criar('div', { className: 'card h-100 border-0 shadow-sm' });

  const origem = criar('small', { className: 'text-body-secondary' });
  origem.append(icone('geo-alt', 'me-1'), cafe.origin);

  const ingredientes = criar('div', { className: 'd-flex flex-wrap gap-1' });
  cafe.ingredients.forEach((ingrediente) => {
    ingredientes.append(criar('span', { className: 'badge rounded-pill text-bg-light border fw-normal', textContent: ingrediente }));
  });

  const corpo = criar('div', { className: 'card-body' });
  corpo.append(
    origem,
    criar('h5', { className: 'card-title mt-1', textContent: cafe.title }),
    criar('p', { className: 'card-text small', textContent: cafe.description }),
    ingredientes
  );

  const botao = criar('button', {
    className: 'btn btn-dark btn-sm',
    onclick: () => {
      adicionarItem(cafe);
      atualizarContador();
    },
  });
  botao.append(icone('cart-plus', 'me-1'), 'Adicionar');

  const rodape = criar('div', { className: 'card-footer bg-transparent border-0 pb-3 d-flex justify-content-between align-items-center' });
  rodape.append(criar('span', { className: 'fs-5 fw-bold', textContent: formatarPreco(cafe.price) }), botao);

  card.append(criar('img', { className: 'card-img-top', src: cafe.image, alt: cafe.title, loading: 'lazy' }), corpo, rodape);
  coluna.append(card);
  return coluna;
}

async function iniciar() {
  try {
    const cafes = await buscarCafes();
    const lista = criar('div', { className: 'row g-4' });
    cafes.forEach((cafe) => lista.append(criarCard(cafe)));
    main.append(lista);
  } catch (erro) {
    main.append(mensagem('danger', 'Não foi possível carregar os cafés. Verifique se a API está rodando.'));
  }
}

iniciar();
