import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  URL_API = 'http://localhost:3000/api/tareas';

  constructor(private httpClient: HttpClient) { }

  getMisTareas(nombreUsuario): Observable<Object> {
    return this.httpClient.get(this.URL_API + `/${nombreUsuario}`);
  }

  deleteTarea(idTarea): Observable<Object> {
    return this.httpClient.delete(this.URL_API + `/${idTarea}`);
  }

  insertTarea(tarea): Observable<Object> {
    return this.httpClient.post(this.URL_API, tarea);
  }

  getTarea(idTarea): Observable<Object> {
    return this.httpClient.get(this.URL_API + `/modificar-tarea/${idTarea}`);
  }

  updateTarea(tarea): Observable<Object> {
    return this.httpClient.put(this.URL_API + `/${tarea._id}`,  tarea);
  }
}
