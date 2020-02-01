import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { FormGroup, Validators, FormControl } from '@angular/forms';

interface htmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  usuario: any = null;
  form: FormGroup;
  currentUserName: string = null;
  err: string = null;
  file: File = null;
  photoSelected: string | ArrayBuffer = null;
  URL_API = 'http://localhost:3000/';

  constructor(
    private location: Location, 
    private usuarioService: UsuarioService, 
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      nombreUsuario: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      contrasenia: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      informacion: new FormControl('', [Validators.required, Validators.maxLength(20)])
    });

    this.currentUserName = localStorage.getItem("USUARIO");
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
        this.usuario = null;
        this.err = err.error.error;
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
    if(this.photoSelected && this.photoSelected[22] == ',') {
      this.usuario.foto = this.photoSelected.slice(23);
    }
    else if(this.photoSelected && this.photoSelected[21] == ',') {
      this.usuario.foto = this.photoSelected.slice(22);
    }
    else {
      this.usuario.foto = null;
    }
  }

  loadForm() {
    this.form.controls.nombre.setValue(this.usuario.nombre);
    this.form.controls.apellido.setValue(this.usuario.apellido);
    this.form.controls.email.setValue(this.usuario.email);
    this.form.controls.nombreUsuario.setValue(this.usuario.nombreUsuario);
    this.form.controls.informacion.setValue(this.usuario.informacion);
    if(this.usuario.foto){
      this.photoSelected = this.URL_API + this.usuario.foto;
    }
    else {
      this.photoSelected = null;
    }
  }

  resetForm() {
    this.form.controls.nombre.setValue(null);
    this.form.controls.apellido.setValue(null);
    this.form.controls.email.setValue(null);
    this.form.controls.nombreUsuario.setValue(null);
    this.form.controls.contrasenia.setValue(null);
    this.form.controls.informacion.setValue(null);
    this.photoSelected = null;
    this.err = null;
  }

  goBack() {
    this.location.back();
  }

  updateUsuario() {
    this.loadUsuario();
    this.usuarioService.updateUsuario(this.usuario, this.currentUserName)
    .subscribe(() => {
      localStorage.setItem("USUARIO", this.usuario.nombreUsuario);
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

  onPhotoSelected(event: htmlInputEvent): void {
    if(event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      //image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

}
