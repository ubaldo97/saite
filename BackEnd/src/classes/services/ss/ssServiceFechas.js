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
var ua_1 = require("../../models_mongoose/ua");
var SSServiceFechas = /** @class */ (function () {
    function SSServiceFechas() {
        this._router = (0, express_1.Router)();
        this._router.get('/', this.getAll);
        this._router.post('/', this.create);
        this._router.put('/', this.update);
        this._router.delete('/:id', this.delete);
    }
    SSServiceFechas.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var SSTemplate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ua_1.default.findOne({ licenciatura: -2 }, function (err, _ua) {
                            if (err) {
                                res.send('Error');
                            }
                            else {
                                SSTemplate = _ua;
                            }
                        })];
                    case 1:
                        _a.sent();
                        res.send(SSTemplate.fechas);
                        return [2 /*return*/];
                }
            });
        });
    };
    SSServiceFechas.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var stringDate, newDate, SSTemplate, fechasModificadas, update;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stringDate = req.body.date;
                        newDate = { fecha: new Date(JSON.parse(stringDate)) };
                        return [4 /*yield*/, ua_1.default.findOne({ licenciatura: -2 }, function (err, _ua) {
                                if (err) {
                                    res.send('Error');
                                }
                                else {
                                    SSTemplate = _ua;
                                }
                            })];
                    case 1:
                        _a.sent();
                        fechasModificadas = SSTemplate.fechas;
                        fechasModificadas.push(newDate);
                        return [4 /*yield*/, ua_1.default.findOneAndUpdate({ licenciatura: -2 }, { $set: { fechas: fechasModificadas } })];
                    case 2:
                        update = _a.sent();
                        res.send((update) ? true : false);
                        return [2 /*return*/];
                }
            });
        });
    };
    SSServiceFechas.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var editedDate, SSTemplate, dates, update;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        editedDate = req.body.date;
                        return [4 /*yield*/, ua_1.default.findOne({ licenciatura: -2 }, function (err, _ua) {
                                if (err) {
                                    res.send('Error');
                                }
                                else {
                                    SSTemplate = _ua;
                                }
                            })];
                    case 1:
                        _a.sent();
                        dates = SSTemplate.fechas;
                        dates.forEach(function (date) {
                            (JSON.stringify(date._id) === JSON.stringify(editedDate._id)) ?
                                date.fecha = editedDate.fecha : console.log(false);
                        });
                        return [4 /*yield*/, ua_1.default.findOneAndUpdate({ licenciatura: -2 }, { $set: { fechas: dates } })];
                    case 2:
                        update = _a.sent();
                        res.send((update) ? true : false);
                        return [2 /*return*/];
                }
            });
        });
    };
    SSServiceFechas.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idToDelete, SSTemplate, dates, index, update;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idToDelete = JSON.stringify(req.params.id);
                        return [4 /*yield*/, ua_1.default.findOne({ licenciatura: -2 }, function (err, _ua) {
                                if (err) {
                                    res.send('Error');
                                }
                                else {
                                    SSTemplate = _ua;
                                }
                            })];
                    case 1:
                        _a.sent();
                        dates = SSTemplate.fechas;
                        index = dates.findIndex(function (date) { return JSON.stringify(date._id) === idToDelete; });
                        dates.splice(index, 1);
                        return [4 /*yield*/, ua_1.default.findOneAndUpdate({ licenciatura: -2 }, { $set: { fechas: dates } })];
                    case 2:
                        update = _a.sent();
                        res.send((update) ? true : false);
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(SSServiceFechas.prototype, "router", {
        /* Setters y Getters */
        get: function () {
            return this._router;
        },
        enumerable: false,
        configurable: true
    });
    return SSServiceFechas;
}());
var ssServiceFechas = new SSServiceFechas();
exports.default = ssServiceFechas.router;