import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-tarea',
  templateUrl: './formulario-tarea.component.html',
  styleUrls: ['./formulario-tarea.component.css']
})
export class FormularioTareaComponent implements OnInit {

  asignados:Array<String> = [];
  arreglo = ["usuario1","usuario2","usuario3"];

  constructor() { }

  ngOnInit() {
  }

  insertTarea() {
    console.log(this.asignados);
    console.log(this.arreglo);
  }

}
