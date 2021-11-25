"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var helmet = require("helmet");
var compression = require("compression");
var cors = require("cors");
var mongoose = require("mongoose");
var peService_1 = require("./services/peService");
var ssServiceDescription_1 = require("./services/ss/ssServiceDescription");
var ssServiceFechas_1 = require("./services/ss/ssServiceFechas");
var ssServiceReq_1 = require("./services/ss/ssServiceReq");
var eServiceDescription_1 = require("./services/electivas//eServiceDescription");
var eServiceFechas_1 = require("./services/electivas/eServiceFechas");
var eServiceReq_1 = require("./services/electivas/eServiceReq");
var adminsUsersService_1 = require("./services/root/adminsUsersService");
var alumnosUsersService_1 = require("./services/root/alumnosUsersService");
var loginService_1 = require("./services/loginService");
var calculoTrayectoriaService_1 = require("./services/alumno/calculoTrayectoriaService");
var Server = /** @class */ (function () {
    function Server() {
        this._app = express();
        this._puerto = 3000;
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        var MongoURL = 'mongodb://localhost:27017/ttp1';
        mongoose.set('useFindAndModify', true);
        mongoose.connect(MongoURL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        this._app.use(morgan('dev'));
        this._app.use(express.json());
        this._app.use(express.urlencoded({ extended: false }));
        this._app.use(helmet());
        this._app.use(compression());
        this._app.use(cors());
    };
    Server.prototype.routes = function () {
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
    };
    Server.prototype.start = function () {
        this._app.listen(this._puerto);
    };
    return Server;
}());
var server = new Server();
exports.default = server;
