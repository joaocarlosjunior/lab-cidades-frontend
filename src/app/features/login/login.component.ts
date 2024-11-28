import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  error!: string;

  constructor(
    private _fb: FormBuilder,
    private _loginService: LoginService,
    private toastService: ToastrService,
    private _router: Router
  ){}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
  if (this.loginForm.valid) {
    const { login, password } = this.loginForm.value;

    this._loginService.login(login, password).subscribe({
      next: () =>{
        this.toastService.success("Login efetuado com sucesso!");
        this._router.navigate(['/dashboard']);
      },
      error: (err) =>{
        switch(err.error.status){
          case 401:
            this.toastService.error(err.error.detail);
            break;
          default:
            this.toastService.error("Erro inesperado! Tente novamente mais tarde");
            break;
        }
      }
    });
  }
  }
}
