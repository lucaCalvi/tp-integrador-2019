import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { Asignacion } from '../models/asignacion';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  @Output() usuariosAsignados = new EventEmitter();
  URL_API = 'http://localhost:3000/api/asignacion';

  constructor(private httpClient: HttpClient, private usuarioService: UsuarioService) { }

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

  uploadFile(formData): Observable<Object> {
    return this.httpClient.post(this.URL_API + '/uploadFile', formData);
  }
  
  getAsignaciones(currentTarea) {
    this.getAsignacionesTarea(currentTarea)
      .subscribe(asignaciones => {
        if(Array.isArray(asignaciones)){
          var usuariosAsignados = asignaciones.map(asignacion => asignacion.id_asignado);
        }
        this.usuariosAsignados.emit(usuariosAsignados);
      },
      err => {
        console.log('Error ', err);
      });
  }

  asignarContactos(usuarioSesion, usuariosAsignados, currentTarea) {
    usuarioSesion.contactos.forEach(contacto => {
      if(!usuariosAsignados.includes(contacto)) {
        let asignacion = new Asignacion();
        asignacion.id_tarea = currentTarea;
        asignacion.id_asignado = contacto;
        this.asignarTarea(asignacion).subscribe();
      }
    });
    this.getAsignaciones(currentTarea);
  }
}
