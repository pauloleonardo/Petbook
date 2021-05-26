import database from '../../Database/connection.js';

async function listPhoto(total, user, page){

    //let limit = page*total;
    const conn = database.connect();
    if(total == 0 && user == 0 && page ==0){
        const sql = "SELECT * FROM tbl_postagem";
    }else if(total == 0 && user != 0 && page ==0){
        const sql = `SELECT * FROM tbl_postagem where fk_id_usuario = ?`;
    }else if(total != 0 && user != 0 && page !=0){

    }
    
    
}

export default listPhoto;