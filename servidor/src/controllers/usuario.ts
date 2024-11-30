import { Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createLogin, getConsultorioDb, getLoginByCorreo, vicularConsultorioBD } from '../services/usuario';
import Consultorio from '../models/consultorio';
    
export const createUser = async (req: Request, res: Response) => {
    const { nombre, apellido,correo, clave, estado , rol} = req.body;
    const login = await getLoginByCorreo(correo, estado, res)
 
    if(login){
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${correo}`
        })
    }

    const hashedPassword = await bcrypt.hash(clave, 10);
    console.log(hashedPassword);
    try{
        await createLogin(req,res,correo, hashedPassword)
        res.json({
            msg: 'Nuevo Usuario'
         })
    }catch(error){
        res.status(500).json({
            msg:'Ocurrio un error',
            error
        })
    }    
}   

export const loginUser = async (req: Request, res: Response) => {
    const { nombre, apellido,correo, clave, estado , rol} = req.body;
    //Validamos si el usuario existe en la base de datos 
    const login = await getLoginByCorreo(correo,estado,res)
    if(!login){
        return res.status(400).json({
            msg: `No existe vuelve a intentar!`
        })
    }    
    
    //Validamos password
    const  passwordValid = await bcrypt.compare(clave, login.getDataValue('clave'))
    if(!passwordValid){
        return res.status(400).json({
            msg: `Contraseña Incorrecta!`
        })
    }
    
    //Generamos token
    const token = jwt.sign({
        correo: correo
    },process.env.SECRET_KEY || 'cisco');
    res.json({token,LoginId:login.getDataValue('id_login')});
}

export const getLoginId = async(req:Request, res: Response)=>{
    const {correo} = req.params;
    const {estado} = req.query;
    const login = await getLoginByCorreo(correo,estado == 'true',res);
    return res.status(200).json({
        loginId: login?.getDataValue('id_login')
    })
}   

export const getConsultorio = async(req:Request, res: Response)=>{
    const {id_login} = req.params;
    const consultorio = await getConsultorioDb(id_login,res);
    console.log('El consultorio encontrado es:',consultorio);
    
    return res.status(200).json({
        consultorio: consultorio
    })
}   

export const vincularConsultorio = async (req: Request, res: Response) => {
    const {id_consultorio,id_login} = req.body;
    if(!id_login || !id_consultorio){
        return res.status(400).json({
            msg: `No existe consultorio ${id_consultorio}`
        })
    }
    await vicularConsultorioBD(res,id_consultorio, id_login);
}
