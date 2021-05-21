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

router.put("/", (req, res)=>{

});

export default router;