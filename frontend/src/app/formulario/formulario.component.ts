import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';

interface htmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  @Input() err: string;
  currentUser: string = localStorage.getItem("USUARIO");
  form: FormGroup;
  file: File = null;
  photoSelected: string | ArrayBuffer = null;
  URL_API = 'http://localhost:3000/';

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.form = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      nombreUsuario: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      contrasenia: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      informacion: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      foto: new FormControl(''),
      selectedFileText: new FormControl('')
    });

    if(this.currentUser) {
      this.loadForm();
    }
  }

  resetForm() {
    this.photoSelected = null;
    this.err = null;
  }

  resetPhoto() {
    this.photoSelected = null;
    this.form.controls.selectedFileText.setValue('');
  }

  onPhotoSelected(event: htmlInputEvent): void {
    if(event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      //image preview
      const reader = new FileReader();
      reader.onload = e => {
        this.photoSelected = reader.result;
        this.loadFoto(this.photoSelected);
      }
      reader.readAsDataURL(this.file);
    }
  }

  loadFoto(photoSelected) {
    if(photoSelected && photoSelected[22] == ',') {
      this.form.controls.foto.setValue(photoSelected.slice(23));
    }
    else if(photoSelected && photoSelected[21] == ',') {
      this.form.controls.foto.setValue(photoSelected.slice(22));
    }
    else if(photoSelected) {
      this.form.controls.foto.setValue(photoSelected.slice(22));
    }
    else {
      this.form.controls.foto.setValue(null);
    }
  }

  loadForm() {
    this.usuarioService.getUsuario(this.currentUser)
      .subscribe(res => {
        let usuario: any = res;
        this.form.controls.nombre.setValue(usuario.nombre);
        this.form.controls.apellido.setValue(usuario.apellido);
        this.form.controls.email.setValue(usuario.email);
        this.form.controls.nombreUsuario.setValue(usuario.nombreUsuario);
        this.form.controls.informacion.setValue(usuario.informacion);
        if(usuario.foto) {
          this.form.controls.foto.setValue(usuario.foto);
          this.photoSelected = this.URL_API + usuario.foto;
        }
        else {
          this.form.controls.foto.setValue(null);
          this.photoSelected = null;
        }
      });
  }

}
