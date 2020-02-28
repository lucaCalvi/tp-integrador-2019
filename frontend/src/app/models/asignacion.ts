export class Asignacion {

    id_tarea: string;
    id_asignado: string;
    fechaFin: Date;
    estado: string;
    archivo: string;

    constructor(){
        this.id_tarea = '';
        this.id_asignado = '';
        this.fechaFin = null;
        this.estado = '';
        this.archivo = '';
    }
}
