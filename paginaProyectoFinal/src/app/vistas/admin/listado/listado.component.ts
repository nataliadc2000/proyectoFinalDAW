import { Component } from '@angular/core';
import { Socios } from 'src/app/Modelos/Socios';
import { MensajeService } from 'src/app/Servicios/mensaje.service';
import { SociosService } from 'src/app/Servicios/socios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {

  listaSocios: Socios[] = [];
  idSocio: number = 0;
  userId: number = 0 // ID del usuario actual
  displayModal: boolean = false; //

  socioSeleccionado: Socios = {
    idSocio: 0,
    nombre: '',
    apellidos: '',
    dni: '',
    telefono: '',
    email: '',
    rol: '',
    estanco:null
  };

  constructor(
    private socioService: SociosService,
    private servicioMensaje: MensajeService
  ) { }

  ngOnInit() {
    //Cargo los socios nada mas cargar la vista.
    this.cargarSocio();
  }

  //Metodo para cargar todos los socios en la lista.
  cargarSocio() {
    this.socioService.getUsuario().subscribe(res => this.listaSocios = res);
  }

  //Metodo para eliminar un socio por su id
  eliminarSocio(idSocio: number): void {
    // Controlo que no esté borrando mi cuenta
    if (idSocio === this.userId) {
      this.servicioMensaje.mostrarMensajeDeError('Error', 'No puedes eliminar tu propia cuenta.');
      return; // Salir de la función si el usuario intenta eliminar su propia cuenta
    }
    // Verificar si el socio a eliminar es el último administrador
    if (this.esUltimoAdmin(idSocio)) {
      this.servicioMensaje.mostrarMensajeDeError('Error', 'No se puede eliminar al último administrador.');
      return;
    }
    // Confirmar eliminar cuenta y eliminar
    Swal.fire({
      title: '¿Está seguro?',
      text: '¿Está seguro de que desea eliminar este socio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.socioService.eliminarSocio(idSocio).subscribe(
          () => {
            //Muestro mensaje de exito
            this.servicioMensaje.mostrarMensajeDeExito('Éxito', 'Socio eliminado correctamente');
            // Recargar la lista de socios después de editar uno
            this.cargarSocio();
          },
          error => {
            console.error('Error al eliminar socio:', error);
            this.servicioMensaje.mostrarMensajeDeError('Error', 'Error al eliminar socio. Por favor, inténtelo de nuevo.');
          }
        );
      }
    });
  }

  //Metodo para editar un socio.
  editarSocio() {
    // Verificar si el idSocio está definido
    if (this.socioSeleccionado.idSocio !== undefined) {
      this.socioService.editarSocio(this.socioSeleccionado.idSocio, this.socioSeleccionado).subscribe(
        () => {
          //Mensaje exito
          this.servicioMensaje.mostrarMensajeDeExito('Exito', 'Socio modificado correctamente');
          this.displayModal = false; // Cerrar el modal después de editar el socio
          this.cargarSocio(); // Recargar la lista de socios después de editar uno
        },
        error => {
          console.error('Error al editar socio:', error);
          alert('Error al editar socio. Por favor, inténtelo de nuevo.');
        }
      );
    } else {
      // Manejar el caso en que idSocio sea undefined
      console.error('Error: idSocio no está definido.');
      alert('Error al editar socio. Por favor, inténtelo de nuevo.');
    }
  }

  //Metodo para verificar si un socio es el último administrador
  esUltimoAdmin(idSocio: number): boolean {
    const admins = this.listaSocios.filter(socio => socio.rol === 'admin');
    return admins.length === 1 && admins[0].idSocio === idSocio;
  }

  //Metodo para abrir el dialogo de editar.
  showDialog(socio: Socios) {
    this.socioSeleccionado = { ...socio }; // Clonar el socio seleccionado para evitar modificar el original
    this.displayModal = true;
    console.log(this.socioSeleccionado);
  }
}


