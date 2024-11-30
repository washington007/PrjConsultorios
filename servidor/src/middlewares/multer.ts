import multer from  'multer';
import path from 'path';
import { getListararchivosByConsultorioId } from '../services/archivo';
import { log } from 'console';
const fs = require ('fs')

const storage = multer.diskStorage({

    destination: (req, file, cb ) =>{
        //!TODO
        storage
        //limits: {fileSize: 2 * 1024 * 1024},
        // fileFilter: (req, file, cb) =>{
        //     const filetypes = /xlsx|xls/;
        //     const mimetype = filetypes.test(file.mimetype);
        // }

        const{busqueda} = req.body;
        const subCarpeta = path.join(path.join(__dirname,'../../public/uploads'),busqueda)
        fs.mkdirSync(subCarpeta,{recursive:true})
        cb(null,subCarpeta);
    },
    
    filename: async (req, file, cb) =>{
        const{busqueda, nombres, fecha, opcion, LoginId} = req.body;
        
        console.log('multerLoginId',LoginId);
        //const filename = `${busqueda.originalname}_${fecha.originalname}_${opcion.originalname}.xlsx`;
        const filename = `${busqueda}_${fecha}_${opcion}_${LoginId}.xlsm`
        console.log('Mensaje',filename,file);
        
        //const filename = `${busqueda}_${nombres.replace(/"/g,'')}_${fecha}_${opcion}_${file.originalname.replace(/"/g,'')}`
        cb(null,filename);
    }
});

export const upload=multer({storage});
