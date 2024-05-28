import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Barcos } from 'src/app/Modelos/Barcos';
import { Socios } from 'src/app/Modelos/Socios';
import { BarcosService } from 'src/app/Servicios/barcos.service';
import { SociosService } from 'src/app/Servicios/socios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-barco',
  templateUrl: './agregar-barco.component.html',
  styleUrls: ['./agregar-barco.component.css']
})
export class AgregarBarcoComponent implements OnInit {
  nuevoBarco: any = {};
  listaSocios: Socios[] = [];
  idSocioSeleccionado: number = 0;

  constructor(private servicioSocios: SociosService, private servicioBarco: BarcosService, private router: Router) { }

  ngOnInit() {
    //Cargo los socios.
    this.obtenerSocios();
  }

  //Metodo para agregar un nuevo barco.
  agregarBarco(): void {
    // Verificar si todos los campos están llenos
    if (
      !this.nuevoBarco.numeroMatricula ||
      !this.nuevoBarco.nombreBarco ||
      !this.nuevoBarco.numeroAmarre ||
      !this.nuevoBarco.cuotaMensual ||
      !this.idSocioSeleccionado
    ) {
      // Mostrar un mensaje de error indicando que todos los campos son obligatorios
      console.error('Todos los campos son obligatorios.');
      alert('Todos los campos son obligatorios.');
      return;
    }
  
    // Crear un objeto Barco con los datos ingresados y el ID del socio seleccionado
    const nuevoBarco = {
      numeroMatricula: this.nuevoBarco.numeroMatricula,
      nombreBarco: this.nuevoBarco.nombreBarco,
      numeroAmarre: this.nuevoBarco.numeroAmarre,
      cuotaMensual: this.nuevoBarco.cuotaMensual,
      socios: { idSocio: this.idSocioSeleccionado } // Objeto con el ID del socio
    };
    console.log("Nuevo barco con ID del socio:", nuevoBarco);
  
    // Llamar al servicio para agregar el nuevo barco
    this.servicioBarco.agregarBarco(nuevoBarco).subscribe(
      () => {
        //Muestro mensaje de exito
        this.mensajeBarcoAñadido(nuevoBarco);
        //Redirijo a la vista.
        this.router.navigate(['/listadoBarcos']);
      },
      error => {
        console.error('Error al agregar el barco:', error);
        alert('Error al agregar el barco. Por favor, inténtelo de nuevo.');
      }
    );
  }
  //Metodo para obtener todos los socios registrados.
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
  //Mensaje para mostrar que se ha guardado el nuevo barco y los datos del barco.
  mensajeBarcoAñadido(barco: Barcos) {
    const tablaHtml = `
    <table class="table table-striped table-bordered">
    <thead class="thead-dark">
            <tr>
              <th scope="col">Matricula</th>
              <th scope="col">Barco</th>
              <th scope="col">Numero Amarre</th>
              <th scope="col">Cuota</th>
            </tr>
          </thead>
          <tbody>
          <tr>
          <td>${barco.numeroMatricula}</td>
          <td>${barco.nombreBarco}</td>
          <td>${barco.numeroAmarre}</td>
          <td>${barco.cuotaMensual}</td>
          </tr>
          </tbody>
    </table>
    `;
    Swal.fire({
      title: '¡Éxito!',
      html: `Nuevo barco añadido:<br>${tablaHtml}`,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }
}



