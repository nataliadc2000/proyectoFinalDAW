import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Servicios/authentication.service';
import { IniciarSesionService } from 'src/app/Servicios/iniciar-sesion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {

constructor(private servicioIniciarSesion:IniciarSesionService,private authenticatedService: AuthenticationService,private router: Router){}

email: string='';
password: string='';
  
  

//Metodo para iniciar sesion.
iniciarSesion(): void {
  this.servicioIniciarSesion.iniciarSesion(this.email, this.password).subscribe(
    response => {
      //Almacenamos el token de la sesion
      sessionStorage.setItem('token',response.token);
      //Almaceno el email 
      sessionStorage.setItem('email', this.email);
      console.log('Email iniciar sesion'+this.email);
      this.authenticatedService.saveLogin();
      this.router.navigate(['/paginaInicio']); 
    
    },
    error => {
      console.error(error);
      this.mensajeUsuarioOContraseñaIncorrectos();
    }
  );
}
//Metodo para mostrar mensaje de usuario o contraseña incorrectos.
mensajeUsuarioOContraseñaIncorrectos(){
  // Mostrar SweetAlert al cerrar sesión
  Swal.fire({
   title: '¡Error!',
   text: 'Usuario o contraseña incorrectos',
   icon: 'error',
   confirmButtonText: 'Aceptar'
 });
}
}
