import database from '../../Database/connection.js';

async function createComment(comment, id_post, idUserAuth) {
    const conn = await database.connect();
    const sql = "INSERT INTO tbl_comentario (comentario, fk_id_post, fk_id_user) VALUES (?,?,?)";
    const dataComment = [comment, id_post, idUserAuth];
    await conn.query(sql, dataComment);
}

async function listComments() {
    const conn = await database.connect();
    const [rows] = await conn.query("SELECT * FROM tbl_comentario WHERE status_comment = 'A'");
    return rows;
}

async function listSpecificComments(id_post) {
    const conn = await database.connect();
    const sql = "SELECT * FROM tbl_comentario WHERE status_comment = 'A' AND FK_id_post = ?";
    const [rows] = await conn.query(sql, id_post);
    return rows;
}

export default {createComment, listComments, listSpecificComments};