import database from "../../Database/connection.js";

async function listUser(){
    const conn = await database.connect();
    const [rows] = await conn.query("SELECT * FROM tbl_usuario");

    return rows;
}

async function insertUser(email, user_name, password_user){
    const conn = await database.connect();
    const sql = "INSERT INTO tbl_usuario (email, user_name, password_user) values (?,?,?)";
    const newUser = [email, user_name, password_user];
    await conn.query(sql, newUser);
}

export default { listUser, insertUser };