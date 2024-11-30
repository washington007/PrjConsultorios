"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listararchivo_1 = require("../controllers/listararchivo");
const listararchivo_2 = require("../controllers/listararchivo");
const validarInformacionRepetida_1 = require("../middlewares/validarInformacionRepetida");
const multer_1 = require("../middlewares/multer");
const router = (0, express_1.Router)();
//!Ojo tomar en consideracion que el getListararchivosControllers se le va a colocar en la routa tomar en cuenta 
router.post('/', multer_1.upload.single('file'), validarInformacionRepetida_1.validaInformacionRepetida, listararchivo_1.getListararchivo);
router.put('/', multer_1.upload.single('file'), validarInformacionRepetida_1.validaInformacionRepetida, listararchivo_2.listararchivoUpdate);
//router.get('/getArchivos/:LoginId', getListararchivosControllers);
exports.default = router;
