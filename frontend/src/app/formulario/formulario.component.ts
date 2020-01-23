import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  usuario = null;

  form: FormGroup;

  currentUserName = null;

  err = null;

  constructor(
    private location: Location, 
    private usuarioService: UsuarioService, 
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      nombreUsuario: new FormControl('', Validators.required),
      contrasenia: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      informacion: new FormControl('', Validators.required)
    });

    this.currentUserName = this.authService.getUser();
    if(this.currentUserName) {
      this.usuarioService.getUsuario(this.currentUserName)
      .subscribe(res => {
        this.usuario = res;
        this.loadForm();
      },
      err => {
        console.log('Error ', err);
      });
    }
  }

  insertUsuario(){
    this.usuario = null;
    this.usuario = new Usuario();
    this.loadUsuario();
    this.usuarioService.insertUsuario(this.usuario)
      .subscribe(() => {
        this.goBack();
      },
      err => {
        console.log('Error ', err);
      });
  }

  loadUsuario() {
    this.usuario.nombre = this.form.controls.nombre.value;
    this.usuario.apellido = this.form.controls.apellido.value;
    this.usuario.email = this.form.controls.email.value;
    this.usuario.nombreUsuario = this.form.controls.nombreUsuario.value;
    this.usuario.contraseña = this.form.controls.contrasenia.value;
    this.usuario.informacion = this.form.controls.informacion.value;
  }

  loadForm() {
    this.form.controls.nombre.setValue(this.usuario.nombre);
    this.form.controls.apellido.setValue(this.usuario.apellido);
    this.form.controls.email.setValue(this.usuario.email);
    this.form.controls.nombreUsuario.setValue(this.usuario.nombreUsuario);
    this.form.controls.informacion.setValue(this.usuario.informacion);
  }

  resetForm() {
    this.form.controls.nombre.setValue(null);
    this.form.controls.apellido.setValue(null);
    this.form.controls.email.setValue(null);
    this.form.controls.nombreUsuario.setValue(null);
    this.form.controls.contrasenia.setValue(null);
    this.form.controls.informacion.setValue(null);
    this.err = null;
  }

  goBack() {
    this.location.back();
  }

  updateUsuario() {
    this.loadUsuario();
    this.usuarioService.updateUsuario(this.usuario)
    .subscribe(() => {
      this.goBack();
    },
    err => {
      this.err = err.error.error;
      console.log('Error ', err);
    });
  }

  deleteUsuario() {
    if(isNullOrUndefined(this.form.controls.contrasenia.value)) {
      this.form.controls.contrasenia.setValue(null);
    }
    this.usuarioService.deleteUsuario(this.usuario, this.form.controls.contrasenia.value)
    .subscribe(() => {
      this.authService.logout();
      this.router.navigateByUrl('/api/login');
    },
    err => {
      this.err = err.error.error;
      console.log('Error ', err);
    });
  }

}
