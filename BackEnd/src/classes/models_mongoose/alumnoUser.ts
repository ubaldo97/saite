import { Schema, model, Mongoose } from "mongoose";
import * as mongoose from 'mongoose';
import Alumno from "../../interfaces/alumno";

const AlumnoUserSchema = new Schema({
    _id: String,
    boleta: String,
    contra: String,
    licenciatura: Number,
    aprobadas: [{type: mongoose.Schema.Types.ObjectId, ref: 'PE'}],
    reprobadas: [{type: mongoose.Schema.Types.ObjectId, ref: 'PE'}],
    nocursadas: [{type: mongoose.Schema.Types.ObjectId, ref: 'PE'}],
    ss: Boolean,
    electivas: Boolean,
    periodoReprobadas: [{id: String, periodo: String}]
},{
    versionKey:false
});

export default model('Alumnos',AlumnoUserSchema);