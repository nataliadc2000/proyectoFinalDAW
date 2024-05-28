import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Servicios/authentication.service';
import { BarcosService } from 'src/app/Servicios/barcos.service';
import { IniciarSesionService } from 'src/app/Servicios/iniciar-sesion.service';
import { MensajeService } from 'src/app/Servicios/mensaje.service';
import { SalidaService } from 'src/app/Servicios/salida.service';
import { SociosService } from 'src/app/Servicios/socios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  mensaje: string = '';
  isAdmin: boolean = false;

  constructor(
    private servicioSalida: SalidaService,
    private servicioBarco:BarcosService,
    private servicioMensaje: MensajeService,
    private socioService: SociosService,
    private servicioIniciarSesion: IniciarSesionService,
    private authenticatedService: AuthenticationService,
    private router: Router) 
    { }

  ngOnInit(): void {
    // Verifica si el usuario es administrador al inicializar el componente
    this.isAdmin = this.servicioIniciarSesion.isAdmin();
  }


  //Metodo para eliminar la cuenta del propio usuario
  eliminarCuenta(): void {
    const email = sessionStorage.getItem('email'); // Obtener el correo electrónico desde sessionStorage
    if (email !== null) {
      // Verificar si hay barcos asociados a la cuenta
      this.servicioBarco.getBarcosPorEmail(email).subscribe(
        (barcos) => {
          if (barcos.length > 0) {
            // Informar al usuario sobre los barcos asociados y evitar la eliminación de la cuenta
            this.mensaje = 'No se puede eliminar la cuenta porque hay barcos asociados.';
            this.servicioMensaje.mostrarMensajeDeError('Error',this.mensaje);
            console.log(this.mensaje);
          } else {
            // Si no hay barcos asociados, verificar las salidas asociadas
            this.servicioSalida.getSalidasByEmail(email).subscribe(
              (salidas) => {
                if (salidas.length > 0) {
                  // Informar al usuario sobre las salidas asociadas y evitar la eliminación de la cuenta
                  this.mensaje = 'No se puede eliminar la cuenta porque hay salidas asociadas.';
                  this.servicioMensaje.mostrarMensajeDeError('Error',this.mensaje);
                  console.log(this.mensaje);
                } else {
                  // Si no hay salidas asociadas, eliminar la cuenta
                  this.socioService.eliminarPorEmail(email).subscribe(
                    () => {
                      this.logoutEliminarCuenta();
                      this.router.navigate(['/']);
                    },
                    (error) => {
                      this.mensaje = 'Error al eliminar el socio: ' + error.message;
                      console.log(this.mensaje);
                    }
                  );
                }
              }
            );
          }
        }
      );
    } else {
      this.mensaje = 'No se pudo obtener el correo electrónico del usuario.';
      console.log(this.mensaje);
    }
  }


  //Metodo para cerrar sesion
  logout(): void {
    this.servicioIniciarSesion.cerrarSesion();
    this.authenticatedService.saveLogout();
    this.servicioMensaje.mostrarMensajeDeExito('Hasta luego', 'Tu sesion ha sido cerrada con exito');
    this.router.navigate(['/']); // Redirigir a la página de inicio de sesión
  }

  //Metodo para cerrar sesion y eliminar los datos de sessionStorage
  logoutEliminarCuenta(): void {
    this.servicioIniciarSesion.cerrarSesion();
    this.authenticatedService.saveLogout();
    this.servicioMensaje.mostrarMensajeDeExito('Cuenta eliminada','Tu cuenta ha sido eliminada con exito.')
    this.router.navigate(['/']); // Redirigir a la página de inicio de sesión
  }


}

