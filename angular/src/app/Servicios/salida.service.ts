import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Salidas } from '../Modelos/Salidas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalidaService {
  private añadirSalida = 'http://localhost:8081/controladorSalida'; // Reemplaza con la URL de tu API
  private listarSalidas='http://localhost:8081/controladorSalida/salidas';
  private eliminarSalidaUrl='http://localhost:8081/controladorSalida';
  private urlActualizar = 'http://localhost:8081/controladorSalida/salidas/editar'; // Reemplaza con la URL de tu API
  private urlGetSalidaEmail='http://localhost:8081/controladorSalida/salidas'
  constructor(private http:HttpClient) { }


  //Metodo para agregar una salida
  agregarSalida(nuevaSalida: Salidas): Observable<void> {
    return this.http.post<void>(`${this.añadirSalida}/salidas`, nuevaSalida);
  }
  //Metodo para mostrar las saldias
  getSalidas():Observable<Salidas[]>{
    return this.http.get<Salidas[]>(this.listarSalidas);
  }
  //Metodos para mostrar las salidas de un socio
  getSalidasByEmail(email:string){
    return this.http.get<Salidas[]>(`${this.urlGetSalidaEmail}/misSalidas/${email}`);
  }
  //Metodo para eliminar una salida por el id
  eliminarSalida(idSalida: number): Observable<void> {
    const url = `${this.eliminarSalidaUrl}/salidas/${idSalida}`;
    return this.http.delete<void>(url);
  }
  //Metodo para editar una salida por el id
  editarSalida(idSalida: number, salidaActualizada: Salidas): Observable<void> {
    const url = `${this.urlActualizar}/${idSalida}`;
    return this.http.put<void>(url, salidaActualizada);
  }
  
}
