import UA from "./ua";
export default interface Alumno extends Document {
    _id: string;
    boleta: string;
    contra: string;
    licenciatura: number;
    aprobadas: UA[];
    reprobadas: UA[];
    nocursadas: UA[];
    ss: boolean;
    electivas: boolean;
}
