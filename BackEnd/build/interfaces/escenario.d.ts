import UA from "./ua";
export default interface Escenario {
    totalCreditos: number;
    cargas: {
        min: number;
        med: number;
        max: number;
    };
    ss: number;
    electivas: number;
    recomendacion: Array<UA>;
    aprobadas: Array<UA>;
    advertencia: number[];
}
