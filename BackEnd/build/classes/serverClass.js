"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const peService_1 = __importDefault(require("./services/peService"));
const ssServiceDescription_1 = __importDefault(require("./services/ss/ssServiceDescription"));
const ssServiceFechas_1 = __importDefault(require("./services/ss/ssServiceFechas"));
const ssServiceReq_1 = __importDefault(require("./services/ss/ssServiceReq"));
const eServiceDescription_1 = __importDefault(require("./services/electivas//eServiceDescription"));
const eServiceFechas_1 = __importDefault(require("./services/electivas/eServiceFechas"));
const eServiceReq_1 = __importDefault(require("./services/electivas/eServiceReq"));
const adminsUsersService_1 = __importDefault(require("./services/root/adminsUsersService"));
const alumnosUsersService_1 = __importDefault(require("./services/root/alumnosUsersService"));
const loginService_1 = __importDefault(require("./services/loginService"));
const calculoTrayectoriaService_1 = __importDefault(require("./services/alumno/calculoTrayectoriaService"));
class Server {
    constructor() {
        this._app = express_1.default();
        this._puerto = 3000;
        this.config();
        this.routes();
    }
    config() {
        const MongoURL = 'mongodb://localhost:27017/ttp1';
        mongoose_1.default.set('useFindAndModify', true);
        mongoose_1.default.connect(MongoURL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        this._app.use(morgan_1.default('dev'));
        this._app.use(express_1.default.json());
        this._app.use(express_1.default.urlencoded({ extended: false }));
        this._app.use(helmet_1.default());
        this._app.use(compression_1.default());
        this._app.use(cors_1.default());
    }
    routes() {
        this._app.use('/login', loginService_1.default);
        //------------------------------------------Plan de estudios
        this._app.use('/pe', peService_1.default);
        //------------------------------------------Servicio social
        //Descripción
        this._app.use('/ss/d', ssServiceDescription_1.default);
        //Fechas
        this._app.use('/ss/f', ssServiceFechas_1.default);
        //Requisitos
        this._app.use('/ss/r', ssServiceReq_1.default);
        //------------------------------------------Electivas
        //Descripción
        this._app.use('/e/d', eServiceDescription_1.default);
        //Fechas
        this._app.use('/e/f', eServiceFechas_1.default);
        //Requisitos
        this._app.use('/e/r', eServiceReq_1.default);
        //------------------------------------------Admins
        this._app.use('/admins', adminsUsersService_1.default);
        //------------------------------------------Alumnos
        this._app.use('/alumnos', alumnosUsersService_1.default);
        this._app.use('/tr', calculoTrayectoriaService_1.default.router);
    }
    start() {
        this._app.listen(this._puerto);
    }
}
const server = new Server();
exports.default = server;
