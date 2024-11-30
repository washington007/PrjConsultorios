"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../controllers/usuario");
const router = (0, express_1.Router)();
router.post('/', usuario_1.createUser);
router.post('/login', usuario_1.loginUser);
router.get('/getLoginId/:correo', usuario_1.getLoginId);
router.get('/getConsultorio/:id_login', usuario_1.getConsultorio);
router.patch('/vincular', usuario_1.vincularConsultorio);
exports.default = router;
