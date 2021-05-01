import database from '../../Database/connection.js';

async function login(email, password_user){
    const conn = await database.connect();
    const sql = "SELECT * FROM tbl_usuario where email=? and password_user=?";
    const dataLogin = [email, password_user];
    const [rows] = await conn.query(sql, dataLogin);
    return rows;
}

export default {login};