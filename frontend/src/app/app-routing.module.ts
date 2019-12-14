import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { MenuComponent } from './menu/menu.component';
import { ListadoTareasAsignadasComponent } from './listado-tareas-asignadas/listado-tareas-asignadas.component';
import { DetalleTareaComponent } from './detalle-tarea/detalle-tarea.component';
import { FormularioComponent } from './formulario/formulario.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/api/login', pathMatch: 'full' },
  { path: 'api/usuarios', component: ListadoUsuariosComponent },
  { path: 'api/usuarios/:nombreUsuario', component: DetalleUsuarioComponent },
  { path: 'api/usuarios/:nombreUsuario/tareas', component: ListadoTareasAsignadasComponent },
  { path: 'api/usuarios/:nombreUsuario/tareas/:idTarea', component: DetalleTareaComponent },
  { path: 'api/agregar-usuario', component: FormularioComponent },
  { path: 'api/login', component:LoginComponent }
  //{ path: 'api/menu', component: MenuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
