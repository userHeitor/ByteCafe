import { lerCarrinho, valorTotal, limparCarrinho } from './carrinho.js';
import { criar, icone, formatarPreco, renderLayout, mensagem, linkLoja } from './dom.js';

const main = renderLayout('Finalização da Compra');
const itens = lerCarrinho();

if (itens.length === 0) {
  main.append(mensagem('info', 'Seu carrinho está vazio.'), linkLoja());
} else {
  const linha = criar('div', { className: 'row g-4' });
  linha.append(renderFormulario(), renderResumo());
  main.append(linha);
}

function renderResumo() {
  const lista = criar('ul', { className: 'list-group list-group-flush' });

  itens.forEach((item) => {
    const linha = criar('li', { className: 'list-group-item d-flex justify-content-between' });
    linha.append(
      criar('span', { textContent: `${item.quantidade}x ${item.title}` }),
      criar('span', { textContent: formatarPreco(item.price * item.quantidade) })
    );
    lista.append(linha);
  });

  const total = criar('li', { className: 'list-group-item d-flex justify-content-between fw-bold' });
  total.append(criar('span', { textContent: 'Total' }), criar('span', { textContent: formatarPreco(valorTotal()) }));
  lista.append(total);

  const card = criar('div', { className: 'card border-0 shadow-sm' });
  card.append(criar('div', { className: 'card-header fw-bold', textContent: 'Itens do pedido' }), lista);

  const coluna = criar('div', { className: 'col-lg-5' });
  coluna.append(card);
  return coluna;
}

function criarCampo(rotulo, campo, mensagemErro) {
  const grupo = criar('div', { className: 'mb-3' });
  grupo.append(
    criar('label', { className: 'form-label', htmlFor: campo.id, textContent: rotulo }),
    campo,
    criar('div', { className: 'invalid-feedback', textContent: mensagemErro })
  );
  return grupo;
}

function renderFormulario() {
  const form = criar('form', { className: 'card card-body border-0 shadow-sm', noValidate: true });

  const endereco = criar('input', {
    id: 'endereco',
    type: 'text',
    className: 'form-control',
    placeholder: 'Rua, número, bairro e cidade',
  });

  const pagamento = criar('select', { id: 'pagamento', className: 'form-select' });
  pagamento.append(criar('option', { value: '', textContent: 'Selecione...' }));
  ['Cartão de crédito', 'Cartão de débito', 'Boleto', 'PIX'].forEach((opcao) => {
    pagamento.append(criar('option', { value: opcao, textContent: opcao }));
  });

  const botao = criar('button', { type: 'submit', className: 'btn btn-success' });
  botao.append(icone('check2-circle', 'me-1'), 'Finalizar');

  form.append(
    criar('h2', { className: 'h5 mb-3', textContent: 'Dados de entrega' }),
    criarCampo('Endereço de entrega', endereco, 'Informe o endereço completo (mínimo de 10 caracteres).'),
    criarCampo('Método de pagamento', pagamento, 'Selecione um método de pagamento.'),
    botao
  );

  form.onsubmit = (evento) => {
    evento.preventDefault();

    const enderecoValido = endereco.value.trim().length >= 10;
    const pagamentoValido = pagamento.value !== '';
    endereco.classList.toggle('is-invalid', !enderecoValido);
    pagamento.classList.toggle('is-invalid', !pagamentoValido);
    if (!enderecoValido || !pagamentoValido) return;

    const total = valorTotal();
    limparCarrinho();

    const confirmacao = criar('div', { className: 'card border-0 shadow-sm text-center p-4 p-md-5' });
    confirmacao.append(
      icone('check-circle-fill', 'text-success display-4'),
      criar('p', {
        className: 'lead mt-3',
        textContent: `Obrigado pela compra! Pedido de ${formatarPreco(total)}, pago via ${pagamento.value}, será entregue em: ${endereco.value.trim()}.`,
      }),
      linkLoja()
    );
    renderLayout('Compra confirmada!').append(confirmacao);
  };

  const coluna = criar('div', { className: 'col-lg-7' });
  coluna.append(form);
  return coluna;
}
