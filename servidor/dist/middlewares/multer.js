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
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs = require('fs');
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        //!TODO
        storage;
        //limits: {fileSize: 2 * 1024 * 1024},
        // fileFilter: (req, file, cb) =>{
        //     const filetypes = /xlsx|xls/;
        //     const mimetype = filetypes.test(file.mimetype);
        // }
        const { busqueda } = req.body;
        const subCarpeta = path_1.default.join(path_1.default.join(__dirname, '../../public/uploads'), busqueda);
        fs.mkdirSync(subCarpeta, { recursive: true });
        cb(null, subCarpeta);
    },
    filename: (req, file, cb) => __awaiter(void 0, void 0, void 0, function* () {
        const { busqueda, nombres, fecha, opcion, LoginId } = req.body;
        console.log('multerLoginId', LoginId);
        //const filename = `${busqueda.originalname}_${fecha.originalname}_${opcion.originalname}.xlsx`;
        const filename = `${busqueda}_${fecha}_${opcion}_${LoginId}.xlsm`;
        console.log('Mensaje', filename, file);
        //const filename = `${busqueda}_${nombres.replace(/"/g,'')}_${fecha}_${opcion}_${file.originalname.replace(/"/g,'')}`
        cb(null, filename);
    })
});
exports.upload = (0, multer_1.default)({ storage });
