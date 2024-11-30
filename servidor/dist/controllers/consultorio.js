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
exports.vincularUsuario = exports.getConsultorioBusqueda = void 0;
const consultorio_1 = require("../services/consultorio");
const getConsultorioBusqueda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_consultorio } = req.params;
    const activo = req.body.activo === req.body;
    const consultorio = yield (0, consultorio_1.getConsultorio)(req, res, Number(id_consultorio), activo);
    if (!consultorio) {
        return res.status(400).json({
            msg: `No existe consultorio: ${id_consultorio}, Revisa Nuevamente`
        });
    }
    res.status(200).json({ consultorio });
});
exports.getConsultorioBusqueda = getConsultorioBusqueda;
//!CAMBIOS
const vincularUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_consultorio } = req.body;
    //const {LoginId,idconsultorios} = req.body;
    if (!id_consultorio) {
        //if(!LoginId || !idconsultorio){
        return res.status(400).json({
            msg: `No existe consultorio ${id_consultorio}`
            //msg: `No existe LoginId: ${LoginId} y no existe consultorio ${idconsultorios}`
        });
    }
    //await vicularUsuarioBD(res, LoginId, idconsultorios);
    yield (0, consultorio_1.vicularUsuarioBD)(res, id_consultorio);
});
exports.vincularUsuario = vincularUsuario;
