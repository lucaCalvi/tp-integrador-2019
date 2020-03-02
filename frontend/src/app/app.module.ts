import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { ListadoTareasAsignadasComponent } from './listado-tareas-asignadas/listado-tareas-asignadas.component';
import { DetalleTareaComponent } from './detalle-tarea/detalle-tarea.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { FormularioComponent } from './formulario/formulario.component';
import { LoginComponent } from './login/login.component';
import { ListadoTareasCreadasComponent } from './listado-tareas-creadas/listado-tareas-creadas.component';
import { FormularioTareaComponent } from './formulario-tarea/formulario-tarea.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { ConfigurarUsuarioComponent } from './configurar-usuario/configurar-usuario.component';
import { PrincipalUsuariosComponent } from './principal-usuarios/principal-usuarios.component';
import { AsignarTareaComponent } from './asignar-tarea/asignar-tarea.component';

@NgModule({
  declarations: [
    AppComponent,
    ListadoUsuariosComponent,
    DetalleUsuarioComponent,
    MenuComponent,
    ListadoTareasAsignadasComponent,
    DetalleTareaComponent,
    SearchBoxComponent,
    FormularioComponent,
    LoginComponent,
    ListadoTareasCreadasComponent,
    FormularioTareaComponent,
    RegistrarUsuarioComponent,
    ConfigurarUsuarioComponent,
    PrincipalUsuariosComponent,
    AsignarTareaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }