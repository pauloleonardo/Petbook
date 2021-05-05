import database from '../../Database/connection.js';

async function listPost(){
    const conn = await database.connect();
    const [rows] = await conn.query("select * from tbl_postagem where status_post = 'A'");
    return rows
}
async function createPost(titulo_post, conteudo_post, peso, idade, imagem, user_id){
    const conn = await database.connect();
    const sql = "insert into tbl_postagem (titulo_post, conteudo_post, peso, idade, imagem, fk_id_usuario) values (?,?,?,?,?,?)";
    const dataPost = [titulo_post, conteudo_post, peso, idade, imagem, user_id];

    await conn.query(sql, dataPost);

}

export default {listPost, createPost};