import { DataTypes, ModelDefined, Optional } from 'sequelize';
import sequelize from '../db/connection';
import Consultorio from './consultorio';

interface ILoginAttributes {
  id: number
  nombre: string
  apellido: string
  correo: string
  clave: string
  activo: boolean
  rol: string
  id_login?: string 
}

interface ILoginCreationAttributes extends Optional<ILoginAttributes, 'id'> {}
//const Usuario: ModelDefined<ILoginAttributes, ILoginCreationAttributes> = sequelize.define('Usuario', {
const Usuario = sequelize.define('Usuario', {

  id_login: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  clave: {
    type: DataTypes.STRING,
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_consultorio: {
    type: DataTypes.INTEGER,
    references: {
      model: 'consultorio',
      key:'id_consultorio'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'usuario',
  timestamps: true,
});

//Relaciones
//Usuario.hasOne(Consultorio, {foreignKey:'LoginId'});
Usuario.belongsTo(Consultorio, { foreignKey: 'id_consultorio' });
 
export default Usuario;
