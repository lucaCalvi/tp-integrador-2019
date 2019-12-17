import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  usuario = null;

  nombre = null;
  apellido = null;
  nombreUsuario = null;
  contrasenia = null;
  email = null;
  informacion = null;

  currentUserName = null;

  constructor(
    private location: Location, 
    private usuarioService: UsuarioService, 
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit() {
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
    this.usuario.nombre = this.nombre;
    this.usuario.apellido = this.apellido;
    this.usuario.email = this.email;
    this.usuario.nombreUsuario = this.nombreUsuario;
    this.usuario.contraseña = this.contrasenia;
    this.usuario.informacion = this.informacion;
  }

  loadForm() {
    this.nombre = this.usuario.nombre;
    this.apellido = this.usuario.apellido;
    this.email = this.usuario.email;
    this.nombreUsuario = this.usuario.nombreUsuario;
    this.informacion = this.usuario.informacion;
  }

  resetForm() {
    this.nombre = '';
    this.apellido = '';
    this.email = '';
    this.nombreUsuario = '';
    this.contrasenia = '';
    this.informacion = '';
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
      console.log('Error ', err);
    });
  }

  deleteUsuario() {
    this.usuarioService.deleteUsuario(this.usuario)
    .subscribe(() => {
      this.authService.logout();
      this.router.navigateByUrl('/api/login');
    },
    err => {
      console.log('Error ', err);
    });
  }

}
