import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  URL_API = 'http://localhost:3000/api/asignacion';

  constructor(private httpClient: HttpClient) { }

  asignarTarea(asignacion): Observable<Object> {
    return this.httpClient.post(this.URL_API, asignacion);
  }

  eliminarAsignacionTarea(nombreUsuario, id_tarea): Observable<Object> {
    return this.httpClient.request('delete', this.URL_API + `/${id_tarea}`, {body: {nombreUsuario}});
  }

  getAsignacionesTarea(id_tarea): Observable<Object> {
    return this.httpClient.get(this.URL_API + `/${id_tarea}`);
  }

  cambiarEstado(asignacion): Observable<Object> {
    return this.httpClient.put(this.URL_API + `/${asignacion.id_tarea}`, asignacion);
  }
}
