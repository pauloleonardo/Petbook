import multer from 'multer';
import path from 'path';

const multerConfig = {
    dest: path.resolve('./Tmp/Uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, path.resolve('./Tmp/Uploads'));
        },
        filename: (req, file, cb)=>{
            const filename = `${Date.now()}-${file.originalname}`;
            cb(null, filename);
        },
        limits:{
            fileSize: 1024 * 1024 * 10,
        },
        fileFilter: (req, file, cb) =>{
            const allowTypes = [
                'image/jpeg',
                'image/png',
                'image/gif',
                'image/mp4'
            ];
            if(allowTypes.includes(file.mimetype)){
                cb(null, true);
            }else{
                cb(new Error("Tipo de arquivo enviado não permitido!"));
            }
        }
    })
}
export default multerConfig;