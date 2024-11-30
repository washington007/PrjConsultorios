import { Router } from 'express';
import { getConsultorioBusqueda, vincularUsuario } from '../controllers/consultorio';

const router = Router();
router.get('/:id_login', getConsultorioBusqueda);
router.patch('/vincular', vincularUsuario);
export default router;