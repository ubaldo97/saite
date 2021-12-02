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
const alumnoUser_1 = __importDefault(require("../../models_mongoose/alumnoUser"));
const mongoose_1 = __importDefault(require("mongoose"));
class AlumnosUsersService {
    constructor() {
        this._router = express_1.Router();
        this._router.get('/', this.getAll);
        this._router.post('/one/', this.getOne);
        this._router.post('/', this.create);
        this._router.put('/', this.update);
        this._router.delete('/:id', this.delete);
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield alumnoUser_1.default.find().populate('aprobadas reprobadas nocursadas');
            res.json(users);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const login = req.body;
            const query = yield alumnoUser_1.default.findOne({ boleta: login.user, contra: login.pass }).populate('aprobadas reprobadas nocursadas');
            const user = query === null || query === void 0 ? void 0 : query.toObject();
            query === null || query === void 0 ? void 0 : query.toObject().periodoReprobadas.forEach((periodo) => {
                user.reprobadas.forEach((ua) => {
                    if (periodo.id === ua._id.toString()) {
                        ua.periodo = periodo.periodo;
                    }
                });
            });
            res.json(user);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aprobadas = new Array();
            const reprobadas = new Array();
            const periodoReprobadas = new Array();
            const nocursadas = new Array();
            const alumnoReceived = req.body.newUser;
            alumnoReceived.aprobadas.forEach((uaAprobada) => {
                aprobadas.push(new mongoose_1.default.Types.ObjectId(uaAprobada._id));
            });
            alumnoReceived.reprobadas.forEach((uaReprobada) => {
                reprobadas.push(new mongoose_1.default.Types.ObjectId(uaReprobada._id));
                periodoReprobadas.push({ id: uaReprobada._id, periodo: uaReprobada.periodo });
            });
            alumnoReceived.nocursadas.forEach((uaNoCursada) => {
                nocursadas.push(new mongoose_1.default.Types.ObjectId(uaNoCursada._id));
            });
            const newAlumno = yield new alumnoUser_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                boleta: alumnoReceived.boleta,
                contra: alumnoReceived.contra,
                licenciatura: alumnoReceived.licenciatura,
                aprobadas: aprobadas,
                reprobadas: reprobadas,
                nocursadas: nocursadas,
                ss: alumnoReceived.ss,
                electivas: alumnoReceived.electivas,
                periodoReprobadas: periodoReprobadas,
            });
            newAlumno.save();
            res.send((newAlumno) ? true : false);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aprobadas = new Array();
            const reprobadas = new Array();
            const periodoReprobadas = new Array();
            const nocursadas = new Array();
            const userToEdit = req.body.userToEdit;
            userToEdit.aprobadas.forEach((uaAprobada) => {
                aprobadas.push(new mongoose_1.default.Types.ObjectId(uaAprobada._id));
            });
            userToEdit.reprobadas.forEach((uaReprobada) => {
                reprobadas.push(new mongoose_1.default.Types.ObjectId(uaReprobada._id));
                periodoReprobadas.push({ id: uaReprobada._id, periodo: uaReprobada.periodo });
            });
            userToEdit.nocursadas.forEach((uaNoCursada) => {
                nocursadas.push(new mongoose_1.default.Types.ObjectId(uaNoCursada._id));
            });
            const newAlumno = yield alumnoUser_1.default.findByIdAndUpdate(userToEdit._id, { $set: {
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
            });
            res.send((newAlumno) ? true : false);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield alumnoUser_1.default.findByIdAndDelete(req.params.id);
            res.send((deleted) ? true : false);
        });
    }
    /* Setters y Getters */
    get router() {
        return this._router;
    }
}
const alumnosUsersService = new AlumnosUsersService();
exports.default = alumnosUsersService.router;
