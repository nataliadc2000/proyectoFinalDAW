import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../Servicios/authentication.service';
import Swal from 'sweetalert2';

//Guard para controlar el acceso a vista si no esta logeado.
export const guardLoginGuard: CanActivateFn = () => {

  const authenticationService=inject(AuthenticationService);
  const router =inject(Router);
  if (!authenticationService.isAuthenticated()) {      
    // Muestra un mensaje utilizando sweetalert2
    Swal.fire({
      title: 'Error en la autenticación',
      text: 'Para navegar esta página, tienes que tener la sesion inicida.',
      icon: 'error',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        router.navigate(['/']); // Redirige al componente de inicio de sesión
        window.location.reload();
      }
    });
    return false; // No permite la navegación
  }
  return true; // Permite la navegación
}
