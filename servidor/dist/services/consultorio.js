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
exports.vicularUsuarioBD = exports.getListarConsultorioByLoginId = exports.getConsultorio = void 0;
const consultorio_1 = __importDefault(require("../models/consultorio"));
//!TODO
const getConsultorio = (req, res, id_consultorio, activo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const consultorio = yield consultorio_1.default.findOne({ where: { id_consultorio } });
        return consultorio;
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el registro', error });
    }
});
exports.getConsultorio = getConsultorio;
//!Esta parte ya no se implementa el LoginId
const getListarConsultorioByLoginId = (res, req, LoginId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('LoginId', LoginId);
        const consultorios = yield consultorio_1.default.findAll({ where: { LoginId } });
        //@ts-ignore
        return consultorios;
    }
    catch (error) {
        if (res)
            res.status(500).json({ message: 'Error al obtener los registros', error });
        return [];
    }
});
exports.getListarConsultorioByLoginId = getListarConsultorioByLoginId;
const vicularUsuarioBD = (res, id_consultorio) => __awaiter(void 0, void 0, void 0, function* () {
    // export const vicularUsuarioBD = async (res: Response, LoginId:string, idconsultorios:string) => {
    const consultorios = yield consultorio_1.default.findByPk(id_consultorio);
    if (!consultorios) {
        return res.status(404).json({ message: 'Consultorio no encontrado' });
    }
    yield consultorios.update({});
    //await consultorios.update({LoginId})
    res.status(200).json(consultorios);
});
exports.vicularUsuarioBD = vicularUsuarioBD;
