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
exports.vincularConsultorio = exports.getConsultorio = exports.getLoginId = exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = require("../services/usuario");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, correo, clave, estado, rol } = req.body;
    const login = yield (0, usuario_1.getLoginByCorreo)(correo, estado, res);
    if (login) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${correo}`
        });
    }
    const hashedPassword = yield bcrypt_1.default.hash(clave, 10);
    console.log(hashedPassword);
    try {
        yield (0, usuario_1.createLogin)(req, res, correo, hashedPassword);
        res.json({
            msg: 'Nuevo Usuario'
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error',
            error
        });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, correo, clave, estado, rol } = req.body;
    //Validamos si el usuario existe en la base de datos 
    const login = yield (0, usuario_1.getLoginByCorreo)(correo, estado, res);
    if (!login) {
        return res.status(400).json({
            msg: `No existe vuelve a intentar!`
        });
    }
    //Validamos password
    const passwordValid = yield bcrypt_1.default.compare(clave, login.getDataValue('clave'));
    if (!passwordValid) {
        return res.status(400).json({
            msg: `Contraseña Incorrecta!`
        });
    }
    //Generamos token
    const token = jsonwebtoken_1.default.sign({
        correo: correo
    }, process.env.SECRET_KEY || 'cisco');
    res.json({ token, LoginId: login.getDataValue('id_login') });
});
exports.loginUser = loginUser;
const getLoginId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo } = req.params;
    const { estado } = req.query;
    const login = yield (0, usuario_1.getLoginByCorreo)(correo, estado == 'true', res);
    return res.status(200).json({
        loginId: login === null || login === void 0 ? void 0 : login.getDataValue('id_login')
    });
});
exports.getLoginId = getLoginId;
const getConsultorio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_login } = req.params;
    const consultorio = yield (0, usuario_1.getConsultorioDb)(id_login, res);
    console.log('El consultorio encontrado es:', consultorio);
    return res.status(200).json({
        consultorio: consultorio
    });
});
exports.getConsultorio = getConsultorio;
const vincularConsultorio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_consultorio, id_login } = req.body;
    if (!id_login || !id_consultorio) {
        return res.status(400).json({
            msg: `No existe consultorio ${id_consultorio}`
        });
    }
    yield (0, usuario_1.vicularConsultorioBD)(res, id_consultorio, id_login);
});
exports.vincularConsultorio = vincularConsultorio;
