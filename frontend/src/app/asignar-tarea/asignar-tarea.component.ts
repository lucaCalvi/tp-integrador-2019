import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AsignacionService } from '../services/asignacion.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-asignar-tarea',
  templateUrl: './asignar-tarea.component.html',
  styleUrls: ['./asignar-tarea.component.css']
})
export class AsignarTareaComponent implements OnInit {

  usuarioSesion: any = null;
  currentUser: string = localStorage.getItem("USUARIO");
  currentTarea: any = null;
  usuariosAsignados: any = null;

  constructor(
    private route: ActivatedRoute, 
    private location: Location, 
    private asignacionService: AsignacionService,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getCurrentTarea();
    this.asignacionService.usuariosAsignados.subscribe(res => this.usuariosAsignados = res);
  }

  getCurrentTarea() {
    if(this.route.snapshot.paramMap.get('idTarea')){
      this.currentTarea = this.route.snapshot.paramMap.get('idTarea');
      this.asignacionService.getAsignaciones(this.currentTarea);
    }
  }

  asignarContactos() {
    let usuarioSesion = null;
    this.usuarioService.getUsuario(this.currentUser)
      .subscribe(res => {
        usuarioSesion = res;
        this.asignacionService.asignarContactos(usuarioSesion, this.usuariosAsignados, this.currentTarea);
      },
      err => {
        console.log('Error ', err);
      });
  }

  goBack() {
    this.currentTarea = null;
    this.location.back();
  }
}
