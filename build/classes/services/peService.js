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
const mongoose_1 = __importDefault(require("mongoose"));
const ua_1 = __importDefault(require("../models_mongoose/ua"));
class PEService {
    constructor() {
        this._router = express_1.Router();
        this._router.get('/', this.getAll);
        this._router.get('/sis/', this.getSistemas);
        this._router.get('/amb/', this.getAmbiental);
        this._router.get('/mec/', this.getMecatronica);
        this._router.get('/ali/', this.getAlimentos);
        this._router.get('/met/', this.getMetalurgia);
        this._router.get('/ss/', this.getSS);
        this._router.post('/', this.create);
        this._router.put('/', this.update);
        this._router.delete('/:id', this.delete);
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uas = yield ua_1.default.find();
            res.json(uas);
        });
    }
    getSS(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ss = yield ua_1.default.findOne({ titulo: 'PlantillaSS' });
            res.json(ss);
        });
    }
    getSistemas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uas = yield ua_1.default.find({ licenciatura: 0 }).populate('dependencia');
            res.json(uas);
        });
    }
    getAmbiental(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uas = yield ua_1.default.find({ licenciatura: 1 }).populate('dependencia');
            res.json(uas);
        });
    }
    getMecatronica(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uas = yield ua_1.default.find({ licenciatura: 2 }).populate('dependencia');
            res.json(uas);
        });
    }
    getAlimentos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uas = yield ua_1.default.find({ licenciatura: 3 }).populate('dependencia');
            res.json(uas);
        });
    }
    getMetalurgia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uas = yield ua_1.default.find({ licenciatura: 4 }).populate('dependencia');
            res.json(uas);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uaReceived = req.body.newUA;
            uaReceived._id = new mongoose_1.default.Types.ObjectId();
            if (uaReceived.periodo === 'electiva') {
                let SSTemplate;
                yield ua_1.default.findOne({ licenciatura: -1 }, (err, _ua) => {
                    if (err) {
                        res.send('Error');
                    }
                    else {
                        SSTemplate = _ua;
                    }
                });
                const dependencia = SSTemplate.dependencia;
                uaReceived.descripcion = SSTemplate.descripcion;
                uaReceived.fechas = SSTemplate.fechas;
                uaReceived.requisitos = SSTemplate.requisitos;
                yield ua_1.default.findOneAndUpdate({ licenciatura: -1 }, { $set: { dependencia: dependencia } });
            }
            const newUA = new ua_1.default(uaReceived);
            newUA.save();
            res.send((newUA) ? true : false);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uaToEdit = req.body.uaToEdit;
            const edited = yield ua_1.default.findByIdAndUpdate(uaToEdit._id, uaToEdit);
            res.send((edited) ? true : false);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield ua_1.default.findByIdAndDelete(req.params.id);
            let SSTemplate;
            yield ua_1.default.findOne({ licenciatura: -1 }, (err, _ua) => {
                if (err) {
                    res.send('Error');
                }
                else {
                    SSTemplate = _ua;
                }
            });
            const dependencia = SSTemplate.dependencia;
            const finded = dependencia.find((id) => JSON.stringify(id) === JSON.stringify(req.params.id));
            if (finded) {
                dependencia.splice(dependencia.indexOf(finded), 1);
                yield ua_1.default.findOneAndUpdate({ licenciatura: -1 }, { $set: { dependencia: dependencia } });
            }
            res.send((deleted) ? true : false);
        });
    }
    /* Setters y Getters */
    get router() {
        return this._router;
    }
}
const peService = new PEService();
exports.default = peService.router;
