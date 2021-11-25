"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var AdminUserSchema = new mongoose_1.Schema({
    correo: { type: String, required: true },
    contra: { type: String, required: true },
    nombre: String,
    apellidos: String,
    tipo: Number,
}, {
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Admins', AdminUserSchema);
