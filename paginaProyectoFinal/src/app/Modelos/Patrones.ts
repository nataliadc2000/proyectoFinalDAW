import { Salidas } from "./Salidas";

export interface Patrones {
    idPatron?: number;
    nombrePatron: string;
    dniPatron: string;
    listaSalida?: Salidas[];
}