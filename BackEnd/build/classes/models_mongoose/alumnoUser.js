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
const AlumnoUserSchema = new mongoose_1.Schema({
    _id: String,
    boleta: String,
    contra: String,
    licenciatura: Number,
    aprobadas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PE' }],
    reprobadas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PE' }],
    nocursadas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PE' }],
    ss: Boolean,
    electivas: Boolean,
    periodoReprobadas: [{ id: String, periodo: String }]
}, {
    versionKey: false
});
exports.default = mongoose_1.model('Alumnos', AlumnoUserSchema);
