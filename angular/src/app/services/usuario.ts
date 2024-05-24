export class Usuario {
    id!:number;
    nombre!:string;
    username!:string;
    email!:string;
    direccion!:string;
    telefono!:string;
    tipo!:string;
    password!:string
}

export interface User {
    id?:number;
    name:string;
    password:string;
    email:string;
}