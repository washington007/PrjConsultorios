import {Sequelize} from "sequelize";

const sequelize = new Sequelize('consultoriojuridico','wpilco','uY7FcmI106',{
    host: '192.168.10.66',
    dialect: 'postgres',
    port: 5432,
});
export default sequelize;