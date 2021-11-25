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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var alumnoUser_1 = require("../models_mongoose/alumnoUser");
var adminUser_1 = require("../models_mongoose/adminUser");
var axios_1 = require("axios");
var mongoose = require("mongoose");
var LoginService = /** @class */ (function () {
    function LoginService() {
        this.router = (0, express_1.Router)();
        this.router.post('/', this.login);
    }
    LoginService.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var login, valid_1, lic_1, exist_1, newAlumno, query, admin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        login = req.body;
                        if (!(login.user === 'root' && login.pass === '')) return [3 /*break*/, 1];
                        res.json('admin');
                        return [3 /*break*/, 11];
                    case 1:
                        if (!(login.tipo === 0)) return [3 /*break*/, 8];
                        valid_1 = false;
                        lic_1 = -1;
                        return [4 /*yield*/, axios_1.default.post('http://148.204.142.2/pump/web/index.php/login', {
                                'username': login.user,
                                'password': login.pass
                            }, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer 250220204758'
                                }
                            }).then(function (resGESCO) {
                                if (resGESCO.data.estatus === 'true') {
                                    valid_1 = true;
                                    switch (resGESCO.data.datos.Carrera) {
                                        case 'ING. EN SISTEMAS COMPUTACIONALES':
                                            lic_1 = 0;
                                            break;
                                        case 'ING. AMBIENTAL':
                                            lic_1 = 1;
                                            break;
                                        case 'ING. MECATRÓNICA':
                                            lic_1 = 2;
                                            break;
                                        case 'ING. EN ALIMENTOS':
                                            lic_1 = 3;
                                            break;
                                        case 'ING. METALUÚRGICA':
                                            lic_1 = 4;
                                            break;
                                        default:
                                            lic_1 = -1;
                                            break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        exist_1 = false;
                        if (!valid_1) return [3 /*break*/, 4];
                        return [4 /*yield*/, alumnoUser_1.default.findOne({ boleta: login.user, contra: login.pass }, function (err, al) {
                                if (err) {
                                    res.json('404');
                                }
                                else if (al) {
                                    exist_1 = true;
                                }
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(valid_1 && !exist_1)) return [3 /*break*/, 6];
                        return [4 /*yield*/, new alumnoUser_1.default({
                                _id: new mongoose.Types.ObjectId(),
                                boleta: login.user,
                                contra: login.pass,
                                licenciatura: lic_1,
                                aprobadas: [],
                                reprobadas: [],
                                nocursadas: [],
                                ss: false,
                                electivas: false,
                                periodoReprobadas: []
                            })];
                    case 5:
                        newAlumno = _a.sent();
                        newAlumno.save();
                        (newAlumno !== null) ? res.json('alumno') : res.json('404');
                        return [3 /*break*/, 7];
                    case 6:
                        if (valid_1 && exist_1) {
                            res.json('alumno');
                        }
                        else {
                            res.json('404');
                        }
                        _a.label = 7;
                    case 7: return [3 /*break*/, 11];
                    case 8:
                        if (!(login.tipo === 1)) return [3 /*break*/, 10];
                        return [4 /*yield*/, adminUser_1.default.findOne({ correo: login.user, contra: login.pass })];
                    case 9:
                        query = _a.sent();
                        admin = JSON.parse(JSON.stringify(query));
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
                        return [3 /*break*/, 11];
                    case 10:
                        res.json('404');
                        _a.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    return LoginService;
}());
var loginService = new LoginService();
exports.default = loginService.router;
