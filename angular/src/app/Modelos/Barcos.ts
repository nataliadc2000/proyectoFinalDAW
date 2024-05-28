export interface Barcos {
    idBarco?: number; // El ID puede ser opcional si estás creando un nuevo barco
    numeroMatricula: string;
    nombreBarco: string;
    numeroAmarre: number;
    cuotaMensual: number;
    socios: { idSocio: number }; // Define socios como un objeto con la estructura { idSocio: number }
}
