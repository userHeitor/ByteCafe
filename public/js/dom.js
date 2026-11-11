import { totalItens } from './carrinho.js';

const root = document.getElementById('root');

export function criar(tag, propriedades = {}) {
  return Object.assign(document.createElement(tag), propriedades);
}

export function icone(nome, classes = '') {
  return criar('i', { className: `bi bi-${nome} ${classes}` });
}

export function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function renderLayout(titulo, subtitulo = '') {
  root.replaceChildren();
  document.body.className = 'bg-body-tertiary';

  const nav = criar('nav', { className: 'navbar navbar-dark bg-dark sticky-top shadow-sm mb-4' });
  const container = criar('div', { className: 'container' });

  const logo = criar('a', { className: 'navbar-brand fw-bold', href: 'index.html' });
  logo.append(icone('cup-hot-fill', 'text-warning me-2'), 'ByteCafé');

  const carrinho = criar('a', { className: 'btn btn-warning position-relative', href: 'carrinho.html', title: 'Carrinho' });
  carrinho.append(
    icone('cart3'),
    criar('span', {
      id: 'contador',
      className: 'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger',
      textContent: totalItens(),
    })
  );
  container.append(logo, carrinho);
  nav.append(container);

  const main = criar('main', { className: 'container mb-5' });
  const cabecalho = criar('div', { className: 'mb-4' });
  cabecalho.append(
    criar('h1', { className: 'h3 mb-1', textContent: titulo }),
    criar('p', { className: 'text-body-secondary mb-0', textContent: subtitulo })
  );
  main.append(cabecalho);

  const rodape = criar('footer', {
    className: 'text-center text-body-secondary small py-4 border-top',
    textContent: `© ${new Date().getFullYear()} ByteCafé · Cafés de todo o mundo`,
  });

  root.append(nav, main, rodape);
  return main;
}

export function atualizarContador() {
  document.getElementById('contador').textContent = totalItens();
}

export function mensagem(tipo, texto) {
  return criar('div', { className: `alert alert-${tipo}`, textContent: texto });
}

export function linkLoja(texto = 'Voltar para a loja') {
  return criar('a', { className: 'btn btn-outline-dark', href: 'index.html', textContent: texto });
}
