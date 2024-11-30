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
exports.deleteLogin = exports.updateLogin = exports.getLoginByCorreo = exports.getLogins = exports.createLogin = void 0;
const login_1 = __importDefault(require("../models/login"));
//TODO
//export const createLogin = async (correo: string ,hashedPassword: string ,nombre: string, apellido:string, activo:boolean) => {
const createLogin = (req, res, correo, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const { correo, clave, nombre, apellido, activo } = req.body;
        yield login_1.default.create({ correo, clave: hashedPassword, nombre, apellido, activo });
        //await Login.create({ correo, clave: hashedPassword });
        console.log('Usuario Creado');
    }
    catch (error) {
        console.log('Error al Crear Usuario', error);
    }
});
exports.createLogin = createLogin;
const getLogins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logins = yield login_1.default.findAll();
        res.status(200).json(logins);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los logins', error });
    }
});
exports.getLogins = getLogins;
//TODO
const getLoginByCorreo = (correo, activo, res) => __awaiter(void 0, void 0, void 0, function* () {
    // export const getLoginByCorreo = async (correo: string, res: Response) => {
    try {
        const login = yield login_1.default.findOne({ where: { correo } });
        //const login = await Login.findOne({where: {correo}});
        //! 
        const whereClause = { correo };
        if (activo !== null) {
            whereClause.activo = activo;
        }
        //!
        return login;
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el login', error });
    }
});
exports.getLoginByCorreo = getLoginByCorreo;
const updateLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { correo, clave } = req.body;
        const login = yield login_1.default.findByPk(id);
        if (!login) {
            return res.status(404).json({ message: 'Login no encontrado' });
        }
        yield login.update({
            correo,
            clave
        });
        res.status(200).json(login);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el login', error });
    }
});
exports.updateLogin = updateLogin;
const deleteLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const login = yield login_1.default.findByPk(id);
        if (!login) {
            return res.status(404).json({ message: 'Login no encontrado' });
        }
        yield login.destroy();
        res.status(200).json({ message: 'Login eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el login', error });
    }
});
exports.deleteLogin = deleteLogin;
