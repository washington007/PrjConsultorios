import { Request, Response} from 'express';
import { getConsultorio, getListarConsultorioByLoginId, vicularUsuarioBD } from '../services/consultorio';
import { INTEGER } from 'sequelize';


 export const getConsultorioBusqueda = async (req: Request, res: Response) => {
    const {id_consultorio} = req.params;
    const activo = req.body.activo === req.body;
    const consultorio = await getConsultorio(req, res, Number(id_consultorio), activo);
    
    if(!consultorio){
        return res.status(400).json({
            msg: `No existe consultorio: ${id_consultorio}, Revisa Nuevamente`
        })
    }
    res.status(200).json({consultorio});  
}

//!CAMBIOS
export const vincularUsuario = async (req: Request, res: Response) => {
    const {id_consultorio} = req.body;
    //const {LoginId,idconsultorios} = req.body;
    if(!id_consultorio){
    //if(!LoginId || !idconsultorio){
        return res.status(400).json({
            msg: `No existe consultorio ${id_consultorio}`
            //msg: `No existe LoginId: ${LoginId} y no existe consultorio ${idconsultorios}`
        })
    }
    //await vicularUsuarioBD(res, LoginId, idconsultorios);
    await vicularUsuarioBD(res,id_consultorio);
}
