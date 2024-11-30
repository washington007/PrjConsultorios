import { Router } from 'express';
import { loginUser,createUser, getLoginId, vincularConsultorio, getConsultorio} from '../controllers/usuario';

const router = Router();
router.post('/', createUser);
router.post('/login',loginUser);
router.get('/getLoginId/:correo',getLoginId);
router.get('/getConsultorio/:id_login',getConsultorio);
router.patch('/vincular', vincularConsultorio);

export default router;