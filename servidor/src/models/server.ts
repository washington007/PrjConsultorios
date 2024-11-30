import express, { Application, Request, Response } from 'express';
import routesArchivo from '../routes/archivo';
import routesUsuario from '../routes/usuario';
import routesConsultorio from '../routes/consultorio';
import cors from 'cors';
import Archivo from './archivo';
import Consultorio from './consultorio';
import Usuario from './usuario';

    
class Server{
    private app:Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';  
        this.listen();
        this.midlewares(); 
        this.routes();
        this.dbConnect();
    }
 
    listen(){
        this.app.listen(this.port, () => {
        console.log('Aplicacion corriendo en el puerto ' + this.port);
        })
    }

    routes(){
        
        this.app.use('/api/archivo',routesArchivo)
        this.app.use('/api/usuario',routesUsuario);
        this.app.use('/api/consultorio',routesConsultorio);
    }

    midlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(cors());
    }

    //No borrar esto tomar en consideracion es para sincronizar con la BD
    async dbConnect(){
        try{
            await Consultorio.sync({alter:true})
            await Usuario.sync({alter:true})
            await Archivo.sync({alter:true})

            // await Consultorio.sync({force:true})
            // await Usuario.sync({force:true})
            // await Archivo.sync({force:true})

        
            console.log('Conexion establecida satisfactoriamente');
        }catch (error){
            console.log('No es posible conectar con la BD',error)   ;
            
        }
    }
}

export default Server;

