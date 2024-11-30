import { NextFunction } from "express";
import { Request, Response } from "express";
//import { getListararchivosByLoginId } from "../services/listararchivo";
import { getListararchivosByConsultorioId } from "../services/archivo";

export const validaInformacionRepetida = async(req: Request, res: Response, next:NextFunction) =>{
    try{
        // const { busqueda,fecha,opcion,LoginId } = req.body;
        // console.log('el body',req.body);
        const {fecha_hora_ingreso, tipo_archivo, archivo , id_consultorio} = req.body;
        console.log('El body',req.body);
        
        //const archivosExistentes = await getListararchivosByLoginId(res, LoginId) 
        const archivosExistentes = await getListararchivosByConsultorioId(res, id_consultorio) 
          
        //!SI FUNCIONA 
        // if(archivosExistentes.some(archivo => archivo.busqueda === busqueda)) {
        //   return res.status(404).json({
        //     message: 'Informacion Repetida en el Try'
        //   });
        // }
        //!
        next();
    }catch(error){
        res.status(404).json({
        message: 'Informacion Repetida en el Catch'
        });
    }
}