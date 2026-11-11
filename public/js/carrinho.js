const CHAVE = 'carrinho';

export function lerCarrinho() {
  return JSON.parse(localStorage.getItem(CHAVE)) || [];
}

function salvarCarrinho(itens) {
  localStorage.setItem(CHAVE, JSON.stringify(itens));
}

export function adicionarItem(cafe) {
  const itens = lerCarrinho();
  const item = itens.find((i) => i.id === cafe.id);

  if (item) {
    item.quantidade++;
  } else {
    itens.push({ id: cafe.id, title: cafe.title, price: cafe.price, quantidade: 1 });
  }
  salvarCarrinho(itens);
}

export function removerItem(id) {
  const itens = lerCarrinho();
  const item = itens.find((i) => i.id === id);
  if (!item) return;

  item.quantidade--;
  salvarCarrinho(itens.filter((i) => i.quantidade > 0));
}

export function totalItens() {
  return lerCarrinho().reduce((soma, item) => soma + item.quantidade, 0);
}

export function valorTotal() {
  return lerCarrinho().reduce((soma, item) => soma + item.price * item.quantidade, 0);
}

export function limparCarrinho() {
  localStorage.removeItem(CHAVE);
}
