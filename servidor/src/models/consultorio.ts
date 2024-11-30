import { DataTypes, ModelDefined, Optional } from 'sequelize';
import sequelize from '../db/connection';

export interface IConsultorioAttributes{
  id: number
  codigo:string
  nombre: string 
  activo: boolean
  id_consultorio?: string
}

interface IConsultorioCreationAttributes extends Optional <IConsultorioAttributes, 'id'> {}
// const Consultorio: ModelDefined<IConsultorioAttributes, IConsultorioCreationAttributes> = sequelize.define('Consultorio', {
const Consultorio = sequelize.define('Consultorio', {

  id_consultorio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  codigo: {
    type: DataTypes.STRING,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
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
  tableName: 'consultorio',
  timestamps: true
});

export default Consultorio;
