import { Component, OnInit } from '@angular/core';
import { Barcos } from 'src/app/Modelos/Barcos';
import { Patrones } from 'src/app/Modelos/Patrones';
import { Salidas } from 'src/app/Modelos/Salidas';
import { BarcosService } from 'src/app/Servicios/barcos.service';
import { MensajeService } from 'src/app/Servicios/mensaje.service';
import { PatronService } from 'src/app/Servicios/patron.service';
import { SalidaService } from 'src/app/Servicios/salida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-salidas',
  templateUrl: './listado-salidas.component.html',
  styleUrls: ['./listado-salidas.component.css']
})
export class ListadoSalidasComponent implements OnInit {

  listadoSalidas: Salidas[] = [];
  listadoBarcos: Barcos[] = [];
  listadoPatrones: Patrones[] = [];
  idBarcoSeleccionado: number = 0;
  idPatronSeleccionado: number = 0;
  displayModal: boolean = false;
  salidaSeleccionada: Salidas = {
    idSalida: 0,
    fchHoraSalida: new Date(),
    destino: '',
    barco: { idBarco: 0 },
    patron: { idPatron: 0 }
  };

  constructor(private servicioSalidas: SalidaService,
    private servicioBarcos: BarcosService,
    private servicioPatrones: PatronService,
    private servicioMensaje: MensajeService) { }

  ngOnInit(): void {
    this.cargarSalidas();
    this.obtenerBarcos()
    this.obtenerPatrones();
  }

  //Metodo para eliminar una salida
  eliminarSalida(idSalida: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¿Está seguro de que desea eliminar esta salida?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioSalidas.eliminarSalida(idSalida).subscribe(
          () => {
            this.servicioMensaje.mostrarMensajeDeExito('Éxito', 'Salida eliminada correctamente');
            this.cargarSalidas();
          },
          error => {
            console.error('Error al eliminar la salida:', error);
            this.servicioMensaje.mostrarMensajeDeError('Error', 'Error al eliminar la salida. Por favor, inténtelo de nuevo.');
          }
        );
      }
    });
  }
  

  //Metodo para editar una salida.
  editarSalida() {
    if (this.salidaSeleccionada && this.salidaSeleccionada.idSalida) {
      // Asignar solo el ID del barco
      this.salidaSeleccionada.barco = { idBarco: this.idBarcoSeleccionado };
      // Asignar solo el ID del patrón
      this.salidaSeleccionada.patron = { idPatron: this.idPatronSeleccionado };

      console.log(this.salidaSeleccionada);
      // Realizar la solicitud HTTP PUT al servidor para actualizar la salida
      this.servicioSalidas.editarSalida(this.salidaSeleccionada.idSalida, this.salidaSeleccionada).subscribe(
        () => {

          this.servicioMensaje.mostrarMensajeDeExito('Exito', 'Salida modificada con exito');
          this.cargarSalidas(); // Recargar la lista de salidas después de la edición
          this.displayModal = false; // Cerrar el modal después de editar
        },
        error => {
          console.error('Error al editar la salida:', error);
          alert('Error al editar la salida. Por favor, inténtelo de nuevo.');
        }
      );
    } else {
      console.error('Error: salidaSeleccionada no está definida o no tiene un idSalida válido.');
    }
  }

  //Metodo para cargar todas las salidas.
  cargarSalidas() {
    this.servicioSalidas.getSalidas().subscribe(res => this.listadoSalidas = res);
    console.log(this.listadoSalidas);
  }

  //Metodo para obtener todos los barcos.
  obtenerBarcos(): void {
    this.servicioBarcos.getBarcos().subscribe(
      barcos => {
        this.listadoBarcos = barcos;
        console.log(barcos);
      },
      error => {
        console.error('Error al obtener la lista de socios:', error);
      }
    );
  }
  //Metodo para obtener todos los patrones
  obtenerPatrones(): void {
    this.servicioPatrones.getPatrones().subscribe(
      patrones => {
        this.listadoPatrones = patrones;
        console.log(patrones);
      },
      error => {
        console.error('Error al obtener la lista de socios:', error);
      }
    );
  }

  //Metodo para mostrar el nombre del patron por su id
  getNombrePatron(idPatron: number): string {
    const patron = this.listadoPatrones.find(s => s.idPatron === idPatron);
    return patron ? patron.nombrePatron : 'Patron no encontrado';
  }
  //Metodo para mostrar el nombre del barco a traves de su id
  getNombreBarco(idBarco: number): string {
    const barco = this.listadoBarcos.find(s => s.idBarco === idBarco);
    return barco ? barco.nombreBarco : 'Barco no encontrado';
  }

  //Metodo para abrir el dialogo de editar salida con los datos cargados.
  showEditModal(salida: Salidas) {
    this.salidaSeleccionada = { ...salida };
    this.idBarcoSeleccionado = salida.barco.idBarco;
    this.idPatronSeleccionado = salida.patron.idPatron;
    this.displayModal = true;
  }
}
