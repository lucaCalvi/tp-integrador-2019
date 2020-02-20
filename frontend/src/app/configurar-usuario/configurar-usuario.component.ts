import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Location } from '@angular/common';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-configurar-usuario',
  templateUrl: './configurar-usuario.component.html',
  styleUrls: ['./configurar-usuario.component.css']
})
export class ConfigurarUsuarioComponent implements OnInit {

  currentUser: string = localStorage.getItem("USUARIO");;
  err: any = null;

  constructor(
    private location: Location, 
    private usuarioService: UsuarioService, 
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit() {
  }

  updateUsuario(form) {
    this.usuarioService.updateUsuario(form.value, this.currentUser)
    .subscribe(() => {
      localStorage.setItem("USUARIO", form.value.nombreUsuario);
      this.router.navigateByUrl('/api/usuarios');
    },
    err => {
      this.err = err.error.error;
      console.log('Error ', err);
    });
  }

  deleteUsuario(form) {
    if(isNullOrUndefined(form.value.contrasenia)) {
      form.value.contrasenia = null;
    }
    this.usuarioService.deleteUsuario(form.value, form.value.contrasenia)
    .subscribe(() => {
      this.authService.logout();
      this.router.navigateByUrl('/api/login');
    },
    err => {
      this.err = err.error.error;
      console.log('Error ', err);
    });
  }

  goBack() {
    this.location.back();
  }

}
