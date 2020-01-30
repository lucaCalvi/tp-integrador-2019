import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { MenuComponent } from './menu/menu.component';
import { ListadoTareasAsignadasComponent } from './listado-tareas-asignadas/listado-tareas-asignadas.component';
import { DetalleTareaComponent } from './detalle-tarea/detalle-tarea.component';
import { FormularioComponent } from './formulario/formulario.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ListadoTareasCreadasComponent } from './listado-tareas-creadas/listado-tareas-creadas.component';
import { FormularioTareaComponent } from './formulario-tarea/formulario-tarea.component';

const routes: Routes = [
  { path: '', redirectTo: '/api/login', pathMatch: 'full' },
  { path: 'api/usuarios', component: ListadoUsuariosComponent, canActivate: [AuthGuard] },
  { path: 'api/usuarios/:nombreUsuario', component: DetalleUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'api/usuarios/:nombreUsuario/asignaciones', component: ListadoTareasAsignadasComponent, canActivate: [AuthGuard] },
  { path: 'api/usuarios/:nombreUsuario/asignaciones/:idTarea', component: DetalleTareaComponent, canActivate: [AuthGuard] },
  { path: 'api/usuario/registrar', component: FormularioComponent },
  { path: 'api/usuarios/:nombreUsuario/modificar', component: FormularioComponent, canActivate: [AuthGuard] },
  { path: 'api/login', component: LoginComponent },
  { path: 'api/usuarios/:nombreUsuario/tareas', component: ListadoTareasCreadasComponent, canActivate: [AuthGuard] },
  { path: 'api/tareas/registrar', component: FormularioTareaComponent, canActivate: [AuthGuard] },
  { path: 'api/tareas/:idTarea/modificar', component: FormularioTareaComponent, canActivate: [AuthGuard] },
  { path: 'api/asignaciones/:idTarea', component: ListadoUsuariosComponent, canActivate: [AuthGuard] },
  { path: 'api/usuarios/:nombreUsuario/tareas-pendientes/:estado', component: ListadoTareasAsignadasComponent, canActivate: [AuthGuard] },
  { path: 'api/usuarios/:nombreUsuario/tareas-completas/:estado', component: ListadoTareasAsignadasComponent, canActivate: [AuthGuard] }
  //{ path: 'api/menu', component: MenuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
