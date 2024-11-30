"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const consultorio_1 = __importDefault(require("./consultorio"));
//const Usuario: ModelDefined<ILoginAttributes, ILoginCreationAttributes> = sequelize.define('Usuario', {
const Usuario = connection_1.default.define('Usuario', {
    id_login: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    clave: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    rol: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    id_consultorio: {
        type: sequelize_1.DataTypes.STRING,
        references: {
            model: 'consultorio',
            key: 'id_consultorio'
        }
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    tableName: 'usuario',
    timestamps: true,
});
//Relaciones
//Usuario.hasOne(Consultorio, {foreignKey:'LoginId'});
Usuario.belongsTo(consultorio_1.default, { foreignKey: 'id_consultorio' });
exports.default = Usuario;
