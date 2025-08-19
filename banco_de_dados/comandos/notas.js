const { DatabaseSync } = require(`node:sqlite`);
const database = new DatabaseSync(`./database.db`);

function notas(fastify) {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //BUSCA ANOTAÇÕES/////////////////////////////////////////////////////////////////////////////////////////////////////
    fastify.get(`/anotacoes`, async (request, reply) => {
        const anotacoes = database.prepare(`
            SELECT * FROM 
            anotacao 
            ORDER BY updated_at DESC`).all()
        return anotacoes;
    });

    fastify.get(`/anotacoes/:id_usuario`, async (request, reply) => {
        const { id_usuario } = request.params;
        const anotacoes = database.prepare(`
            SELECT * 
            FROM anotacao 
            where id_usuario = ?  
            ORDER BY updated_at DESC`).all(id_usuario)
        return anotacoes;
    });

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //ADICIONA ANOTAÇÕES//////////////////////////////////////////////////////////////////////////////////////////////////
    fastify.post(`/anotacoes`, async (request, reply) => {
        try {
            const { id_usuario, titulo, texto } = request.body;
             database.prepare(`
                insert into anotacao (id_usuario, titulo, texto) 
                values (?, ?, ?)`).run(id_usuario, titulo, texto)
            return reply.status(201).send({ message: "Nota criada com sucesso!" });
        }
        catch (error) {
            console.error("Erro ao criar anotação:", error);
            return reply.status(500).send({ error: "Erro interno ao criar anotação." });
        }
    });

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //ATUALIZA ANOTAÇÕES//////////////////////////////////////////////////////////////////////////////////////////////////
    fastify.put(`/anotacoes/:id_anotacao`, async (request, reply) => {
        const { id_anotacao } = request.params;
        try {
            const { titulo, texto } = request.body;
            database.prepare(`
                update anotacao
                set titulo = ?,
                texto = ?
                where id_anotacao = ?`).run( titulo, texto, id_anotacao)
            return reply.status(201).send({ message: "Nota atualizada com sucesso!" });
        }
        catch (error) {
            console.error("Erro ao atualizar anotação:", error);
            return reply.status(500).send({ error: "Erro interno ao atualizar anotação." });
        }
    });

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //DELETA ANOTAÇÕES////////////////////////////////////////////////////////////////////////////////////////////////////
    fastify.delete(`/anotacoes/:id_anotacao`, async (request, reply)=>{
        const { id_anotacao } = request.params;

        try{
            database.prepare(`
                DELETE FROM anotacao 
                WHERE id_anotacao = ?`).run(id_anotacao)
            return reply.status(201).send({ message: "Nota excluida com sucesso!" })
        }
        catch{
            console.error("Erro ao deletar anotação:", error);
            return reply.status(500).send({ error: "Erro interno ao deletar anotação." });
        }
    })
}


module.exports = notas;