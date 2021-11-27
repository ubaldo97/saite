"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose = __importStar(require("mongoose"));
const PESchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.model('PE', PESchema);
