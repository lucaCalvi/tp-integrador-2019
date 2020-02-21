import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { AsignacionService } from '../services/asignacion.service';
import { Asignacion } from '../models/asignacion';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

  @Input() usuarios$: any;
  @Input() currentTarea: any;
  usuariosAsignados: any = null;
  currentUser: string = localStorage.getItem("USUARIO");
  usuarioSesion: any = null;
  URL_API = 'http://localhost:3000/';

  constructor(private usuarioService: UsuarioService, private asignacionService: AsignacionService) { }

  ngOnInit() {
    this.getUsuarios();
    this.getUsuario();
    this.asignacionService.usuariosAsignados.subscribe(res => this.usuariosAsignados = res);
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

  asignarTarea(nombreUsuario) {
    let asignacion = new Asignacion();
    asignacion.id_tarea = this.currentTarea;
    asignacion.id_asignado = nombreUsuario;
    this.asignacionService.asignarTarea(asignacion)
      .subscribe(() => {
        this.getUsuario();
        this.asignacionService.getAsignaciones(this.currentTarea);
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
        this.asignacionService.getAsignaciones(this.currentTarea);
      },
      err => {
        console.log('Error ', err);
      });
  }
}
