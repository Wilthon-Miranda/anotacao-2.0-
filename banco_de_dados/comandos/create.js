const { DatabaseSync } = require('node:sqlite');
const database = new DatabaseSync('./database.db');

const create = () =>(
    database.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
    id TEXT PRIMARY KEY,
    nome TEXT,
    usuario TEXT UNIQUE,
    senha TEXT,
    sexo TEXT
    );
    CREATE TABLE IF NOT EXISTS anotacao (
        id_anotacao INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario TEXT,
        titulo TEXT,
        texto TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
    );
    CREATE TRIGGER IF NOT EXISTS atualiza_updated_at
    AFTER UPDATE ON anotacao
    FOR EACH ROW
    BEGIN
        UPDATE anotacao
        SET updated_at = STRFTIME('%Y-%m-%d %H:%M:%S', 'now', 'localtime')
        WHERE rowid = NEW.rowid;
    END;
    `
))

module.exports = create;