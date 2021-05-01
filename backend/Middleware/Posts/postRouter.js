import express from 'express';
import db from './postQuery.js';
import multer from 'multer';
import multerConfig from '../../Config/muter.js';

const router = express.Router();

router.get('/', async (req, res) => {

    const posts = await db.listPost();
    res.send(posts);
});

router.post('/', multer(multerConfig).single('file'), async (req, res)=>{
    const {titulo_post, conteudo_post, peso, idade, fk_id_usuario} = req.body;
    const {imagem} = req.file.path;

    
})

export default router;