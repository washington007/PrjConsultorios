"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Login_1 = require("../controllers/Login");
const router = (0, express_1.Router)();
router.post('/', Login_1.createUser);
router.post('/login', Login_1.loginUser);
router.get('/getLoginId/:correo', Login_1.getLoginId);
exports.default = router;
