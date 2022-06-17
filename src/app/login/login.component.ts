import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginServiceService } from './services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _fb: FormBuilder,
    private _ls: LoginServiceService,
    private _snackBar: MatSnackBar) { }

  form = this._fb.group({
    email: [, [Validators.required, Validators.email]],
    password: [, Validators.required],
    rememberMe: [false]
  })

  get email() {
    return this.form.get('email')
  }
  get password() {
    return this.form.get('password')
  }
  get rememberMe() {
    return this.form.get('rememberMe')
  }

  ngOnInit(): void {
  }

  login(): void {
    this._ls.login(JSON.stringify(this.form.value)).subscribe((res: any) => {
      if (JSON.parse(this.rememberMe?.value)) {
        window.localStorage.setItem('auth', res.id_token)
        this._snackBar.open('Login successful', 'ok', {duration: 3000})
      } else {
        window.sessionStorage.setItem('auth', res.id_token)
        this._snackBar.open('Login successful', 'ok', {duration: 3000})
      }
    })
  }

}
