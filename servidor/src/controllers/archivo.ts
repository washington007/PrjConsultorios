import { Request, Response } from "express";
import { createListararchivo, getListararchivosByConsultorioId} from "../services/archivo";
import { putListarArchivo } from "../services/archivo";
const nodeMailer = require('nodemailer');
import XLSX from 'xlsx';

export const getListararchivo = async (req: Request, res: Response) => {
    const { busqueda, nombres, fecha, opcion, correo} = req.body;
    const file = req.file
    if (!file) {
        return res.status(400).json({ msg: 'No se ha proporcionado un archivo Excell' });
    }

    // try{
    //     const data = await subidaExcelArchivo(req.file);
    //     res.status(200).json({message: 'Archivo subido y procesado exitosamente', data});
    // }catch(error){
    //     res.status(500).json ({message: 'Error al procesar el archivo Excel',error});
    // }

    //TODO ESTA PARTE AGREGE RECIEN 
    try{
        const workbook = XLSX.read(file?.buffer, {type: 'buffer' });
        const sheetName = workbook.SheetNames[0]; 
        const sheet = workbook.Sheets[sheetName]; 
        const data = XLSX.utils.sheet_to_json(sheet);

        if (data.length === 0) { 
            return res.status(400).json({ message: 'El archivo Excel está vacío.' }); 
        }
 
    } catch (error) { 
        res.status(500).json({ message: 'Error al procesar el archivo Excel.', error }); 
    }
    //TODO
    
    const transporter = nodeMailer.createTransport({
        host:'mail.defensoria.gob.ec',
        port:25,
        secure:false,
        auth:{
            user:'',
            pass:''
        }
    });
    
    const mailOptions = {
        from:'',
        to: correo,
        subject:'Correo de Prueba',
        text:`"Hemos tenido el placer de recibir información sobre lo siguiente:" \n\nBuscador: ${busqueda}\nNombres: ${nombres}\nFecha: ${fecha}\nOpción: ${opcion}`,
        attachments:[
            {
                //OJO TOMAR EN CUENTA EL ATACHMENT 
                filename: file.filename,
                path: file.path,
                contentDisposition:'attachment'
            }, 
        ]
    };

    try{
        await createListararchivo(req, res, file.path)
        await transporter.sendMail(mailOptions);
        return res.json({
        msg: `El formulario ${busqueda} ${nombres} ${fecha} ${opcion} ${file} a sido creado exitosamente`
        });
    }catch (error){
        return res.status(500).json({
            msg: 'Hubo un error al enviar la informacion',
        });
    }    
};

//AGREGE ESTA PARTE TOMAR EN CONSIDERACION 
export const listararchivoUpdate = async (req: Request, res: Response) =>{
    try{
        const { busqueda, nombres, fecha, opcion, correo, ConsultorioId } = req.body;
        
        if (!busqueda || !nombres || !fecha || !opcion || !ConsultorioId) {
            throw new Error ('Todos los campos son requeridos') 
        }
        const file = req.file;

        if(!file){
            return res.status(400).json({msg: 'No se a proporcionado un archivo de Excell'})
        }
    
        const transporter = nodeMailer.createTransport({
            host:'mail.defensoria.gob.ec',
            port:25,
            secure:false,
            auth:{
                user:'',
                pass:''
            }
        });
            
        const mailOptions = {
            from:'',
            to: correo,
            subject:'Correo de Prueba Actualizacion',
            text:`"Hemos tenido el placer de Actualizar su información:" \n\nBuscador: ${busqueda}\nNombres: ${nombres}\nFecha: ${fecha}\nOpción: ${opcion}`,
            attachments:[
                {
                    //OJO TOMAR EN CUENTA EL ATACHMENT 
                    filename: file.filename,
                    path: file.path,
                    contentDisposition:'attachment'
                }, 
            ]
        };

        try{
            const response = await putListarArchivo(req, res, file.path) as any
            if(response.message){
                return res.status(400).json({mensaje: 'Ocurrio un error al Actualizar el archivo'});  
            }
    
            await transporter.sendMail(mailOptions);
            return res.status(200).json({mensaje: 'El archivo se actualizo correctamente'});  
        }catch (error){
            return res.status(500).json({
                msg: 'Hubo un error al enviar la informacion',
            });
        }

    }catch(error){
        res.status(400).json({mensaje: 'Ocurrio un error al Actualizar el archivo'});  
    }
};