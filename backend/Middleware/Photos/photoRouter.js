import express, { response } from 'express';

const router = express.Router();

router.get("/", async (req, res)=>{
    
    const total = req.query.total || 0;
    const user = req.query.user || 0;
    const page = req.query.page || 0;

    const images = await db.listPhoto(total, user, page);

    if(images.length < 1){
        return res.send("Conteudo não encontrado para parametros informado");
    }

    return res.send(images);

});


export default router;