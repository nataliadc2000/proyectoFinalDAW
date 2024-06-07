import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8081/controladorSocio'; // Reemplaza esta URL por la URL de tu backend

  constructor(private http: HttpClient) { }

  verificarEstanco(numeroEstanco: string): Observable<boolean> {
    // Hacer una solicitud HTTP al backend para verificar si el número de estanco ya está registrado
    return this.http.get<boolean>(`${this.baseUrl}/verificar-estanco/${numeroEstanco}`);
  }

  registrarSocio(socioData: any): Observable<any> {
    // Hacer una solicitud HTTP al backend para registrar un nuevo socio
    return this.http.post(`${this.baseUrl}/registrar-socio`, socioData);
  }
}
