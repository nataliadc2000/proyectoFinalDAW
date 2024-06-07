import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Socios } from 'src/app/Modelos/Socios';
import { IniciarSesionService } from 'src/app/Servicios/iniciar-sesion.service';
import { MensajeService } from 'src/app/Servicios/mensaje.service';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/Servicios/api.service';
import { SociosService } from 'src/app/Servicios/socios.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  registroForm: FormGroup;
estancoExiste = false;
  constructor(
    private fb: FormBuilder,
    private loginService: IniciarSesionService,
    private router: Router,
    private apiService:SociosService,
    private servicioMensaje: MensajeService
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmarContrasena: ['', Validators.required],
      estanco: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  ngOnInit(): void {

  }

  passwordsMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmarContrasena')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  seleccionarEstanco(event: Event): void {
    const codigoEstanco = (event.target as HTMLSelectElement).value;
    this.registroForm.patchValue({ estanco: codigoEstanco });
  }
  registrarNuevoSocio(): void {
    console.log(this.registroForm)
    if (this.registroForm.invalid) {
      this.servicioMensaje.mostrarMensajeDeError('Error', 'Todos los campos son obligatorios o las contraseñas no coinciden.');
      return;
    }

    const formValues = this.registroForm.value;
    const numeroEstanco = this.registroForm.get('estanco')?.value;
    // Verificar si el número de estanco ya existe en la base de datos
    this.apiService.verificarEstancoExistente(numeroEstanco).subscribe(
      (existe: boolean) => {
        if (existe) {
          this.estancoExiste = true;
          return; // Detener el proceso de registro
        }

      },
      (error: any) => {
        console.error('Error al verificar el estanco:', error);
      }
    );
    const nuevoSocio: Socios = {
      idSocio: 0,
      nombre: formValues.nombre,
      apellidos: formValues.apellidos,
      dni: formValues.dni,
      telefono: formValues.telefono,
      email: formValues.email,
      password: formValues.password,
      estanco: formValues.estanco
    };

    this.loginService.registrar(nuevoSocio).subscribe(
      (response) => {
        console.log('Usuario registrado con éxito:', response);
        this.router.navigate(['/']);
      },
      (error) => {
        if (error.status == 400) {
          this.servicioMensaje.mostrarMensajeDeError('Error', 'El correo ya existe');
        } else {
          console.error('Error al registrar el usuario:', error);
        }
      }
    );
  }

  get passwordsDoNotMatch() {
    return this.registroForm.hasError('passwordsMismatch') && this.registroForm.get('confirmarContrasena')?.touched;
  }
}
