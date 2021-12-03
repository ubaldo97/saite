import Fecha from "./fecha";
import { Requisito } from "./requisito";

export default interface UA {
    _id: string;
    titulo: string;
    creditos: number;
    nivel: string;
    dependencia: UA[];
    semestres: number[];
    descripcion: string;
    fechas: Fecha[];
    requisitos: Requisito[];
    licenciatura: number;
    periodo: string;
}