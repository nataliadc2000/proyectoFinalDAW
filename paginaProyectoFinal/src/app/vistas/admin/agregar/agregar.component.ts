import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Socios } from 'src/app/Modelos/Socios';
import { IniciarSesionService } from 'src/app/Servicios/iniciar-sesion.service';
import { MensajeService } from 'src/app/Servicios/mensaje.service';
import { SociosService } from 'src/app/Servicios/socios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {
  contrasenasCoinciden:boolean=false;
  confirmarContrasena : string='';
  errorContrasena:string='';
  nuevoSocio:Socios={
    idSocio:0,
    nombre:'',
    apellidos:'',
    dni:'',
    telefono:'',
    email:'',
    password:'',
    rol:'',
    estanco:0
  }

  constructor(private servicioLogin:IniciarSesionService,private router: Router,private servicioMensaje:MensajeService){}

  //Metodo para registrar un nuevo usuario desde la vista de admin..
   registrarNuevoSocio(): void {
    // Verificar si todos los campos obligatorios están llenos
    if (!this.nuevoSocio.nombre ||
      !this.nuevoSocio.apellidos ||
      !this.nuevoSocio.dni ||
      !this.nuevoSocio.telefono ||
      !this.nuevoSocio.email ||
      !this.nuevoSocio.password ||
      !this.confirmarContrasena) {
      //Muestra mensaje de error si los campos estan vacios.
      this.servicioMensaje.mostrarMensajeDeError('Error','Todos los campos son obligatorios');
      console.error('Todos los campos son obligatorios');
      return;
    }
    // Verificar si las contraseñas coinciden
    if (this.nuevoSocio.password !== this.confirmarContrasena) {
      this.contrasenasCoinciden = true;
      this.errorContrasena = 'Las contraseñas no coinciden.';
      //Mensaje de error si las contraseñas no coinciden.
      this.servicioMensaje.mostrarMensajeDeError('Error',this.errorContrasena);
      console.log(this.errorContrasena)
      return;
    }
    // Si todos los campos están llenos y las contraseñas coinciden, procede con el registro
    this.servicioLogin.registrarAdmin(this.nuevoSocio).subscribe(
      (response) => {
        console.log('Usuario registrado con éxito:', response);
        //Redirigimos a la vista del listado.
        this.router.navigate(['/listadoSocios']);
      },
      (error) => {
        //En el back controlo que si exites el socio devuelva error 400.
        if (error.status == 400) {
          //Mostramos mensaje de que el correo ya existe.
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
