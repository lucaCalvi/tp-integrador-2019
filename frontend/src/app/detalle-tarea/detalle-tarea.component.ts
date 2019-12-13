import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.component.html',
  styleUrls: ['./detalle-tarea.component.css']
})
export class DetalleTareaComponent implements OnInit {

  tarea = null;
  asignador = null;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getTarea();
  }

  getTarea() {
    const nombreUsuario = this.route.snapshot.paramMap.get('nombreUsuario');
    const idTarea = this.route.snapshot.paramMap.get('idTarea');
    this.usuarioService.getTarea(nombreUsuario, idTarea)
      .subscribe(res => {
        this.tarea = res;
        this.getAsignador(nombreUsuario);
      },
      err => {
        console.log('Error ', err);
      });
  }

  getAsignador(nombreUsuario) {
    this.usuarioService.getUsuario(nombreUsuario)
      .subscribe(res => {
        this.asignador = res;
      },
      err => {
        console.log('Error', err);
      });
  }

  goBack() {
    this.location.back();
  }

}
