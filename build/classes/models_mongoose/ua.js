"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const PESchema = new mongoose_1.Schema({
    titulo: { type: String, required: true },
    creditos: { type: Number, required: true },
    nivel: { type: String, required: true },
    dependencia: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'PE' }],
    semestres: [{ type: Number }],
    descripcion: { type: String },
    fechas: [{ id: String, fecha: Date }],
    requisitos: [{ id: String, req: String }],
    licenciatura: { type: Number },
    periodo: String,
}, {
    versionKey: false
});
exports.default = mongoose_1.model('PE', PESchema);
