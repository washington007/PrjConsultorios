"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('consultoriojuridico', 'wpilco', 'uY7FcmI106', {
    host: '192.168.10.66',
    dialect: 'postgres',
    port: 5432,
});
exports.default = sequelize;
