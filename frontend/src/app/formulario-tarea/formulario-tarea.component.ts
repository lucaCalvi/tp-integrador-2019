import { Component, OnInit } from '@angular/core';
import { TareaService } from '../services/tarea.service';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Location } from '@angular/common';
import { Tarea } from '../models/tarea';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-tarea',
  templateUrl: './formulario-tarea.component.html',
  styleUrls: ['./formulario-tarea.component.css']
})
export class FormularioTareaComponent implements OnInit {

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
    this.form = new FormGroup({
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      fechaInicio: new FormControl('', Validators.required),
      fechaLimite: new FormControl('', Validators.required),
      lugar: new FormControl('', Validators.maxLength(20))
    });

    this.currentUserName = this.authService.getUser();
    this.currentTarea = this.route.snapshot.paramMap.get('idTarea');
    if(this.currentTarea){
      this.tareaService.getTarea(this.currentTarea)
      .subscribe(res => {
        this.tarea = res;
        this.loadForm();
      },
      err => {
        console.log('Error ', err);
      });
    }
  }

  insertTarea(){
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
  }

  loadTarea() {
    this.tarea.descripcion = this.form.controls.descripcion.value;
    let dateInicio = new Date(this.form.controls.fechaInicio.value).getDate() + 1;
    let monthInicio = new Date(this.form.controls.fechaInicio.value).getMonth() + 1;
    if(monthInicio > 9) {
      dateInicio = dateInicio + 1;
    }
    let yearInicio = new Date(this.form.controls.fechaInicio.value).getFullYear();
    this.tarea.fechaInicio = new Date(yearInicio + '-' + monthInicio + '-' + dateInicio);
    let dateLimite = new Date(this.form.controls.fechaLimite.value).getDate() + 1;
    let monthLimite = new Date(this.form.controls.fechaLimite.value).getMonth() + 1;
    if(monthLimite > 9) {
      dateLimite = dateLimite + 1;
    }
    let yearLimite = new Date(this.form.controls.fechaLimite.value).getFullYear();
    this.tarea.fechaLimite = new Date(yearLimite + '-' + monthLimite + '-' + dateLimite);
    this.tarea.lugar = this.form.controls.lugar.value;
    this.tarea.id_asignador = this.currentUserName;
  }

  loadForm() {
    this.form.controls.descripcion.setValue(this.tarea.descripcion);
    let dateInicio = (new Date(this.tarea.fechaInicio).getDate()).toString();
    if(dateInicio.length < 2) {
      dateInicio = '0' + dateInicio;
    }
    let monthInicio = (new Date(this.tarea.fechaInicio).getMonth() + 1).toString();
    if(monthInicio.length < 2) {
      monthInicio = '0' + monthInicio;
    }
    let yearInicio = new Date(this.tarea.fechaInicio).getFullYear();
    this.form.controls.fechaInicio.setValue(yearInicio + '-' + monthInicio + '-' + dateInicio);
    let dateLimite = (new Date(this.tarea.fechaLimite).getDate()).toString();
    if(dateLimite.length < 2) {
      dateLimite = '0' + dateLimite;
    }
    let monthLimite = (new Date(this.tarea.fechaLimite).getMonth() + 1).toString();
    if(monthLimite.length < 2) {
      monthLimite = '0' + monthLimite;
    }
    let yearLimite = new Date(this.tarea.fechaLimite).getFullYear();
    this.form.controls.fechaLimite.setValue(yearLimite + '-' + monthLimite + '-' + dateLimite);
    this.form.controls.lugar.setValue(this.tarea.lugar);
  }

  resetForm() {
    this.form.controls.descripcion.setValue(null);
    this.form.controls.fechaInicio.setValue(null);
    this.form.controls.fechaLimite.setValue(null);
    this.form.controls.lugar.setValue(null);
  }

  goBack() {
    this.location.back();
  }

  updateTarea() {
    this.loadTarea();
    this.tareaService.updateTarea(this.tarea)
    .subscribe(() => {
      this.goBack();
    },
    err => {
      console.log('Error ', err);
    });
  }
}
