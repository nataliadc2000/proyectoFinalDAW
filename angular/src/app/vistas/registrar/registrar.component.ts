import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Socios } from 'src/app/Modelos/Socios';
import { IniciarSesionService } from 'src/app/Servicios/iniciar-sesion.service';
import { MensajeService } from 'src/app/Servicios/mensaje.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {

  nuevoSocio: Socios = {
    idSocio: 0,
    nombre: '',
    apellidos: '',
    dni: '',
    telefono: '',
    email: '',
    password: ''
  }
  contrasenasCoinciden: boolean = false;
  confirmarContrasena: string = '';
  errorContrasena: string = '';

  constructor(private loginService: IniciarSesionService, private router: Router,private servicioMensaje:MensajeService) { }


  registrarNuevoSocio(): void {
    // Verificar si todos los campos obligatorios están llenos
    if (!this.nuevoSocio.nombre ||
      !this.nuevoSocio.apellidos ||
      !this.nuevoSocio.dni ||
      !this.nuevoSocio.telefono ||
      !this.nuevoSocio.email ||
      !this.nuevoSocio.password ||
      !this.confirmarContrasena) {
      // Mostrar un mensaje de error o tomar alguna otra acción
      this.servicioMensaje.mostrarMensajeDeError('Error','Todos los campos son obligatorios');
      console.error('Todos los campos son obligatorios');
      return;
    }

    // Verificar si las contraseñas coinciden
    if (this.nuevoSocio.password !== this.confirmarContrasena) {
      this.contrasenasCoinciden = true;
      this.errorContrasena = 'Las contraseñas no coinciden.';
      this.servicioMensaje.mostrarMensajeDeError('Error',this.errorContrasena);

      console.log(this.errorContrasena)
      return;
    }
    // Si todos los campos están llenos y las contraseñas coinciden, procede con el registro
    this.loginService.registrar(this.nuevoSocio).subscribe(
      (response) => {
        // Manejo de la respuesta del backend
        console.log('Usuario registrado con éxito:', response);
        // Redirigir a otra página, por ejemplo, la página de inicio de sesión
        this.router.navigate(['/']);
      },
      (error) => {
        if (error.status == 400) {
          this.servicioMensaje.mostrarMensajeDeError('Error','El correo ya existe');
          console.error('El correo ya existe')
        } else {
          // Manejo de errores en el registro
          console.error('Error al registrar el usuario:', error);
        }
      }
    );
  }
}
