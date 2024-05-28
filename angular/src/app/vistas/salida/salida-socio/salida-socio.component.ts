import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Barcos } from 'src/app/Modelos/Barcos';
import { Patrones } from 'src/app/Modelos/Patrones';
import { BarcosService } from 'src/app/Servicios/barcos.service';
import { MensajeService } from 'src/app/Servicios/mensaje.service';
import { PatronService } from 'src/app/Servicios/patron.service';
import { SalidaService } from 'src/app/Servicios/salida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salida-socio',
  templateUrl: './salida-socio.component.html',
  styleUrls: ['./salida-socio.component.css']
})
export class SalidaSocioComponent implements OnInit {

  nuevaSalida: any = {};
  listadoBarcos: Barcos[] = [];
  listadoPatrones: Patrones[] = [];
  idBarcoSeleccionado: number | undefined;
  email: string = '';
  constructor(private servicioBarcos: BarcosService,
    private servicioPatrones: PatronService,
    private servicioSalida: SalidaService,
    private servicioMensaje: MensajeService,
    private router: Router) { }


  ngOnInit(): void {
    this.obtenerEmailSocio();
    this.obtenerBarcosPorEmail();
    this.obtenerPatrones();
  }

  //Metodo para que un socio agrege su salida.
  agregarSalida(): void {
    // Verificar si se seleccionó un barco y un patrón
    if (this.idBarcoSeleccionado && this.nuevaSalida.patron &&
        this.nuevaSalida.fchHoraSalida && this.nuevaSalida.destino) {
      console.log("ID del barco seleccionado:", this.idBarcoSeleccionado);
      console.log("Patrón seleccionado:", this.nuevaSalida.patron);
  
      // Crear un objeto Salida con los datos ingresados y el ID del barco seleccionado
      const nuevaSalida = {
        fchHoraSalida: this.nuevaSalida.fchHoraSalida,
        destino: this.nuevaSalida.destino,
        barco: { idBarco: this.idBarcoSeleccionado }, // Objeto con el ID del barco
        patron: { idPatron: this.nuevaSalida.patron } // Objeto con el ID del patrón
      };
  
      console.log("Nueva salida con ID del barco y patrón:", nuevaSalida);
  
      // Llamar al servicio para agregar la nueva salida
      this.servicioSalida.agregarSalida(nuevaSalida).subscribe(
        () => {
          this.servicioMensaje.mostrarMensajeDeExito('Exito','Salida añadida correctamente');
          this.router.navigate(['/misSalidas']);
          // Puedes hacer otras acciones después de agregar la salida, como limpiar el formulario o redirigir a otra página.
        },
        error => {
          console.error('Error al agregar la salida:', error);
          alert('Error al agregar la salida. Por favor, inténtelo de nuevo.');
        }
      );
    } else {
      console.error('No se seleccionó un barco, un patrón o algún campo está vacío.');
      alert('Por favor, seleccione un barco, un patrón y complete todos los campos.');
    }
  }
  //Metodo para obtener el email del socio que tiene la sesion iniciada.
  obtenerEmailSocio(): void {
    this.email = sessionStorage.getItem('email') || '';

  }
  //Metodo para obtener los barcos de un socio.
  obtenerBarcosPorEmail(): void {
    this.servicioBarcos.getBarcosPorEmail(this.email)
      .subscribe(barcos => {
        this.listadoBarcos = barcos;
        console.log(barcos);
      });
  }
  //Metodo para obtener los aptrones.
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
}
