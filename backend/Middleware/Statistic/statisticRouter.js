import express from 'express';
import db from "./statisticQuery.js"

const router = express.Router();
router.get("/", async (req, res)=>{
    const idUserAuth = global.loginData.users[0].id_usuario;

    const allPosts = await db.listPostPerUser(idUserAuth);
    if(allPosts < 1){
        return res.send("Nenhuma postagem retornada");
    }

    const postUser = allPosts.map(({fk_id_usuario, titulo_post, acessos}) =>{
        return {
             user_id: fk_id_usuario,
             titulo_post,
             acessos
        }
    });

    res.send(postUser);


});
export default router;