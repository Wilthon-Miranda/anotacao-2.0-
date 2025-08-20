import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './anotacoes.css'
import { buscarAnotacoes, cadastrarAnotacao, atualizarAnotacao, deletarNota } from '../../services/anotacoesService';

const Anotacoes = () => {
    const [titulo, setTitulo] = useState();
    const [texto, setTexto] = useState();
    const [anotacoes, setAnotacoes] = useState([]);
    const [tituloAnotacoes, setTituloAnotacoes] = useState({});
    const [textoAnotacoes, setTextoAnotacoes] = useState({});
    const [horario, setHorario] = useState();
    const id_usuario  = useParams().id_usuario;
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));

    useEffect(() => {
        console.log(`Usuario conectado: ${id_usuario}`) 
        buscarAnotacoes(id_usuario)
            .then(setAnotacoes)
            .catch((error) => console.log("Erro ao buscar anotações:", error));

        const time = setInterval(() => {
            setHorario(new Date().toLocaleTimeString())
        }, 1000)
        return () => clearInterval(time);
    }, []);

    const cadastrar = () => {
       
        if (!titulo || !texto) {
            alert("Preencha o título e o texto antes de cadastrar.");
            return;
        }
        let anotacao = {
            id_usuario: id_usuario,
            titulo: titulo,
            texto: texto
        }
        console.log("titulo: " + anotacao.titulo + "  \n texto: " + anotacao.texto)
        setTitulo('')
        setTexto('')
        cadastrarAnotacao(anotacao)
            .then(() => {
                buscarAnotacoes(id_usuario)
                    .then(setAnotacoes,
                        alert("Anotacao salva com sucesso")
                    )
                    .catch((error) => console.log("Erro ao buscar anotações:", error));
            })
            .catch((error) => {
                console.log("Erro ao cadastrar ou buscar anotações:", error);
            });
    }

    const salvar = (anotacao) => {
        const tituloFinal = tituloAnotacoes[anotacao.id_anotacao] ?? anotacao.titulo;
        const textoFinal = textoAnotacoes[anotacao.id_anotacao] ?? anotacao.texto;

        if (!tituloFinal || !textoFinal) {
            alert("Preencha o título e o texto antes de cadastrar.");
            return;
        }
        let anotacaoAtualizada = {
            id_anotacao: anotacao.id_anotacao,
            titulo: tituloFinal,
            texto: textoFinal
        };
        atualizarAnotacao(anotacaoAtualizada)
            .then(() => {
                buscarAnotacoes(id_usuario)
                    .then((dados) => {
                        setAnotacoes(dados);
                        alert("Anotação atualizada com sucesso");
                    })
                    .catch((error) => console.log("Erro ao buscar anotações:", error));
            })
            .catch((error) => {
                console.log("Erro ao atualizar anotacoes:", error);
            });
    }

    const deletar = (anotacao) => {
        deletarNota(anotacao)
            .then(() => {
                buscarAnotacoes(id_usuario)
                    .then((dados) => {
                        setAnotacoes(dados);
                        alert("Anotação deletada com sucesso");
                    })
                    .catch((error) => console.log("Erro ao buscar anotações:", error));
            })
            .catch((error) => {
                console.log("Erro ao deletar anotacoes:", error);
            });
    }

    return (
        <>
            <h1>Ola seja bem vindo, <b>{usuario.nome}</b></h1>
            <h1>{horario}</h1>
            <div className="principal">
                <div className="anotacao">
                    <textarea className='titulo' value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="TITULO"></textarea>
                    <textarea className='texto' value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="TEXTO"></textarea>
                    <button onClick={cadastrar}>CADASTRAR</button>
                </div>

                {anotacoes.length > 0 &&
                    [...anotacoes].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                    .map((anotacao) => (
                        <div className="anotacao" key={anotacao.id_anotacao}>
                            <textarea className='titulo'
                                value={tituloAnotacoes[anotacao.id_anotacao] ?? anotacao.titulo}
                                onChange={e => setTituloAnotacoes({
                                    ...tituloAnotacoes,
                                    [anotacao.id_anotacao]: e.target.value
                                })}
                            ></textarea>

                            <textarea className='texto'
                                value={textoAnotacoes[anotacao.id_anotacao] ?? anotacao.texto}
                                onChange={(e) => setTextoAnotacoes({
                                    ...textoAnotacoes,
                                    [anotacao.id_anotacao]: e.target.value
                                })}
                            ></textarea>
                            <div style={{ display: 'flex' }}>
                                <button style={{ flex: ' 70%' }} onClick={() => salvar(anotacao)}>SALVAR</button>
                                <button style={{ flex: ' 20%' }} onClick={() => deletar(anotacao)}>🗑️</button>
                            </div>

                        </div>
                    ))}
            </div>
        </>
    )
}

export default Anotacoes;