import {Request, Response} from 'express';
import Consultorio, { IConsultorioAttributes } from '../models/consultorio';

//!TODO
export const getConsultorio = async (req: Request, res: Response, id_consultorio:number, activo: boolean) => {
  try {
    const {id} = req.params;
    const consultorio = await Consultorio.findOne({where: {id_consultorio}});
    
    return consultorio
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el registro', error });
  }
}

//!Esta parte ya no se implementa el LoginId
export const getListarConsultorioByLoginId = async (res:Response | undefined, req:Request, LoginId:number):Promise<IConsultorioAttributes[]> => {
  try{
    console.log('LoginId', LoginId);
    
    const consultorios = await  Consultorio.findAll({where: {LoginId}});
    //@ts-ignore
    return consultorios as IConsultorioAttributes;
  }catch(error){
    if(res) res.status(500).json({ message: 'Error al obtener los registros', error });
      return[]
    }
};

export const vicularUsuarioBD = async (res: Response, id_consultorio:string) => {
// export const vicularUsuarioBD = async (res: Response, LoginId:string, idconsultorios:string) => {
  const consultorios = await  Consultorio.findByPk(id_consultorio);
  if(!consultorios){
    return res.status(404).json({ message: 'Consultorio no encontrado' });
  }
  await consultorios.update({})
  //await consultorios.update({LoginId})
  res.status(200).json(consultorios);
}