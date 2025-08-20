import React, { useState } from 'react';
import './login.css'
import { buscarUsuario } from '../../services/usuarioService';

function Login() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        buscarUsuario(usuario)
            .then((dados) => {
                if (!dados[0]) {
                    alert("Usuario ou senha incorreto")
                }
                else if (senha == dados[0].senha) {
                    alert("Login realizado com sucesso")
                    sessionStorage.setItem("usuario", JSON.stringify(dados[0]));
                    window.location.pathname = `/index/anotacoes/${dados[0].id}`;
                    return;
                }
                else {
                    alert("Usuario ou senha incorreto")
                }
            })
            .catch((error) => console.log("Erro ao buscar usuarios:", error));
    };

    return (
        <>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className='form-login'>
                    <div className="login-field">
                        <label>Login:</label>
                        <input
                            type="text"
                            value={usuario}
                            onChange={e => setUsuario(e.target.value)}
                            required
                            className="login-input"
                        />
                    </div>
                    <div className="login-field">
                        <label>Senha:</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            required
                            className="login-input"
                        />
                    </div>
                    <button type="submit" className="login-btn">Entrar</button>
                </form>
                <a href='./cadastrar' className='cadastrar'>cadastrar-se</a>
            </div>
        </>
    );
}

export default Login;