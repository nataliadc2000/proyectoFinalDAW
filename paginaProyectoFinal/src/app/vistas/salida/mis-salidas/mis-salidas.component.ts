import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Barcos } from 'src/app/Modelos/Barcos';
import { Patrones } from 'src/app/Modelos/Patrones';
import { Salidas } from 'src/app/Modelos/Salidas';
import { BarcosService } from 'src/app/Servicios/barcos.service';
import { ImageService } from 'src/app/Servicios/image.service';
import { MensajeService } from 'src/app/Servicios/mensaje.service';
import { PatronService } from 'src/app/Servicios/patron.service';
import { SalidaService } from 'src/app/Servicios/salida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-salidas',
  templateUrl: './mis-salidas.component.html',
  styleUrls: ['./mis-salidas.component.css']
})
export class MisSalidasComponent implements OnInit {

  visible:boolean = false;

  images:any[]=[];

  constructor(private imageService:ImageService,private servicioMensaje: MensajeService, private servicioSalida: SalidaService, private servicioBarcos: BarcosService, private servicioPatrones: PatronService, private router: Router) { }

  listadoSalidas: Salidas[] = [];
  email: string = '';
  idBarcoSeleccionado: number = 0;
  idPatronSeleccionado: number = 0;
  displayModal: boolean = false;
  listadoPatrones: Patrones[] = [];
  listadoBarcos: Barcos[] = [];
  mostrarDialogoNuevaSalidaVariable: boolean = false;


  salidaSeleccionada: Salidas = {
    idSalida: 0,
    fchHoraSalida: new Date(),
    destino: '',
    barco: { idBarco: 0 },
    patron: { idPatron: 0 }
  };

showDialog(){
  this.visible = true;
}
  ngOnInit(): void {
    this.obtenerEmailSocio();
    console.log('emailsocio: ' + this.email)
    this.obtenerPatrones();
    this.obtenerBarcosPorEmail();
    this.cargarSalidas();
    this.loadImages();

  }
  loadImages():void {
    this.imageService.getImages().subscribe(
      data => {
        this.images = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  //Metodo para eliminar la salida de un socio por su id
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
        this.servicioSalida.eliminarSalida(idSalida).subscribe(
          () => {
            this.servicioMensaje.mostrarMensajeDeExito('Éxito', 'Salida eliminada correctamente');
            this.cargarSalidas();
            // Puedes hacer otras acciones después de eliminar la salida, como recargar la lista de salidas.
          },
          error => {
            console.error('Error al eliminar la salida:', error);
            this.servicioMensaje.mostrarMensajeDeError('Error', 'Error al eliminar la salida. Por favor, inténtelo de nuevo.');
          }
        );
      }
    });
  }



  //Metodo para editar la saldia de un socio por su id.
  editarSalida() {
    if (this.salidaSeleccionada && this.salidaSeleccionada.idSalida) {
      // Asignar solo el ID del barco
      this.salidaSeleccionada.barco = { idBarco: this.idBarcoSeleccionado };
      // Asignar solo el ID del patrón
      this.salidaSeleccionada.patron = { idPatron: this.idPatronSeleccionado };

      console.log(this.salidaSeleccionada);
      // Realizar la solicitud HTTP PUT al servidor para actualizar la salida
      this.servicioSalida.editarSalida(this.salidaSeleccionada.idSalida, this.salidaSeleccionada).subscribe(
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
  //Metodo para obtener el email del socio que tiene la sesion iniciada.
  obtenerEmailSocio(): void {
    this.email = sessionStorage.getItem('email') || '';
  }
  //Metodo para obtener los barcos del socio que tiene iniciada sesion.
  obtenerBarcosPorEmail(): void {
    this.servicioBarcos.getBarcosPorEmail(this.email)
      .subscribe(barcos => {
        this.listadoBarcos = barcos;
        console.log(barcos);
      });
  }

  //Metodo para cargar las salidas del socio que tiene la sesion inicia.
  cargarSalidas() {
    this.servicioSalida.getSalidasByEmail(this.email).subscribe(res => this.listadoSalidas = res);
    console.log(this.listadoSalidas);
  }
  //Metodo para obtener los patrones.
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

  //Metodo para mostrar nombre del patron por su id
  getNombrePatron(idPatron: number): string {
    const patron = this.listadoPatrones.find(s => s.idPatron === idPatron);
    return patron ? patron.nombrePatron : 'Patron no encontrado';
  }
  //Metodo parea mostrar nombre del barco por su id.
  getNombreBarco(idBarco: number): string {
    const barco = this.listadoBarcos.find(s => s.idBarco === idBarco);
    return barco ? barco.nombreBarco : 'Barco no encontrado';
  }

  //Metodo para abrir el dialogo de editar con todos sus datos.
  showEditModal(salida: Salidas) {
    this.salidaSeleccionada = { ...salida };
    this.idBarcoSeleccionado = salida.barco.idBarco;
    this.idPatronSeleccionado = salida.patron.idPatron;
    this.displayModal = true;
  }
}
