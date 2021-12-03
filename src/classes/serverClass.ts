import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { Application } from 'express';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

import peService from './services/peService';
import ssServiceDescription from './services/ss/ssServiceDescription';
import ssServiceFechas from './services/ss/ssServiceFechas';
import ssServiceReq from './services/ss/ssServiceReq';
import eServiceDescription from './services/electivas//eServiceDescription';
import eServiceFechas from './services/electivas/eServiceFechas';
import eServiceReq from './services/electivas/eServiceReq';
import adminsUsersService from './services/root/adminsUsersService';
import alumnosUsersService from './services/root/alumnosUsersService';
import loginService from './services/loginService';
import trayectoriaService from './services/alumno/calculoTrayectoriaService'

class Server {
    private _app: Application;
    private _puerto: number;

    constructor(){
        this._app = express();
        this._puerto = 3000;
        this.config();
        this.routes();
    }

    private config(): void{

        const MongoURL = 'mongodb://localhost:27017/ttp1';
        mongoose.set('useFindAndModify', true);
        mongoose.connect(MongoURL,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }); 

        this._app.use(morgan('dev'));
        this._app.use(express.json());
        this._app.use(express.urlencoded({extended: false}));
        this._app.use(helmet());
        this._app.use(compression());
        this._app.use(cors());
    }

    private routes(): void{
        this._app.use('/login', loginService);
        //------------------------------------------Plan de estudios
        this._app.use('/pe',peService);
        //------------------------------------------Servicio social
        //Descripción
        this._app.use('/ss/d', ssServiceDescription);
        //Fechas
        this._app.use('/ss/f', ssServiceFechas);
        //Requisitos
        this._app.use('/ss/r', ssServiceReq);
        //------------------------------------------Electivas
        //Descripción
        this._app.use('/e/d', eServiceDescription);
        //Fechas
        this._app.use('/e/f', eServiceFechas);
        //Requisitos
        this._app.use('/e/r', eServiceReq);
        //------------------------------------------Admins
        this._app.use('/admins',adminsUsersService);
        //------------------------------------------Alumnos
        this._app.use('/alumnos',alumnosUsersService);
        this._app.use('/tr',trayectoriaService.router);

    }

    public start(): void{
        this._app.listen(this._puerto);
    }
}
const server = new Server();
export default server;