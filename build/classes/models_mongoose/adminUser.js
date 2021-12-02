"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AdminUserSchema = new mongoose_1.Schema({
    correo: { type: String, required: true },
    contra: { type: String, required: true },
    nombre: String,
    apellidos: String,
    tipo: Number,
}, {
    versionKey: false
});
exports.default = mongoose_1.model('Admins', AdminUserSchema);
