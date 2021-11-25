"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose = require("mongoose");
var PESchema = new mongoose_1.Schema({
    titulo: { type: String, required: true },
    creditos: { type: Number, required: true },
    nivel: { type: String, required: true },
    dependencia: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PE' }],
    semestres: [{ type: Number }],
    descripcion: { type: String },
    fechas: [{ id: String, fecha: Date }],
    requisitos: [{ id: String, req: String }],
    licenciatura: { type: Number },
    periodo: String,
}, {
    versionKey: false
});
exports.default = (0, mongoose_1.model)('PE', PESchema);
