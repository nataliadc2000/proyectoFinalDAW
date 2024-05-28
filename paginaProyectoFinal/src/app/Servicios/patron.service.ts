import { Injectable } from '@angular/core';
import { Patrones } from '../Modelos/Patrones';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatronService {

  private añadirPatron = 'http://localhost:8081/controladorPatron'; // Reemplaza con la URL de tu API
  private listarPatrones='http://localhost:8081/controladorPatron/patron';
  private eliminarPatronUrl='http://localhost:8081/controladorPatron';
  private urlEditar='http://localhost:8081/controladorPatron/patron/editarPatron';

  constructor(private http:HttpClient) { }

  //Metodo para agregar un patron
  agregarPatron(nuevoPatron: Patrones): Observable<void> {
    return this.http.post<void>(`${this.añadirPatron}/patron`, nuevoPatron);
  }
  //Metodo para mostrar patrones
  getPatrones():Observable<Patrones[]>{
    return this.http.get<Patrones[]>(this.listarPatrones);
  }
  //Metodo para eliminar un patron por el id
  eliminarPatron(idPatron: number): Observable<void> {
    const url = `${this.eliminarPatronUrl}/patron/${idPatron}`;
    return this.http.delete<void>(url);
  }
    //Metodo para editar un patron por el id
  /*editarPatron(idPatron: number, patronActualizado: Patrones): Observable<void> {
    const url = `${this.urlEditar}/${idPatron}`;
    return this.http.put<void>(url, patronActualizado);
  }*/
  editarPatron(idPatron: number, nombre: string, dni: string): Observable<void> {
    const url = `${this.urlEditar}/${idPatron}`;
    const cuerpo = { nombrePatron: nombre, dniPatron: dni };
    return this.http.put<void>(url, cuerpo);
}

}
