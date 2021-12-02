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
const ua_1 = __importDefault(require("../../models_mongoose/ua"));
class EServiceReq {
    constructor() {
        this._router = express_1.Router();
        this._router.get('/', this.getAll);
        this._router.post('/', this.create);
        this._router.put('/', this.update);
        this._router.delete('/:id', this.delete);
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let SSTemplate;
            yield ua_1.default.findOne({ licenciatura: -1 }, (err, _ua) => {
                if (err) {
                    res.send('Error');
                }
                else {
                    SSTemplate = _ua;
                }
            });
            res.send(SSTemplate.requisitos);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newReq = { req: req.body.req };
            let SSTemplate;
            yield ua_1.default.findOne({ licenciatura: -1 }, (err, _ua) => {
                if (err) {
                    res.send('Error');
                }
                else {
                    SSTemplate = _ua;
                }
            });
            const reqsModificados = SSTemplate.requisitos;
            reqsModificados.push(newReq);
            const update = yield ua_1.default.findOneAndUpdate({ licenciatura: -1 }, { $set: { requisitos: reqsModificados } });
            const updateMany = yield ua_1.default.updateMany({ periodo: 'electiva' }, { requisitos: reqsModificados });
            res.send((update) ? true : false);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const editedReq = req.body.req;
            let SSTemplate;
            yield ua_1.default.findOne({ licenciatura: -1 }, (err, _ua) => {
                if (err) {
                    res.send('Error');
                }
                else {
                    SSTemplate = _ua;
                }
            });
            const reqs = SSTemplate.requisitos;
            reqs.forEach((requirement) => {
                (JSON.stringify(requirement._id) === JSON.stringify(editedReq._id)) ?
                    requirement.req = editedReq.req : console.log(false);
            });
            const update = yield ua_1.default.findOneAndUpdate({ licenciatura: -1 }, { $set: { requisitos: reqs } });
            const updateMany = yield ua_1.default.updateMany({ periodo: 'electiva' }, { requisitos: reqs });
            res.send((update) ? true : false);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idToDelete = JSON.stringify(req.params.id);
            let SSTemplate;
            yield ua_1.default.findOne({ licenciatura: -1 }, (err, _ua) => {
                if (err) {
                    res.send('Error');
                }
                else {
                    SSTemplate = _ua;
                }
            });
            const reqs = SSTemplate.requisitos;
            const index = reqs.findIndex((req) => JSON.stringify(req._id) === idToDelete);
            reqs.splice(index, 1);
            const update = yield ua_1.default.findOneAndUpdate({ licenciatura: -1 }, { $set: { requisitos: reqs } });
            const updateMany = yield ua_1.default.updateMany({ periodo: 'electiva' }, { requisitos: reqs });
            res.send((update) ? true : false);
        });
    }
    /* Setters y Getters */
    get router() {
        return this._router;
    }
}
const eServiceReq = new EServiceReq();
exports.default = eServiceReq.router;
