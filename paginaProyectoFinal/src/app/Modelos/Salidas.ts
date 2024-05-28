
export interface Salidas{
    idSalida?: number;
    fchHoraSalida: Date;
    destino: string;
    barco: { idBarco: number };
    patron:  { idPatron: number };

}