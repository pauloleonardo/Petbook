import express from 'express';
import db from './loginQuery.js';
import nodemailer from 'nodemailer';
import smtp from '../../Config/smtp.js';

const router = express.Router();

const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: false,
    auth:{
        user: smtp.user,
        pass: smtp.pass,
    },
    tls: {
        rejectUnauthorized: false,
        
    },
});

async function sendEmail(email, newPassword){
    /*const mail = */
    await transporter.sendMail({
        text: `Você solicitou recuperação de senha para o site: PETBOOK.COM.
        Sua nova senha é: ${newPassword}`,
        subject:`Redefinição de senha PETBOOK`,
        from: "Suporte Petbook <aula.teste.90@gmail.com>",
        to: `${email}`,
    });
    //console.log(mail);
}



router.post('/', async (req, res) => {

    const {email} = req.body;

    const user = await db.checkEmail(email);

    
    if(user.length > 0){
        const key = (Math.random()+1).toString(36).substring(2).substring(0,10);
        const newPassword = key.replace('n','@').replace('w', '!').replace('i','#').replace('t','$').replace('a','*').replace('r','%');
        await db.changePassword(email, newPassword);
        await sendEmail(email, newPassword);

        res.send("Usuario Encontrado");
    }else {
        res.send("Usuario nao encontrado");
    }
});
export default router;