/////////////////////////////////////////////////////////////////////////////////////////////////
//FAZ GET NO BANCO DE DADOS
export const buscarUsuario = async (login) => {
    const response = await fetch(`http://localhost:3000/usuarios/${login}`);
    if (!response.ok) throw new Error('Erro ao buscar usuarios');
    console.log("Busca do usuario concluida")
    return response.json();
}

/////////////////////////////////////////////////////////////////////////////////////////////////
//FAZ POST NO BANCO DE DADOS
export const cadastrarUsuario = async (cadastro) => {
    const response = await fetch(`http://localhost:3000/usuarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: cadastro.nome,
            usuario: cadastro.usuario,
            senha: cadastro.senha,
            sexo: cadastro.sexo
        })
    });
    if (!response.ok) throw new Error('Erro ao cadastrar usuario');
    console.log("FUNCAO cadastrarUsuario EXECUTADA!");
}