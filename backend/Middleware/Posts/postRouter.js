import express from 'express';
import db from './postQuery.js';
import multer from 'multer';
import multerConfig from '../../Config/multer.js';

const router = express.Router();

router.get('/', async (req, res) => {

    const posts = await db.listPost();
    res.send(posts);
});

router.get("/:id_post", async (req, res)=>{
    const {id_post} = req.params;

    const post = await db.listSpecificPost(id_post);

    if(post<1){
        res.send("Não não foram encontrando postagens!")
    }


    let newAccess = ++post[0].acessos;
    await db.updateAccessInPost(newAccess, id_post);
    res.send(post);
});

router.post('/', multer(multerConfig).single('file'), async (req, res)=>{
    
    if(!global.loginData.auth){
        return res.send("Usuário não está autenticado");
    }
        
    const {titulo_post, conteudo_post, peso, idade} = req.body;
    
    const user_id = global.loginData.users[0].id_usuario;
    let imagem = null;
    if(!!req.file){
        imagem = req.file.path;
    }

    await db.createPost(titulo_post, conteudo_post, peso, idade, imagem, user_id);
    res.send("Postagem realizada com sucesso!!");
});

router.put("/:id_post",  multer(multerConfig).single('file'), async (req, res)=>{
    if(!global.loginData.auth){
        return res.send("Usuário não está autenticado");
    }
    const {id_post} = req.params;
    const post = await db.listSpecificPost(id_post);
    const id_user = await db.getIdUser(id_post);
    
    //console.log(global.loginData.users[0].id_usuario);
    const {titulo_post, conteudo_post, peso, idade} = req.body;
    //console.log(id_user[0].fk_id_usuario);
    const imagem = null;
    if(!!req.file){
        imagem = req.file.path;
    }
    if(post<1){
        res.send(`Não foram encontradadas postagens!`);
    }else if(global.loginData.users[0].id_usuario === id_user[0].fk_id_usuario){
        await db.updatePost(titulo_post, conteudo_post, peso, idade, imagem, id_post);
        res.send("Postagem alterada com sucesso!!!");
    }else {
        res.send("Você não é o autor da postagem! Ipossível de alterar!")
    }
    
});

export default router;