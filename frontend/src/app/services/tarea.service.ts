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

  deleteTarea(idTarea) {
    return this.httpClient.delete(this.URL_API + `/${idTarea}`);
  }
}
