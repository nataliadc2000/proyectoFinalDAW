import { Component, OnInit } from '@angular/core';
import { Patrones } from 'src/app/Modelos/Patrones';
import { MensajeService } from 'src/app/Servicios/mensaje.service';
import { PatronService } from 'src/app/Servicios/patron.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-patrones',
  templateUrl: './listado-patrones.component.html',
  styleUrls: ['./listado-patrones.component.css']
})
export class ListadoPatronesComponent implements OnInit {


  listadoPatrones: Patrones[] = [];
  displayModal: boolean = false;
  patronSeleccionado: Patrones = {
    idPatron: 0,
    nombrePatron: '',
    dniPatron: ''
  };
  constructor(private servicioPatrones: PatronService,
    private servicioMensaje: MensajeService
  ) { }

  ngOnInit(): void {
    this.cargarPatornes();
  }

  //Metodo para editar un patron.
  editarPatron() {
    if (this.patronSeleccionado && this.patronSeleccionado.idPatron !== undefined) {
      const idPatron = this.patronSeleccionado.idPatron;
      const nombre = this.patronSeleccionado.nombrePatron;
      const dni = this.patronSeleccionado.dniPatron;
      this.servicioPatrones.editarPatron(idPatron, nombre, dni).subscribe(
        () => {
          //Mostramos mensaje de extio
          this.servicioMensaje.mostrarMensajeDeExito('Exito', 'Patron modificado correctamente.');
          //Actualizamos la vista
          this.cargarPatornes();
          //Cerramos el dialogo
          this.displayModal = false; // Ocultar el modal después de editar
        },
        error => {
          console.error('Error al editar patrón:', error);
          alert('Error al editar patrón. Por favor, inténtelo de nuevo.');
        }
      );
    } else {
      console.error('El patrón seleccionado no tiene un ID válido.');
      // Puedes mostrar un mensaje de error al usuario o realizar otra acción apropiada aquí.
    }
  }
  //Metodo para abrir el dialogo de editar con los datos del patron
  showDialog(patron: Patrones) {
    this.patronSeleccionado = { ...patron }; // Clonar el patrón seleccionado para evitar modificar el original
    this.displayModal = true;
  }
  //Metodo para cargar los patrones en la lista.
  cargarPatornes() {
    this.servicioPatrones.getPatrones().subscribe(res => this.listadoPatrones = res);
  }
}
