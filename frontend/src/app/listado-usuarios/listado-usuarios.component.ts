import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Asignacion } from '../models/asignacion';
import { AsignacionService } from '../services/asignacion.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

  usuarios$: any = null;

  usuarioSesion: any = null;

  currentUser = localStorage.getItem("USUARIO");

  currentTarea: any = null;

  asignacionesTarea = null;

  usuariosAsignados = null;

  constructor(
    private usuarioService: UsuarioService, 
    private route: ActivatedRoute, 
    private location: Location, 
    private asignacionService: AsignacionService) { }

  ngOnInit() {
    this.getUsuarios();
    this.getUsuario();
    this.getCurrentTarea();
  }

  getUsuarios() {
    this.usuarioService.getUsuarios()
      .subscribe(res => {
        this.usuarios$ = res;
      },
      err => {
        console.log('Error ', err);
      });
  }

  getUsuario() {
    this.usuarioService.getUsuario(this.currentUser)
      .subscribe(res => {
        this.usuarioSesion = res;
      },
      err => {
        console.log('Error ', err);
      });
  }

  updateList(users: Observable<Object>){
    this.usuarios$ = users;
  }

  agregarContacto(contacto) {
    this.usuarioService.agregarContacto(this.currentUser, contacto)
      .subscribe(() => {
        this.getUsuario();
      },
      err => {
        console.log('Error ', err);
      });
  }

  eliminarContacto(contacto) {
    this.usuarioService.eliminarContacto(this.currentUser, contacto)
      .subscribe(() => {
        this.getUsuario();
      },
      err => {
        console.log('Error ', err);
      });
  }

  getCurrentTarea() {
    if(this.route.snapshot.paramMap.get('idTarea')){
      this.currentTarea = this.route.snapshot.paramMap.get('idTarea');
      this.getAsignaciones();
    }
  }

  goBack() {
    this.currentTarea = null;
    this.location.back();
  }

  asignarTarea(nombreUsuario) {
    let asignacion = new Asignacion();
    asignacion.id_tarea = this.currentTarea;
    asignacion.id_asignado = nombreUsuario;
    this.asignacionService.asignarTarea(asignacion)
      .subscribe(() => {
        this.getUsuario();
        this.getAsignaciones();
      },
      err => {
        console.log('Error ', err);
      });
  }

  eliminarAsignacionTarea(nombreUsuario) {
    let id_tarea = this.currentTarea;
    this.asignacionService.eliminarAsignacionTarea(nombreUsuario, id_tarea)
      .subscribe(() => {
        this.getUsuario();
        this.getAsignaciones();
      },
      err => {
        console.log('Error ', err);
      });
  }

  getAsignaciones() {
    this.asignacionService.getAsignacionesTarea(this.currentTarea)
      .subscribe(asignaciones => {
        this.asignacionesTarea = asignaciones;
        this.usuariosAsignados = [];
        this.asignacionesTarea.forEach(asignacion => {
          this.usuariosAsignados.push(asignacion.id_asignado);
        });
        console.log(this.usuariosAsignados);
      },
      err => {
        console.log('Error ', err);
      });
  }
}
