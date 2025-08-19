const { randomUUID } = require('crypto');
const { DatabaseSync } = require('node:sqlite');
const database = new DatabaseSync('./database.db');

function login(fastify) {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //BUSCA USUARIOS//////////////////////////////////////////////////////////////////////////////////////////////////////
    fastify.get('/usuarios', async (request, reply) => {
        try {
            const usuarios = database.prepare(`
                SELECT * 
                FROM usuarios`).all();
            return usuarios;
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return reply.status(500).send({ error: 'Erro ao buscar usuários.' });
        }
    });

    fastify.get('/usuarios/:usuario', async (request, reply) => {
        try {
            const { usuario } = request.params;
            const usuarios = database.prepare(`SELECT * FROM usuarios u where u.usuario = ? `).all(usuario);
            return usuarios;
        } catch (error) {
            console.error('Erro ao buscar usuário por usuario:', error);
            return reply.status(500).send({ error: 'Erro ao buscar usuário por usuario.' });
        }
    })
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //CRIA USUARIOS///////////////////////////////////////////////////////////////////////////////////////////////////////
    fastify.post('/usuarios', async (request, reply) => {
        try {
            const id = randomUUID();
            console.log(id);
            const { nome, usuario, senha, sexo } = request.body;
            database.prepare(`
                INSERT INTO usuarios
                (id, nome, usuario, senha, sexo)
                VALUES(?, ?, ?, ?, ?);`).run(id, nome, usuario, senha, sexo);
            return reply.status(201).send({ message: 'Usuário criado com sucesso!' });
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return reply.status(500).send({ error: 'Erro ao criar usuário.' });
        }
    })
}

module.exports = login;