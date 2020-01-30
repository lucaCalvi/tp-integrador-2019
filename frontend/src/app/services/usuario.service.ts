import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL_API = 'http://localhost:3000/api/usuarios';

  constructor(private httpClient: HttpClient) { }

  getUsuarios(): Observable<Object> {
    return of(this.httpClient.get(this.URL_API));
  }

  getUsuario(nombreUsuario): Observable<Object> {
    return this.httpClient.get(this.URL_API + `/${nombreUsuario}`);
  }

  getTareas(nombreUsuario): Observable<Object> {
    return this.httpClient.get(this.URL_API + `/${nombreUsuario}` + '/asignaciones');
  }

  getTarea(nombreUsuario, idTarea): Observable<Object> {
    return this.httpClient.get(this.URL_API + `/${nombreUsuario}` + '/asignaciones' + `/${idTarea}`);
  }

  searchUsuarios(term: string): Observable<Object>{
    if(!term){
      return this.httpClient.get(this.URL_API);
    }
    if(!term.trim()){
      return of([]);
    }
    return this.httpClient.get(this.URL_API + `/search/${term}`);
  }

  insertUsuario(usuario): Observable<Object>{
    return this.httpClient.post(this.URL_API, usuario);
  }

  updateUsuario(usuario, nombreUsuario): Observable<Object> {
    return this.httpClient.put(this.URL_API + `/${nombreUsuario}`, usuario);
  }

  deleteUsuario(usuario, contraseña): Observable<Object> {
    return this.httpClient.request('delete', this.URL_API + `/${usuario.nombreUsuario}`, {body: {contraseña}})
  }

  agregarContacto(nombreUsuario, contacto): Observable<Object> {
    return this.httpClient.put(this.URL_API + `/${nombreUsuario}/agregar-contacto`, {contacto});
  }

  eliminarContacto(nombreUsuario, contacto): Observable<Object> {
    return this.httpClient.put(this.URL_API + `/${nombreUsuario}/eliminar-contacto`, {contacto});
  }

  getMisTareas(nombreUsuario): Observable<Object> {
    return this.httpClient.get(this.URL_API + `/${nombreUsuario}` + `/tareas`);
  }
}
