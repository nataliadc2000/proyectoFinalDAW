import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Patrones } from 'src/app/Modelos/Patrones';
import { MensajeService } from 'src/app/Servicios/mensaje.service';
import { PatronService } from 'src/app/Servicios/patron.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-patron',
  templateUrl: './agregar-patron.component.html',
  styleUrls: ['./agregar-patron.component.css']
})
export class AgregarPatronComponent {

  nuevoPatron: Patrones = { nombrePatron: '', dniPatron: '' }; // Inicializa un nuevo objeto Patrones

  constructor(private servicioPatrones:PatronService,
    private servicioMensaje:MensajeService,
    private router:Router){}


  agregarPatron(): void {
    // Verificar si los campos requeridos están completos
    if (this.nuevoPatron.nombrePatron && this.nuevoPatron.dniPatron) {
      // Llama al método agregarPatron del servicio
      this.servicioPatrones.agregarPatron(this.nuevoPatron).subscribe(
        () => {

          this.mensajeAñadir(this.nuevoPatron);
          this.router.navigate(['/listadoPatrones']);
          // Restablece el formulario
          this.nuevoPatron = { nombrePatron: '', dniPatron: ''};
        },
        error => {
          console.error('Error al agregar el patrón:', error);
          alert('Error al agregar el patrón. Por favor, inténtelo de nuevo.');
        }
      );
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

  //Metodo para mostrar mensaje al añadir patron con sus datos
  mensajeAñadir(patron: Patrones) {
    const tablaHtml = `
    <table class="table table-striped table-bordered">
    <thead class="thead-dark">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Dni</th>
            </tr>
          </thead>
          <tbody>
          <tr>
          <td>${patron.nombrePatron}</td>
          <td>${patron.dniPatron}</td>
          </tr>
          </tbody>
    </table>`;
    Swal.fire({
      title: '¡Éxito!',
      html: `Nuevo patron añadido:<br>${tablaHtml}`,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }
  
}
