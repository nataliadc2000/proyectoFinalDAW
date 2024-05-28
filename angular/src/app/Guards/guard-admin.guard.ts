import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IniciarSesionService } from '../Servicios/iniciar-sesion.service';
import Swal from 'sweetalert2';

export const guardAdminGuard: CanActivateFn = () => {

  const authenticationService=inject(IniciarSesionService);
  const router =inject(Router);

  if (!authenticationService.isAdmin()){
    // Muestra un mensaje utilizando sweetalert2
    Swal.fire({
      title: 'Error en la autenticación',
      text: 'Para navegar esta página, tienes que ser admin.',
      icon: 'error',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        router.navigate(['/paginaInicio']); // Redirige al componente de inicio de sesión
        window.location.reload();
      }
    });
    return false; // No permite la navegación
  }
  return true; // Permite la navegación
}
  
