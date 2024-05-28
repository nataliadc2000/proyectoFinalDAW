import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  private authenticated = false;

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  saveLogin() {
    // Lógica para iniciar sesión y cambiar el estado a autenticado.
    this.authenticated = true;
  }

  saveLogout() {
    // Lógica para cerrar sesión y cambiar el estado a no autenticado.
    this.authenticated = false;
  }
}
