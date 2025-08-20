/////////////////////////////////////////////////////////////////////////////////////////////////
//FAZ GET NO BANCO DE DADOS
export const buscarAnotacoes = async (id_usuario) => {
  const response = await fetch(`http://localhost:3000/anotacoes/${id_usuario}`);
  if (!response.ok) throw new Error('Erro ao buscar anotações');
  console.log("Busca dos dados das notas concluido")
  return response.json();
};

/////////////////////////////////////////////////////////////////////////////////////////////////
//FAZ POST NO BANCO DE DADOS
export const cadastrarAnotacao = async (anotacao) => {
  const response = await fetch('http://localhost:3000/anotacoes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_usuario: anotacao.id_usuario, //temporario
      titulo: anotacao.titulo,
      texto: anotacao.texto
    })
  });
  if (!response.ok) throw new Error('Erro ao cadastrar anotação');
  console.log("FUNCAO cadastrarAnotacao EXECUTADA!");
};

/////////////////////////////////////////////////////////////////////////////////////////////////
//FAZ PUT NO BANCO DE DADOS
export const atualizarAnotacao = async (anotacao) => {
  const response = await fetch(`http://localhost:3000/anotacoes/${anotacao.id_anotacao}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      titulo: anotacao.titulo,
      texto: anotacao.texto
    })
  });
  if (!response.ok) throw new Error('Erro ao cadastrar anotação');
   console.log("FUNCAO atualizarAnotacao EXECUTADA!");
};

/////////////////////////////////////////////////////////////////////////////////////////////////
//FAZ DELETE NO BANCO DE DADOS
export const deletarNota = async (anotacao) => {
  const response = await fetch(`http://localhost:3000/anotacoes/${anotacao.id_anotacao}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Erro ao excluir nota');
  console.log("FUNCAO deletarNota EXECUTADA!");
}