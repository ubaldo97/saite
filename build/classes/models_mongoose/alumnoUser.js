"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const AlumnoUserSchema = new mongoose_1.Schema({
    _id: String,
    boleta: String,
    contra: String,
    licenciatura: Number,
    aprobadas: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'PE' }],
    reprobadas: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'PE' }],
    nocursadas: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'PE' }],
    ss: Boolean,
    electivas: Boolean,
    periodoReprobadas: [{ id: String, periodo: String }]
}, {
    versionKey: false
});
exports.default = mongoose_1.model('Alumnos', AlumnoUserSchema);
