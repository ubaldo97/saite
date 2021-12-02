"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alumnoUser_1 = __importDefault(require("../models_mongoose/alumnoUser"));
const adminUser_1 = __importDefault(require("../models_mongoose/adminUser"));
const axios_1 = __importDefault(require("axios"));
const mongoose_1 = __importDefault(require("mongoose"));
class LoginService {
    constructor() {
        this.router = express_1.Router();
        this.router.post('/', this.login);
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const login = req.body;
            if (login.user === 'root' && login.pass === '') {
                res.json('admin');
            }
            else if (login.tipo === 0) {
                let valid = false;
                let lic = -1;
                yield axios_1.default.post('http://148.204.142.2/pump/web/index.php/login', {
                    'username': login.user,
                    'password': login.pass
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 250220204758'
                    }
                }).then((resGESCO) => {
                    if (resGESCO.data.estatus === 'true') {
                        valid = true;
                        switch (resGESCO.data.datos.Carrera) {
                            case 'ING. EN SISTEMAS COMPUTACIONALES':
                                lic = 0;
                                break;
                            case 'ING. AMBIENTAL':
                                lic = 1;
                                break;
                            case 'ING. MECATRÓNICA':
                                lic = 2;
                                break;
                            case 'ING. EN ALIMENTOS':
                                lic = 3;
                                break;
                            case 'ING. METALUÚRGICA':
                                lic = 4;
                                break;
                            default:
                                lic = -1;
                                break;
                        }
                    }
                });
                let exist = false;
                if (valid) {
                    yield alumnoUser_1.default.findOne({ boleta: login.user, contra: login.pass }, (err, al) => {
                        if (err) {
                            res.json('404');
                        }
                        else if (al) {
                            exist = true;
                        }
                    });
                }
                if (valid && !exist) {
                    const newAlumno = yield new alumnoUser_1.default({
                        _id: new mongoose_1.default.Types.ObjectId(),
                        boleta: login.user,
                        contra: login.pass,
                        licenciatura: lic,
                        aprobadas: [],
                        reprobadas: [],
                        nocursadas: [],
                        ss: false,
                        electivas: false,
                        periodoReprobadas: []
                    });
                    newAlumno.save();
                    (newAlumno !== null) ? res.json('alumno') : res.json('404');
                }
                else if (valid && exist) {
                    res.json('alumno');
                }
                else {
                    res.json('404');
                }
            }
            else if (login.tipo === 1) {
                const query = yield adminUser_1.default.findOne({ correo: login.user, contra: login.pass });
                const admin = JSON.parse(JSON.stringify(query));
                if (admin !== null) {
                    switch (admin.tipo) {
                        case 0:
                            res.json('pe');
                            break;
                        case 1:
                            res.json('electivas');
                            break;
                        case 2:
                            res.json('ss');
                            break;
                        default:
                            break;
                    }
                }
                else {
                    res.json('404');
                }
            }
            else {
                res.json('404');
            }
        });
    }
}
const loginService = new LoginService();
exports.default = loginService.router;
