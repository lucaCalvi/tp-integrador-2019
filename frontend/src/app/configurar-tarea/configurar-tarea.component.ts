import { Component, OnInit } from '@angular/core';
import { TareaService } from '../services/tarea.service';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Location } from '@angular/common';
import { Tarea } from '../models/tarea';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-configurar-tarea',
  templateUrl: './configurar-tarea.component.html',
  styleUrls: ['./configurar-tarea.component.css']
})
export class ConfigurarTareaComponent implements OnInit {

  constructor(
    private location: Location,
    private tareaService: TareaService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit() {
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

  updateTarea(form) {

    this.tareaService.updateTarea(form.value)
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
