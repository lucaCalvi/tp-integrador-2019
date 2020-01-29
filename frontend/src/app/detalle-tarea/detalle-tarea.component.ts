import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.component.html',
  styleUrls: ['./detalle-tarea.component.css']
})
export class DetalleTareaComponent implements OnInit {

  tarea: any = null;
  asignador: any = null;

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
        this.getAsignador(this.tarea.id_asignador);
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
