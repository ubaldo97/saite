import { Schema, model } from "mongoose";

const AdminUserSchema = new Schema({
    correo: {type: String, required: true},
    contra: {type: String, required: true},
    nombre: String,
    apellidos: String,
    tipo: Number,
},{
    versionKey:false
});

export default model('Admins',AdminUserSchema);