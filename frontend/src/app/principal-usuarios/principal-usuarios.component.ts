import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AsignacionService } from '../services/asignacion.service';

@Component({
  selector: 'app-principal-usuarios',
  templateUrl: './principal-usuarios.component.html',
  styleUrls: ['./principal-usuarios.component.css']
})
export class PrincipalUsuariosComponent implements OnInit {

  usuarios$: any = null;
  usuarioSesion: any = null;
  currentUser: string = localStorage.getItem("USUARIO");
  currentTarea: any = null;
  asignacionesTarea: any = null;
  usuariosAsignados = [];
  URL_API = 'http://localhost:3000/';

  constructor(
    private usuarioService: UsuarioService, 
    private route: ActivatedRoute, 
    private location: Location, 
    private asignacionService: AsignacionService) { }

  ngOnInit() {
  }

  updateList(users: Observable<Object>){
    this.usuarios$ = users;
  }
}
