export class Tarea {

    descripcion: string;
    fechaInicio: Date;
    fechaLimite: Date;
    lugar: string;
    id_asignador: string;

    constructor(){
        this.descripcion = '';
        this.fechaInicio = null;
        this.fechaLimite = null;
        this.lugar = '';
        this.id_asignador = '';
    }
}
