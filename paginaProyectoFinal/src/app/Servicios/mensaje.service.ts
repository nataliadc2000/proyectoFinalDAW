import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  //Metodo para mostrar mensajes de error
  mostrarMensajeDeError(title:string,mensaje:string) {
    Swal.fire({
      title: title,
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
  //Metodo para mostrar mensaje de exito.
  mostrarMensajeDeExito(title:string,mensaje:string) {
    Swal.fire({
      title: title,
      text: mensaje,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }
}
