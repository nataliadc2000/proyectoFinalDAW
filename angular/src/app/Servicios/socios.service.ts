import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Socios } from '../Modelos/Socios';

@Injectable({
  providedIn: 'root'
})
export class SociosService {

  constructor(private http: HttpClient) { }



  private urlEliminarPorEmail = 'http://localhost:8081/controladorSocio/socios/email'
  private urlMostrarSocios = 'http://localhost:8081/controladorSocio/socios';
  private urlPerfilDelSocio = 'http://localhost:8081/controladorSocio/socios/perfil';
  private eliminarSocioId = 'http://localhost:8081/controladorSocio';
  private urlRegistrarAdmin = 'http://localhost:8081/controladorRegistrar/registrarAdmin';
  private urlEditar = 'http://localhost:8081/controladorSocio/socios/editar';
  private urlComprobarEmail = 'http://localhost:8081/controladorSocio/socios/verificar';

  //Metodo para añadir un socio
  añadirSocio(nuevoSocio: Socios): Observable<Socios> {
    return this.http.post<Socios>(this.urlRegistrarAdmin, nuevoSocio);
  }
  //Metodo para eliminar un socio por el id
  eliminarSocio(idSocio: number): Observable<void> {
    const url = `${this.eliminarSocioId}/socios/${idSocio}`;
    return this.http.delete<void>(url);
  }

  //Metodo para editar un socio por ek id
  editarSocio(idSocio: number, socioActualizado: Socios): Observable<void> {
    const url = `${this.urlEditar}/${idSocio}`;
    return this.http.put<void>(url, socioActualizado);
  }
  //Metodo para mostrar todos los socios
  getUsuario(): Observable<Socios[]> {
    return this.http.get<Socios[]>(this.urlMostrarSocios);
  }
  //Metodo un usuario por su email
  eliminarPorEmail(email: string): Observable<any> {
    return this.http.delete<any>(`${this.urlEliminarPorEmail}/${email}`);
  }
  //Meotod para mostrar el perfil del usuario que tiene la sesion iniciada
  mostrarPerfilSocio(email: string): Observable<Socios> {
    const url = `${this.urlPerfilDelSocio}/${email}`;
    return this.http.get<Socios>(url);
  }
  //Metodo para comprobar si existe el email o no.
  verificarEmailExistente(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.urlComprobarEmail}/${email}`);
  }


}
