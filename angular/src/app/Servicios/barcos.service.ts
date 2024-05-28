import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Barcos } from '../Modelos/Barcos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarcosService {

  
  constructor(private http: HttpClient) { }

  private añadirBarco = 'http://localhost:8081/controladorBarco'; // Reemplaza con la URL de tu API
  private listarBarcos='http://localhost:8081/controladorBarco/barcos';
  private eliminarBarcoUrl='http://localhost:8081/controladorBarco';
  private baseUrl = 'http://localhost:8081/controladorBarco/barcos/editar'; // Reemplaza con la URL de tu API
  private urlGetBarcosEmail='http://localhost:8081/controladorBarco/barcos';
  
  
  //Metodo para agregar un nuevo barco
  agregarBarco(nuevoBarco: Barcos): Observable<void> {
    return this.http.post<void>(`${this.añadirBarco}/barcos`, nuevoBarco);
  }
  //Metodo para mostrar todos los barcos.
  getBarcos():Observable<Barcos[]>{
    return this.http.get<Barcos[]>(this.listarBarcos);
  }
  //Metodo para mostrar los barcos de un socio.
  getBarcosPorEmail(email: string): Observable<Barcos[]> {
    return this.http.get<Barcos[]>(`${this.urlGetBarcosEmail}/misBarcos/${email}`);
  }
  //Metodo para eliminar un barco por su id.
  eliminarBarco(idBarco: number): Observable<void> {
    const url = `${this.eliminarBarcoUrl}/barcos/${idBarco}`;
    return this.http.delete<void>(url);
  }
  //Metodo para editar una barco.
  editarBarco(barcoEditado: Barcos): Observable<void> {
    const url = `${this.baseUrl}/${barcoEditado.idBarco}`;
    return this.http.put<void>(url, barcoEditado);
  }
}
