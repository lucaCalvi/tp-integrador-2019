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
  file: Array<File> = [];

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
          } else {
            this.tareas = res;
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

  //cambiar nombre con el que se guarda, ver para mostrar luego de completada o mandar a asignador por mail
  cambiarEstado(id_asignado, id_tarea, estado) {
    let asignacion = new Asignacion();
    asignacion.estado = estado;
    asignacion.fechaFin = new Date();
    asignacion.id_asignado = id_asignado;
    asignacion.id_tarea = id_tarea;

    let formData = new FormData();
    if(this.file.length > 0) {
      formData.set('files', this.file[0], this.file[0].name);
      asignacion.archivo = this.file[0].name;
    }
  
    this.asignacionService.cambiarEstado(asignacion)
      .subscribe(() => {
        this.asignacionService.uploadFile(formData)
          .subscribe(res => console.log('Response: ', res), err => console.log('Error ', err));
        this.getTareas();
      },
      err => {
        console.log('Error ', err);
      });
  }

  onFileChange(e) {
    this.file = e.target.files;
  }
}
