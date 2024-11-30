import { Router } from 'express';
import { getListararchivo} from '../controllers/archivo';
import { listararchivoUpdate } from '../controllers/archivo';
import { validaInformacionRepetida } from '../middlewares/validarInformacionRepetida';
import { upload } from '../middlewares/multer';

const router = Router();
//!Ojo tomar en consideracion que el getListararchivosControllers se le va a colocar en la ruta tomar en cuenta 
router.post('/', upload.single('file') ,validaInformacionRepetida,getListararchivo);
router.put('/', upload.single('file'),validaInformacionRepetida,listararchivoUpdate);
//router.get('/getArchivos/:LoginId', getListararchivosControllers);

export default router; 