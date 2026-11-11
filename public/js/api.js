const API_URL = 'http://localhost:3000/cafes';

export async function buscarCafes() {
  const resposta = await fetch(API_URL);
  if (!resposta.ok) throw new Error('Erro ao buscar os cafés');
  return resposta.json();
}
