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
var mongoose = require("mongoose");
var ua_1 = require("../models_mongoose/ua");
var PEService = /** @class */ (function () {
    function PEService() {
        this._router = (0, express_1.Router)();
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
    PEService.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var uas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ua_1.default.find()];
                    case 1:
                        uas = _a.sent();
                        res.json(uas);
                        return [2 /*return*/];
                }
            });
        });
    };
    PEService.prototype.getSS = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ss;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ua_1.default.findOne({ titulo: 'PlantillaSS' })];
                    case 1:
                        ss = _a.sent();
                        res.json(ss);
                        return [2 /*return*/];
                }
            });
        });
    };
    PEService.prototype.getSistemas = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var uas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ua_1.default.find({ licenciatura: 0 }).populate('dependencia')];
                    case 1:
                        uas = _a.sent();
                        res.json(uas);
                        return [2 /*return*/];
                }
            });
        });
    };
    PEService.prototype.getAmbiental = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var uas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ua_1.default.find({ licenciatura: 1 }).populate('dependencia')];
                    case 1:
                        uas = _a.sent();
                        res.json(uas);
                        return [2 /*return*/];
                }
            });
        });
    };
    PEService.prototype.getMecatronica = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var uas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ua_1.default.find({ licenciatura: 2 }).populate('dependencia')];
                    case 1:
                        uas = _a.sent();
                        res.json(uas);
                        return [2 /*return*/];
                }
            });
        });
    };
    PEService.prototype.getAlimentos = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var uas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ua_1.default.find({ licenciatura: 3 }).populate('dependencia')];
                    case 1:
                        uas = _a.sent();
                        res.json(uas);
                        return [2 /*return*/];
                }
            });
        });
    };
    PEService.prototype.getMetalurgia = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var uas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ua_1.default.find({ licenciatura: 4 }).populate('dependencia')];
                    case 1:
                        uas = _a.sent();
                        res.json(uas);
                        return [2 /*return*/];
                }
            });
        });
    };
    PEService.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var uaReceived, SSTemplate_1, dependencia, newUA;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uaReceived = req.body.newUA;
                        uaReceived._id = new mongoose.Types.ObjectId();
                        if (!(uaReceived.periodo === 'electiva')) return [3 /*break*/, 3];
                        return [4 /*yield*/, ua_1.default.findOne({ licenciatura: -1 }, function (err, _ua) {
                                if (err) {
                                    res.send('Error');
                                }
                                else {
                                    SSTemplate_1 = _ua;
                                }
                            })];
                    case 1:
                        _a.sent();
                        dependencia = SSTemplate_1.dependencia;
                        uaReceived.descripcion = SSTemplate_1.descripcion;
                        uaReceived.fechas = SSTemplate_1.fechas;
                        uaReceived.requisitos = SSTemplate_1.requisitos;
                        return [4 /*yield*/, ua_1.default.findOneAndUpdate({ licenciatura: -1 }, { $set: { dependencia: dependencia } })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        newUA = new ua_1.default(uaReceived);
                        newUA.save();
                        res.send((newUA) ? true : false);
                        return [2 /*return*/];
                }
            });
        });
    };
    PEService.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var uaToEdit, edited;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uaToEdit = req.body.uaToEdit;
                        return [4 /*yield*/, ua_1.default.findByIdAndUpdate(uaToEdit._id, uaToEdit)];
                    case 1:
                        edited = _a.sent();
                        res.send((edited) ? true : false);
                        return [2 /*return*/];
                }
            });
        });
    };
    PEService.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var deleted, SSTemplate, dependencia, finded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ua_1.default.findByIdAndDelete(req.params.id)];
                    case 1:
                        deleted = _a.sent();
                        return [4 /*yield*/, ua_1.default.findOne({ licenciatura: -1 }, function (err, _ua) {
                                if (err) {
                                    res.send('Error');
                                }
                                else {
                                    SSTemplate = _ua;
                                }
                            })];
                    case 2:
                        _a.sent();
                        dependencia = SSTemplate.dependencia;
                        finded = dependencia.find(function (id) { return JSON.stringify(id) === JSON.stringify(req.params.id); });
                        if (!finded) return [3 /*break*/, 4];
                        dependencia.splice(dependencia.indexOf(finded), 1);
                        return [4 /*yield*/, ua_1.default.findOneAndUpdate({ licenciatura: -1 }, { $set: { dependencia: dependencia } })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        res.send((deleted) ? true : false);
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(PEService.prototype, "router", {
        /* Setters y Getters */
        get: function () {
            return this._router;
        },
        enumerable: false,
        configurable: true
    });
    return PEService;
}());
var peService = new PEService();
exports.default = peService.router;
