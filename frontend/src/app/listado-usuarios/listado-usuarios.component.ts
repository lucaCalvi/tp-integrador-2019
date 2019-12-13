import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Observable, of, empty, from } from 'rxjs';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

  usuarios$: any = null;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getUsuarios();
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

  updateList(users: Observable<Object>){
    this.usuarios$ = users;
  }
}
