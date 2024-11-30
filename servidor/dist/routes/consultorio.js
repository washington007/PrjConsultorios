"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const consultorio_1 = require("../controllers/consultorio");
const router = (0, express_1.Router)();
router.get('/:id_login', consultorio_1.getConsultorioBusqueda);
router.patch('/vincular', consultorio_1.vincularUsuario);
exports.default = router;
