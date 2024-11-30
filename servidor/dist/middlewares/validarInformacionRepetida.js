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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validaInformacionRepetida = void 0;
//import { getListararchivosByLoginId } from "../services/listararchivo";
const archivo_1 = require("../services/archivo");
const validaInformacionRepetida = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { busqueda,fecha,opcion,LoginId } = req.body;
        // console.log('el body',req.body);
        const { fecha_hora_ingreso, tipo_archivo, archivo, id_consultorio } = req.body;
        console.log('El body', req.body);
        //const archivosExistentes = await getListararchivosByLoginId(res, LoginId) 
        const archivosExistentes = yield (0, archivo_1.getListararchivosByConsultorioId)(res, id_consultorio);
        //!SI FUNCIONA 
        // if(archivosExistentes.some(archivo => archivo.busqueda === busqueda)) {
        //   return res.status(404).json({
        //     message: 'Informacion Repetida en el Try'
        //   });
        // }
        //!
        next();
    }
    catch (error) {
        res.status(404).json({
            message: 'Informacion Repetida en el Catch'
        });
    }
});
exports.validaInformacionRepetida = validaInformacionRepetida;
