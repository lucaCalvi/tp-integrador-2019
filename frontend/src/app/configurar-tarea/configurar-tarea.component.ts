import { Component, OnInit } from '@angular/core';
import { TareaService } from '../services/tarea.service';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Location } from '@angular/common';
import { Tarea } from '../models/tarea';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-configurar-tarea',
  templateUrl: './configurar-tarea.component.html',
  styleUrls: ['./configurar-tarea.component.css']
})
export class ConfigurarTareaComponent implements OnInit {
  tarea: any = null;
  form: FormGroup;
  currentUserName: string = null;
  currentTarea: string = null;

  constructor(
    private location: Location,
    private tareaService: TareaService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit() {
    this.currentUserName = this.authService.getUser();
    this.route.queryParams.subscribe((params: Params) => {
      this.currentTarea = this.route.snapshot.params.idTarea;
    });
  }

/*  insertTarea(){
    this.tarea = null;
    this.tarea = new Tarea();
    this.loadTarea();
    this.tareaService.insertTarea(this.tarea)
      .subscribe(() => {
          this.goBack();
        },
        err => {
          console.log('Error ', err);
        });
  }*/

goBack() {
    this.location.back();
  }
   loadTarea(form) {
     this.tarea.descripcion = form.descripcion.value;
     this.tarea.fechaInicio = new Date(form.fechaInicio.value);
     this.tarea.fechaInicio.setMinutes(this.tarea.fechaInicio.getTimezoneOffset());
     this.tarea.fechaLimite = new Date(form.fechaLimite.value);
     this.tarea.fechaLimite.setMinutes(this.tarea.fechaLimite.getTimezoneOffset());
     this.tarea.lugar = form.lugar.value;
     this.tarea.id_asignador = this.authService.getUser();
   }

  updateTarea(form) {
    this.tarea = form.value;
    this.tarea.id_asignador = this.authService.getUser();
    console.log( this.tarea);


    console.log(this.currentTarea);
    this.tareaService.updateTarea(form.value, this.currentTarea)
      .subscribe(() => {
          this.goBack();
        },
        err => {
          console.log('Error ', err);
        });
  }
  /*updateTarea(form) {
    this.loadTarea();
    this.tareaService.updateTarea(this.tarea)
      .subscribe(() => {
          this.goBack();
        },
        err => {
          console.log('Error ', err);
        });
  }*/
}
