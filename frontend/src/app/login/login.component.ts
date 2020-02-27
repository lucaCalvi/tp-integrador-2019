import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  frmLogin: FormGroup;
  err: string = null;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.frmLogin = new FormGroup({
      nombreUsuario: new FormControl(''),
      contraseña: new FormControl('')
    });

    this.authService.logout();
  }

  login(form) {
    this.authService.login(form.value).subscribe( res => {
      this.router.navigateByUrl('/api/usuarios');
    },
    err => {
      this.err = err.error.error;
      console.log('Error ', err);
    });
  }

}
