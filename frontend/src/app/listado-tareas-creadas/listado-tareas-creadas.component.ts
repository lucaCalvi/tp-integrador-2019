import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Location } from '@angular/common';
import { TareaService } from '../services/tarea.service';

@Component({
  selector: 'app-listado-tareas-creadas',
  templateUrl: './listado-tareas-creadas.component.html',
  styleUrls: ['./listado-tareas-creadas.component.css']
})
export class ListadoTareasCreadasComponent implements OnInit {

  tareas = null;
  usuario = null;

  constructor(
    private usuarioService: UsuarioService,
    private tareaService: TareaService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getTareas();
  }

  getTareas() {
    const nombreUsuario = this.route.snapshot.paramMap.get('nombreUsuario');
    this.tareaService.getMisTareas(nombreUsuario)
      .subscribe(res => {
        this.tareas = res;
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

  deleteTarea(idTarea) {
    this.tareaService.deleteTarea(idTarea)
      .subscribe(() => {
        this.getTareas();
      },
      err => {
        console.log('Error ', err);
      });
  }

  goBack() {
    this.location.back();
  }

}
