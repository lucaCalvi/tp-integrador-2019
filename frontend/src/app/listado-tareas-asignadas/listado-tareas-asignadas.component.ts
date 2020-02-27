import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AsignacionService } from '../services/asignacion.service';
import { Asignacion } from '../models/asignacion';

@Component({
  selector: 'app-listado-tareas-asignadas',
  templateUrl: './listado-tareas-asignadas.component.html',
  styleUrls: ['./listado-tareas-asignadas.component.css']
})
export class ListadoTareasAsignadasComponent implements OnInit {

  tareas: any = null;
  usuario: any = null;
  currentUser: string = localStorage.getItem("USUARIO");
  nombreUsuario: string = this.route.snapshot.paramMap.get('nombreUsuario');
  estado: string = this.route.snapshot.paramMap.get('estado');

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private location: Location,
    private asignacionService: AsignacionService) { }

  ngOnInit() {
    this.getUsuario();
    this.getTareas();
  }

  getTareas() {
    this.usuarioService.getTareas(this.nombreUsuario)
      .subscribe(res => {
        if(Array.isArray(res)) {
          if(this.estado == 'pendientes') {
            this.tareas = res.filter(tarea => tarea.estado == 'Pendiente');
          } else if(this.estado == 'completas') {
            this.tareas = res.filter(tarea => tarea.estado == 'Completa');
          }
          if(this.tareas.length < 1) {
            this.tareas = null;
          }
        }
      },
      err => {
        console.log('Error ', err);
      });
  }

  getUsuario() {
    const nombreUsuario = this.route.snapshot.paramMap.get('nombreUsuario');
    this.usuarioService.getUsuario(nombreUsuario)
      .subscribe(res => {
        this.usuario = res;
      },
      err => {
        console.log('Error ', err);
      });
  }

  goBack() {
    this.location.back();
  }

  cambiarEstado(id_asignado, id_tarea, estado) {
    let asignacion = new Asignacion();
    asignacion.estado = estado;
    asignacion.fechaFin = new Date();
    asignacion.id_asignado = id_asignado;
    asignacion.id_tarea = id_tarea;
  
    this.asignacionService.cambiarEstado(asignacion)
      .subscribe(() => {
        this.getTareas();
      },
      err => {
        console.log('Error ', err);
      });
  }

}
