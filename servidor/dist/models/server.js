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
const express_1 = __importDefault(require("express"));
const archivo_1 = __importDefault(require("../routes/archivo"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const consultorio_1 = __importDefault(require("../routes/consultorio"));
const cors_1 = __importDefault(require("cors"));
const archivo_2 = __importDefault(require("./archivo"));
const consultorio_2 = __importDefault(require("./consultorio"));
const usuario_2 = __importDefault(require("./usuario"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/archivo', archivo_1.default);
        this.app.use('/api/usuario', usuario_1.default);
        this.app.use('/api/consultorio', consultorio_1.default);
    }
    midlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)());
    }
    //No borrar esto tomar en consideracion es para sincronizar con la BD
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield consultorio_2.default.sync({ alter: true });
                yield usuario_2.default.sync({ alter: true });
                yield archivo_2.default.sync({ alter: true });
                // await Consultorio.sync({force:true})
                // await Usuario.sync({force:true})
                // await Archivo.sync({force:true})
                console.log('Conexion establecida satisfactoriamente');
            }
            catch (error) {
                console.log('No es posible conectar con la BD', error);
            }
        });
    }
}
exports.default = Server;
