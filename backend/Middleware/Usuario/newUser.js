import express from "express";
import db from "./usuarioQuery.js"

const router = express.Router();

router.post("/", async (req, res) => {
    //const email = req.body.email;
   // const user_name = req.body.user_name;
   // const password_user = req.body.password_user;

    const {email, user_name, password_user} = req.body;

    const users = await db.listUser();
    const checkUser = users.some(item => {
        return item.email === email;
    });

    if(!email || !user_name || !password_user){
        res.send("Dados para cadastro imcompletos");
    }else if(checkUser){
        res.send("Email de usuário já cadastrado no sistema!");
    }else{
        await db.insertUser(email, user_name, password_user);
        res.send("Usuário cadastrado com sucesso!");
    }
    
});

export default router;