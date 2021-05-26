import database from '../../Database/connection.js';

async function listPhoto(total, user, page){
    
    const conn = await database.connect();
    

    //let limit = page*total;
    if(total == 0 && user == 0 && page ==0){

        const sql = "SELECT * FROM tbl_postagem WHERE status_post = 'A'";
        const [rows] = await conn.query(sql);
        return rows;

    }else if(total == 0 && user != 0 && page ==0){

        const sql = `SELECT * FROM tbl_postagem WHERE status_post = 'A' AND fk_id_usuario = ?`;
        const [rows] = await conn.query(sql, user);
        return rows;

    }else if(total != 0 && user == 0 && page ==0){

        const sql = `SELECT * FROM tbl_postagem WHERE status_post = 'A' limit 0,?`;
        const [rows] = await conn.query(sql, parseInt(total));
        return rows;

    }else if(total != 0 && user == 0 && page !=0){

        const sql = `SELECT * FROM tbl_postagem WHERE status_post = 'A' limit ?,?`;
        const limit = [parseInt(page), parseInt(total)];
        const [rows] = await conn.query(sql, limit);
        return rows;

    }else if(total != 0 && user != 0 && page ==0){

        const sql = `SELECT * FROM tbl_postagem WHERE status_post = 'A' AND fk_id_usuario = ? limit 0,?`;
        const sqlDados = [parseInt(user), parseInt(total)];
        const [rows] = await conn.query(sql, sqlDados);
        return rows;

    }else if(total != 0 && user != 0 && page !=0){

        const sql = `SELECT * FROM tbl_postagem WHERE status_post = 'A' AND fk_id_usuario = ? limit ?,?`;
        const sqlDados = [parseInt(user), parseInt(page), parseInt(total)];
        const [rows] = await conn.query(sql, sqlDados);
        return rows;

    }
    
    
}

export default {listPhoto};