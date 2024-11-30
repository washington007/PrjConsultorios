"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listararchivoUpdate = exports.getListararchivo = void 0;
const listararchivo_1 = require("../services/listararchivo");
const listararchivo_2 = require("../services/listararchivo");
const nodeMailer = require('nodemailer');
//Agrege el import del escell para que lea tomar en consideracion 
const xlsx_1 = __importDefault(require("xlsx"));
//import excel4node  from 'excel4node';
const getListararchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { busqueda, nombres, fecha, opcion, correo } = req.body;
    const file = req.file;
    if (!file) {
        return res.status(400).json({ msg: 'No se ha proporcionado un archivo Excell' });
    }
    listararchivo_1.getListararchivosByConsultorioId;
    // try{
    //     const data = await subidaExcelArchivo(req.file);
    //     res.status(200).json({message: 'Archivo subido y procesado exitosamente', data});
    // }catch(error){
    //     res.status(500).json ({message: 'Error al procesar el archivo Excel',error});
    // }
    //TODO ESTA PARTE AGREGE RECIEN 
    try {
        const workbook = xlsx_1.default.read(file === null || file === void 0 ? void 0 : file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx_1.default.utils.sheet_to_json(sheet);
        if (data.length === 0) {
            return res.status(400).json({ message: 'El archivo Excel está vacío.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al procesar el archivo Excel.', error });
    }
    //TODO
    const transporter = nodeMailer.createTransport({
        host: 'mail.defensoria.gob.ec',
        port: 25,
        secure: false,
        auth: {
            user: '',
            pass: ''
        }
    });
    const mailOptions = {
        from: '',
        to: correo,
        subject: 'Correo de Prueba',
        text: `"Hemos tenido el placer de recibir información sobre lo siguiente:" \n\nBuscador: ${busqueda}\nNombres: ${nombres}\nFecha: ${fecha}\nOpción: ${opcion}`,
        attachments: [
            {
                //OJO TOMAR EN CUENTA EL ATACHMENT 
                filename: file.filename,
                path: file.path,
                contentDisposition: 'attachment'
            },
        ]
    };
    try {
        yield (0, listararchivo_1.createListararchivo)(req, res, file.path);
        yield transporter.sendMail(mailOptions);
        return res.json({
            msg: `El formulario ${busqueda} ${nombres} ${fecha} ${opcion} ${file} a sido creado exitosamente`
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Hubo un error al enviar la informacion',
        });
    }
});
exports.getListararchivo = getListararchivo;
//AGREGE ESTA PARTE TOMAR EN CONSIDERACION 
const listararchivoUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { busqueda, nombres, fecha, opcion, correo, ConsultorioId } = req.body;
        if (!busqueda || !nombres || !fecha || !opcion || !ConsultorioId) {
            throw new Error('Todos los campos son requeridos');
        }
        const file = req.file;
        if (!file) {
            return res.status(400).json({ msg: 'No se a proporcionado un archivo de Excell' });
        }
        const transporter = nodeMailer.createTransport({
            host: 'mail.defensoria.gob.ec',
            port: 25,
            secure: false,
            auth: {
                user: '',
                pass: ''
            }
        });
        const mailOptions = {
            from: '',
            to: correo,
            subject: 'Correo de Prueba Actualizacion',
            text: `"Hemos tenido el placer de Actualizar su información:" \n\nBuscador: ${busqueda}\nNombres: ${nombres}\nFecha: ${fecha}\nOpción: ${opcion}`,
            attachments: [
                {
                    //OJO TOMAR EN CUENTA EL ATACHMENT 
                    filename: file.filename,
                    path: file.path,
                    contentDisposition: 'attachment'
                },
            ]
        };
        try {
            const response = yield (0, listararchivo_2.putListarArchivo)(req, res, file.path);
            if (response.message) {
                return res.status(400).json({ mensaje: 'Ocurrio un error al Actualizar el archivo' });
            }
            yield transporter.sendMail(mailOptions);
            return res.status(200).json({ mensaje: 'El archivo se actualizo correctamente' });
        }
        catch (error) {
            return res.status(500).json({
                msg: 'Hubo un error al enviar la informacion',
            });
        }
    }
    catch (error) {
        res.status(400).json({ mensaje: 'Ocurrio un error al Actualizar el archivo' });
    }
});
exports.listararchivoUpdate = listararchivoUpdate;
