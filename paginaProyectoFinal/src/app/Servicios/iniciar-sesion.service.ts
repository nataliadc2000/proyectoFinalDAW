import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socios } from '../Modelos/Socios';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class IniciarSesionService {

  constructor(private http: HttpClient,private jwtHelper: JwtHelperService) { }

  private urlIniciarSesion = 'http://localhost:8081/controladorIniciarSesion/iniciarSesion';
  private urlRegistrar ='http://localhost:8081/controladorRegistrar/registrar';
  private urlRegistrarAdmin='http://localhost:8081/controladorRegistrar/registrarAdmin';
  iniciarSesion(email: string, password: string): Observable<any> {
    
    return this.http.post<any>(this.urlIniciarSesion + "?email=" + email + "&password="+password,null);
  }

  //Metodo para registrarte desde el login
  registrar(nuevoSocio: Socios):Observable<Socios>{
    return this.http.post<Socios>(this.urlRegistrar,nuevoSocio);
  }
  //Metodo para registrar un socio desde la administracion
  registrarAdmin(nuevoSocio: Socios):Observable<Socios>{
    return this.http.post<Socios>(this.urlRegistrarAdmin,nuevoSocio);
  }
  //Metodo para comprobar si es admin o no.
  public isAdmin(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return false; // Si no hay token, el usuario no puede ser administrador
    }
    // Decodifica el token para obtener la información del usuario
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken && decodedToken.role === 'admin';
    
  }
  //Metodo para cerrar sesion.
  cerrarSesion(): void {
    // Eliminamos el token y el email de sessionStorage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');

  }

  
}
