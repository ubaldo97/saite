import { Schema, model } from "mongoose";
import mongoose from 'mongoose';

const PESchema = new Schema({
    titulo: {type: String, required: true},
    creditos: {type: Number, required: true},
    nivel: {type: String, required: true},
    dependencia:[{type: mongoose.Schema.Types.ObjectId, ref: 'PE'}],
    semestres: [{type: Number}],
    descripcion: {type: String},
    fechas: [{id: String, fecha: Date}],
    requisitos: [{id: String, req: String}],
    licenciatura: {type: Number},
    periodo: String,
},{
    versionKey:false
});

export default model('PE',PESchema);