import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Observable, of, empty, from } from 'rxjs';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

  usuarios$: any = null;

  usuarioSesion: any = null;

  currentUser = localStorage.getItem("USUARIO");

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getUsuarios();
    this.getUsuario();
  }

  getUsuarios() {
    this.usuarioService.getUsuarios()
      .subscribe(res => {
        this.usuarios$ = res;
      },
      err => {
        console.log('Error ', err);
      });
  }

  getUsuario() {
    this.usuarioService.getUsuario(this.currentUser)
      .subscribe(res => {
        this.usuarioSesion = res;
        console.log(this.usuarioSesion.contactos.includes('juan_perez'));
      },
      err => {
        console.log('Error ', err);
      });
  }

  updateList(users: Observable<Object>){
    this.usuarios$ = users;
  }

  agregarContacto(contacto) {
    this.usuarioService.agregarContacto(this.currentUser, contacto)
      .subscribe(() => {
        this.getUsuario();
      },
      err => {
        console.log('Error ', err);
      });
  }

  eliminarContacto(contacto) {
    this.usuarioService.eliminarContacto(this.currentUser, contacto)
      .subscribe(() => {
        this.getUsuario();
      },
      err => {
        console.log('Error ', err);
      });
  }
}
