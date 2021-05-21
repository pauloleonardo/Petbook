import database from '../../Database/connection.js';

async function listPost(){
    const conn = await database.connect();
    const [rows] = await conn.query("select * from tbl_postagem where status_post = 'A'");
    return rows;
}
async function createPost(titulo_post, conteudo_post, peso, idade, imagem, user_id){
    const conn = await database.connect();
    const sql = "insert into tbl_postagem (titulo_post, conteudo_post, peso, idade, imagem, fk_id_usuario) values (?,?,?,?,?,?)";
    const dataPost = [titulo_post, conteudo_post, peso, idade, imagem, user_id];

    await conn.query(sql, dataPost);

}
async function listSpecificPost(id_post){
    const conn = await database.connect();
    const sql = "select * from tbl_postagem where status_post = 'A' AND id_post = ?";
    const [rows] = await conn.query(sql, id_post);
    return rows;
}

async function updateAccessInPost(newAccess, id_post){
    const conn = await database.connect();
    const sql = "UPDATE tbl_postagem SET acessos = ? WHERE id_post = ?";
    const dataUpdate = [newAccess, id_post];
    await conn.query(sql, dataUpdate);
}


export default {listPost, createPost, listSpecificPost, updateAccessInPost};