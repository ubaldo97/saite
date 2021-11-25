"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose = require("mongoose");
var AlumnoUserSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)('Alumnos', AlumnoUserSchema);
