import { Component, OnInit, Input } from '@angular/core';
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

  tareas = null;
  usuario = null;
  currentUser = localStorage.getItem("USUARIO");
  nombreUsuario = this.route.snapshot.paramMap.get('nombreUsuario');
  estado = this.route.snapshot.paramMap.get('estado');

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private location: Location,
    private asignacionService: AsignacionService) { }

  ngOnInit() {
    this.getTareas();
  }

  getTareas() {
    this.usuarioService.getTareas(this.nombreUsuario)
      .subscribe(res => {
        this.tareas = res;
        if(this.estado == 'pendientes'){
          let aux = [];
          this.tareas.forEach(tarea => {
            if(tarea.estado == 'Pendiente'){
              aux.push(tarea);
            }
          });
          if(aux.length > 0){
            this.tareas = aux;
          }
          else {
            this.tareas = null;
          }
        }
        if(this.estado == 'completas'){
          let aux = [];
          this.tareas.forEach(tarea => {
            if(tarea.estado == 'Completa'){
              aux.push(tarea);
            }
          });
          if(aux.length > 0){
            this.tareas = aux;
          }
          else {
            this.tareas = null;
          }
        }
        this.getUsuario();
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
