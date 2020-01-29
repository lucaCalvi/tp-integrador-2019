export class Usuario {

    nombre: string;
    apellido: string;
    email: string;
    nombreUsuario: string;
    contraseña: string;
    informacion: string;
    contactos: [];

    constructor(){
        this.nombre = '';
        this.apellido = '';
        this.email = '';
        this.nombreUsuario = '';
        this.contraseña = '';
        this.informacion = '';
        this.contactos = [];
    }
}
