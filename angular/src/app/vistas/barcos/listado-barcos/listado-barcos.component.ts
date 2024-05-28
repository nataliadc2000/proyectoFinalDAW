import { Component, OnInit } from '@angular/core';
import { Barcos } from 'src/app/Modelos/Barcos';
import { Socios } from 'src/app/Modelos/Socios';
import { BarcosService } from 'src/app/Servicios/barcos.service';
import { MensajeService } from 'src/app/Servicios/mensaje.service';
import { SociosService } from 'src/app/Servicios/socios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-barcos',
  templateUrl: './listado-barcos.component.html',
  styleUrls: ['./listado-barcos.component.css']
})
export class ListadoBarcosComponent implements OnInit {

  listaBarcos: Barcos[] = [];
  listaSocios: Socios[] = [];
  modalEdicionBarcoVisible: boolean = false; // Propiedad para controlar la visibilidad del modal de edición
  displayModal: boolean = false;
  barcoSeleccionado: Barcos = {
    idBarco: 0,
    nombreBarco: '',
    cuotaMensual: 0,
    numeroAmarre: 0,
    numeroMatricula: '',
    socios: { idSocio: 0 }
  };

  constructor(
    private servicioBarcos: BarcosService,
    private servicioSocios: SociosService,
    private servicioMensaje: MensajeService) { }

  ngOnInit(): void {
    this.cargarBarcos();
    this.obtenerSocios();

  }

  //Metodo para eliminar un barco por el id.
  eliminarBarco(idBarco: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¿Está seguro de que desea eliminar este barco?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioBarcos.eliminarBarco(idBarco).subscribe(
          () => {
            //Mostramos mensaje de exito
            this.servicioMensaje.mostrarMensajeDeExito('Éxito', 'Barco eliminado correctamente');
            //Actualizamos la lista
            this.cargarBarcos();
          },
          error => {
            console.error('Error al eliminar el barco:', error);
            this.servicioMensaje.mostrarMensajeDeError('Error', 'Error al eliminar el barco. Por favor, inténtelo de nuevo.');
          }
        );
      }
    });
  }
  //Metodo para editar un barco.
  editarBarco(): void {
    this.servicioBarcos.editarBarco(this.barcoSeleccionado).subscribe(
      () => {
        //Mostramos el mensaje de extio
        this.servicioMensaje.mostrarMensajeDeExito('Exito', 'Barco modificado con exito');
        //Cerramos el dialogo.
        this.hideDialog();
        //Actualizamos los barcos.
        this.cargarBarcos();
      },
      error => {
        console.error('Error al editar barco:', error);
        alert('Error al editar barco. Por favor, inténtelo de nuevo.');
      }
    );
  }
  //Metodo para obtener todos los socios.
  obtenerSocios(): void {
    this.servicioSocios.getUsuario().subscribe(
      socios => {
        this.listaSocios = socios;
        console.log(socios);
      },
      error => {
        console.error('Error al obtener la lista de socios:', error);
      }
    );
  }
  //Metodo para obtener todos los barcos.
  cargarBarcos() {
    this.servicioBarcos.getBarcos().subscribe(res => this.listaBarcos = res);
  }

  //Carga el nombre del socio por el id
  getNombreSocio(idSocio: number): string {
    const socio = this.listaSocios.find(s => s.idSocio === idSocio);
    return socio ? socio.nombre : 'Socio no encontrado';
  }
  //Metodo para abrir dialogo con los datos del barco.
  showDialog(barco: Barcos) {
    this.barcoSeleccionado = { ...barco }; // Copia los datos del barco seleccionado para evitar modificar el original accidentalmente
    this.displayModal = true;
  }
  //Metodo para cerrar dialogo
  hideDialog() {
    this.displayModal = false;
  }

}
