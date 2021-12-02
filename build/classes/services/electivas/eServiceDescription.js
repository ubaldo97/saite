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
class EServiceDescripcion {
    constructor() {
        this._router = express_1.Router();
        this._router.get('/', this.getDesc);
        this._router.put('/', this.updateDesc);
    }
    getDesc(req, res) {
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
            res.json(SSTemplate.descripcion);
        });
    }
    updateDesc(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield ua_1.default.findOneAndUpdate({ licenciatura: -1 }, { $set: { descripcion: req.body.desc } });
            const updateMany = yield ua_1.default.updateMany({ periodo: 'electiva' }, { descripcion: req.body.desc });
            res.send((updated) ? true : false);
        });
    }
    /* Setters y Getters */
    get router() {
        return this._router;
    }
}
const eServicedescripcion = new EServiceDescripcion();
exports.default = eServicedescripcion.router;
