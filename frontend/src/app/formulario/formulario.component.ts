import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  usuario: Usuario = null;
  nombre = null;
  apellido = null;
  nombreUsuario = null;
  contrasenia = null;
  email = null;
  informacion = null;

  constructor(private location: Location, private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  insertUsuario(){
    this.loadUsuario();
    this.usuarioService.insertUsuario(this.usuario)
      .subscribe(() => {
        this.goBack();
      },
      err => {
        console.log('Error ', err);
      });
  }

  loadUsuario(){
    this.usuario = new Usuario();
    this.usuario.nombre = this.nombre;
    this.usuario.apellido = this.apellido;
    this.usuario.email = this.email;
    this.usuario.nombreUsuario = this.nombreUsuario;
    this.usuario.contraseña = this.contrasenia;
    this.usuario.informacion = this.informacion;
  }

  resetForm() {
    this.nombre = '';
    this.apellido = '';
    this.email = '';
    this.nombreUsuario = '';
    this.contrasenia = '';
    this.informacion = '';
  }

  goBack(){
    this.location.back();
  }

}
