import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  err: any = null;

  constructor(
    private location: Location, 
    private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  insertUsuario(form) {
    this.usuarioService.insertUsuario(form.value)
      .subscribe(() => {
        this.goBack();
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
