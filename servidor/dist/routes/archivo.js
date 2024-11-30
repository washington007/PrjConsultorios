"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const archivo_1 = require("../controllers/archivo");
const archivo_2 = require("../controllers/archivo");
const validarInformacionRepetida_1 = require("../middlewares/validarInformacionRepetida");
const multer_1 = require("../middlewares/multer");
const router = (0, express_1.Router)();
//!Ojo tomar en consideracion que el getListararchivosControllers se le va a colocar en la ruta tomar en cuenta 
router.post('/', multer_1.upload.single('file'), validarInformacionRepetida_1.validaInformacionRepetida, archivo_1.getListararchivo);
router.put('/', multer_1.upload.single('file'), validarInformacionRepetida_1.validaInformacionRepetida, archivo_2.listararchivoUpdate);
//router.get('/getArchivos/:LoginId', getListararchivosControllers);
exports.default = router;
