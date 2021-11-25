import UA from "./ua";

export default interface Escenario {
    totalCreditos: number;
    cargas: {
        min: number,
        med: number,
        max: number,
    };
    ss: number; //1 está bien, 0 cuidado, -1 peligro
    electivas: number; //porcentaje aprobado
    recomendacion: Array<UA>;
    aprobadas: Array<UA>;
    advertencia: number[];
}