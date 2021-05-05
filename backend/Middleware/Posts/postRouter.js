import express from 'express';
import db from './postQuery.js';
import multer from 'multer';
import multerConfig from '../../Config/multer.js';

const router = express.Router();

router.get('/', async (req, res) => {

    const posts = await db.listPost();
    res.send(posts);
});

router.post('/', multer(multerConfig).single('file'), async (req, res)=>{
    const {titulo_post, conteudo_post, peso, idade} = req.body;
    const imagem = req.file.path;
    const user_id = global.loginData.users[0].id_usuario;

    await db.createPost(titulo_post, conteudo_post, peso, idade, imagem, user_id);
    res.send("Postagem realizada com sucesso!!");
})

export default router;