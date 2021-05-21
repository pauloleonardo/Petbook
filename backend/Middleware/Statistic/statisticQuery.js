import database from "../../Database/connection.js";

async function listPostPerUser(idUserAuth){
    const conn = await database.connect();

    const sql = "SELECT * FROM tbl_postagem WHERE fk_id_usuario = ? AND status_post = 'A'";
    const [rows] = await conn.query(sql, idUserAuth);

    return rows;
}
export default {listPostPerUser};