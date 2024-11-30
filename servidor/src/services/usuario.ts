import { Request, Response } from 'express';
import Login from '../models/usuario'; 
import Usuario from '../models/usuario';
import Consultorio from '../models/consultorio';

//TODO
//export const createLogin = async (correo: string ,hashedPassword: string ,nombre: string, apellido:string, activo:boolean) => {
export const createLogin = async (req: Request, res: Response, correo: string, hashedPassword: string) => {
  console.log(req.body);
  
  try{
    const{correo, clave, nombre, apellido, activo,rol} = req.body;
    await Login.create({correo, clave:hashedPassword, nombre, apellido, activo,rol});
    //await Login.create({ correo, clave: hashedPassword });
    console.log('Usuario Creado');
  } catch (error) {
    console.log('Error al Crear Usuario',error);
  }
};

export const getLogins = async (req: Request, res: Response) => {
  try{
    const logins = await Login.findAll();
    res.status(200).json(logins);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los logins', error });
  }
};

export const getLoginByCorreo = async (correo: string, estado:boolean ,res: Response) => {
  try {
    const usuario = await Login.findOne({where: {correo}});
    return usuario
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el login', error });
  }
};


export const getConsultorioDb = async (id_login: string,res: Response) => {
  try {
    const usuario = await Usuario.findByPk(id_login,{include:{model:Consultorio,as: 'Consultorio'}});
    console.log('usuario encontrado es :',usuario);
    
    if(!usuario) {
      res.status(400).json({ message: 'Usuario no Encontrado', id_login });
    }else{
      //@ts-ignore
      return usuario.Consultorio
    }
    
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el login', error });
  }
};

export const updateLogin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { correo, clave } = req.body;
    const login = await Login.findByPk(id);

    if (!login) {
      return res.status(404).json({ message: 'Login no encontrado' });
    }

    await login.update({
        correo,
        clave
    })

    res.status(200).json(login);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el login', error });
  }
};

export const deleteLogin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const login = await Login.findByPk(id);
    if (!login) {
      return res.status(404).json({ message: 'Login no encontrado' });
    }
    await login.destroy();
    res.status(200).json({ message: 'Login eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el login', error });
  }
};

export const vicularConsultorioBD = async (res: Response, id_consultorio:string, id_login:string) => {
    const usuarios = await  Usuario.findByPk(id_login);
    if(!usuarios){
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await usuarios.update({id_consultorio})
    res.status(200).json(usuarios);
  }
