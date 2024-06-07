import { Component, OnInit } from '@angular/core';
import { Socios } from 'src/app/Modelos/Socios';
import { MensajeService } from 'src/app/Servicios/mensaje.service';
import { SociosService } from 'src/app/Servicios/socios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private servicioSocio: SociosService, private servicioMensaje: MensajeService) { }

  modoEdicion = false;

  socio: Socios = {
    idSocio: 0,
    nombre: '',
    apellidos: '',
    dni: '',
    telefono: '',
    email: '',
    password: '',
    rol: '',
    estanco:0
  };

  ngOnInit(): void {
    this.mostrarPerfilSocio();
  }

  //Metodo para mostrar los datos del socio que tiene la sesion iniciada.
  mostrarPerfilSocio(): void {
    const email = sessionStorage.getItem('email');
    if (email) {
      this.servicioSocio.mostrarPerfilSocio(email).subscribe(
        (data: Socios) => {
          console.log(this.socio);
          this.socio = data;
        },
        (error) => {
          console.error('Error al obtener el perfil del socio:', error);
        }
      );
    } else {
      console.error('No se encontró ningún correo electrónico en sessionStorage');
    }
  }
  //Metodo para editar el socio que tiene la sesion iniciada.
  editarSocio() {
    // Verificar si el idSocio está definido
    if (this.socio.idSocio !== undefined) {
      this.servicioSocio.editarSocio(this.socio.idSocio, this.socio).subscribe(
        () => {
          console.log(this.socio)
          this.servicioMensaje.mostrarMensajeDeExito('Exito', 'Socio modificado correctamente');
          this.mostrarPerfilSocio();
        },
        error => {
          console.error('Error al editar socio:', error);
          alert('Error al editar socio. Por favor, inténtelo de nuevo.');
        }
      );
    } else {
      // Manejar el caso en que idSocio sea undefined
      console.error('Error: idSocio no está definido.');
      alert('Error al editar socio. Por favor, inténtelo de nuevo.');
    }
  }
  //Metodo para mostrar el texto de activar modo edicion o desactivar.
  cambiarModoEdicion() {
    this.modoEdicion = !this.modoEdicion;
  }
}
