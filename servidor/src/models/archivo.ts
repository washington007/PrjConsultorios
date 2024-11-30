import { DataTypes, Optional } from 'sequelize';
import sequelize from '../db/connection';
import Consultorio from './consultorio';

export interface IListarArchivoAttributes{
  id: number
  fecha_hora_ingreso: string,
  tipo_archivo: string,
  archivo: string,
  id_archivo:string
}

interface IListarArchivoCreationAttributes extends Optional<IListarArchivoAttributes, 'id'> {}
const Archivo = sequelize.define('Archivo', {

  id_archivo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha_hora_ingreso: {
    type: DataTypes.DATE,
  },
  tipo_archivo: {
    type: DataTypes.STRING,
  },
  archivo: {
    type: DataTypes.STRING,
  },
  id_consultorio: {
    type: DataTypes.INTEGER,
    references:{
      model: 'consultorio',
      key: 'id_consultorio'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
}, {
  tableName: 'archivo',
  timestamps: true,
});

// Definir la relación con Consultorio
Archivo.belongsTo(Consultorio, { foreignKey: 'id_consultorio' });


// Exportar el modelo
export default Archivo;
