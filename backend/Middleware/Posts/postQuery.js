import database from '../../Database/connection.js';

async function listPost(){
    const conn = await database.connect();
    const [rows] = await conn.query("select * from tbl_postagem where status_post = 'A'");
    return rows
}


export default {listPost};