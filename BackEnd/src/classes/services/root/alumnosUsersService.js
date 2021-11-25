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
var alumnoUser_1 = require("../../models_mongoose/alumnoUser");
var mongoose = require("mongoose");
var AlumnosUsersService = /** @class */ (function () {
    function AlumnosUsersService() {
        this._router = (0, express_1.Router)();
        this._router.get('/', this.getAll);
        this._router.post('/one/', this.getOne);
        this._router.post('/', this.create);
        this._router.put('/', this.update);
        this._router.delete('/:id', this.delete);
    }
    AlumnosUsersService.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, alumnoUser_1.default.find().populate('aprobadas reprobadas nocursadas')];
                    case 1:
                        users = _a.sent();
                        res.json(users);
                        return [2 /*return*/];
                }
            });
        });
    };
    AlumnosUsersService.prototype.getOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var login, query, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        login = req.body;
                        return [4 /*yield*/, alumnoUser_1.default.findOne({ boleta: login.user, contra: login.pass }).populate('aprobadas reprobadas nocursadas')];
                    case 1:
                        query = _a.sent();
                        user = query === null || query === void 0 ? void 0 : query.toObject();
                        query === null || query === void 0 ? void 0 : query.toObject().periodoReprobadas.forEach(function (periodo) {
                            user.reprobadas.forEach(function (ua) {
                                if (periodo.id === ua._id.toString()) {
                                    ua.periodo = periodo.periodo;
                                }
                            });
                        });
                        res.json(user);
                        return [2 /*return*/];
                }
            });
        });
    };
    AlumnosUsersService.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var aprobadas, reprobadas, periodoReprobadas, nocursadas, alumnoReceived, newAlumno;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        aprobadas = new Array();
                        reprobadas = new Array();
                        periodoReprobadas = new Array();
                        nocursadas = new Array();
                        alumnoReceived = req.body.newUser;
                        alumnoReceived.aprobadas.forEach(function (uaAprobada) {
                            aprobadas.push(new mongoose.Types.ObjectId(uaAprobada._id));
                        });
                        alumnoReceived.reprobadas.forEach(function (uaReprobada) {
                            reprobadas.push(new mongoose.Types.ObjectId(uaReprobada._id));
                            periodoReprobadas.push({ id: uaReprobada._id, periodo: uaReprobada.periodo });
                        });
                        alumnoReceived.nocursadas.forEach(function (uaNoCursada) {
                            nocursadas.push(new mongoose.Types.ObjectId(uaNoCursada._id));
                        });
                        return [4 /*yield*/, new alumnoUser_1.default({
                                _id: new mongoose.Types.ObjectId(),
                                boleta: alumnoReceived.boleta,
                                contra: alumnoReceived.contra,
                                licenciatura: alumnoReceived.licenciatura,
                                aprobadas: aprobadas,
                                reprobadas: reprobadas,
                                nocursadas: nocursadas,
                                ss: alumnoReceived.ss,
                                electivas: alumnoReceived.electivas,
                                periodoReprobadas: periodoReprobadas,
                            })];
                    case 1:
                        newAlumno = _a.sent();
                        newAlumno.save();
                        res.send((newAlumno) ? true : false);
                        return [2 /*return*/];
                }
            });
        });
    };
    AlumnosUsersService.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var aprobadas, reprobadas, periodoReprobadas, nocursadas, userToEdit, newAlumno;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        aprobadas = new Array();
                        reprobadas = new Array();
                        periodoReprobadas = new Array();
                        nocursadas = new Array();
                        userToEdit = req.body.userToEdit;
                        userToEdit.aprobadas.forEach(function (uaAprobada) {
                            aprobadas.push(new mongoose.Types.ObjectId(uaAprobada._id));
                        });
                        userToEdit.reprobadas.forEach(function (uaReprobada) {
                            reprobadas.push(new mongoose.Types.ObjectId(uaReprobada._id));
                            periodoReprobadas.push({ id: uaReprobada._id, periodo: uaReprobada.periodo });
                        });
                        userToEdit.nocursadas.forEach(function (uaNoCursada) {
                            nocursadas.push(new mongoose.Types.ObjectId(uaNoCursada._id));
                        });
                        return [4 /*yield*/, alumnoUser_1.default.findByIdAndUpdate(userToEdit._id, { $set: {
                                    boleta: userToEdit.boleta,
                                    contra: userToEdit.contra,
                                    licenciatura: userToEdit.licenciatura,
                                    aprobadas: aprobadas,
                                    reprobadas: reprobadas,
                                    nocursadas: nocursadas,
                                    ss: userToEdit.ss,
                                    electivas: userToEdit.electivas,
                                    periodoReprobadas: periodoReprobadas,
                                }
                            })];
                    case 1:
                        newAlumno = _a.sent();
                        res.send((newAlumno) ? true : false);
                        return [2 /*return*/];
                }
            });
        });
    };
    AlumnosUsersService.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var deleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, alumnoUser_1.default.findByIdAndDelete(req.params.id)];
                    case 1:
                        deleted = _a.sent();
                        res.send((deleted) ? true : false);
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(AlumnosUsersService.prototype, "router", {
        /* Setters y Getters */
        get: function () {
            return this._router;
        },
        enumerable: false,
        configurable: true
    });
    return AlumnosUsersService;
}());
var alumnosUsersService = new AlumnosUsersService();
exports.default = alumnosUsersService.router;
