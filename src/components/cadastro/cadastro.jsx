import React, { useState } from 'react';
import './cadastro.css'
import { cadastrarUsuario } from '../../services/usuarioService';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [sexo, setSexo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const cadastro = { nome, usuario, senha, sexo }
        // Aqui você pode adicionar a lógica para enviar os dados
        cadastrarUsuario(cadastro)
            .then(() => {
                alert("Cadastro Realizado")
                window.location.pathname = `/index/login`
                return;
            }
            )
            .catch((error) => console.log("Erro ao cadastrar usuario:", error))
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
            <h2>Cadastro</h2>
            <div className='login-input'></div>
            <div>
                <label>Nome:</label>
                <input
                    type="text"
                    name="nome"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Usuário:</label>
                <input
                    type="text"
                    name="usuario"
                    value={usuario}
                    onChange={e => setUsuario(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Senha:</label>
                <input
                    type="password"
                    name="senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Sexo:</label>
                <select
                    name="sexo"
                    value={sexo}
                    onChange={e => setSexo(e.target.value)}
                    required
                >
                    <option value="">Selecione</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                </select>
            </div>
            <button type="submit">Cadastrar</button>
        </form>
    );
};

export default Cadastro;
