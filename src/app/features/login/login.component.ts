import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error!: string;
  loading!: boolean;
  hidePassword: boolean = true;
  private destroyRef = inject(DestroyRef);

  constructor(
    private _fb: FormBuilder,
    private _loginService: LoginService,
    private toastService: ToastrService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.loginForm = this._fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const { login, password } = this.loginForm.value;

      this._loginService
        .login(login, password)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.loading = false;
            this.toastService.success('Login efetuado com sucesso!');
            this._router.navigate(['/dashboard']);
          },
          error: (err) => {
            this.loading = false;
            this.resetCaptcha();
            switch (err.error.status) {
              case 403:
                this.toastService.error(err.error.detail);
                break;
              default:
                this.toastService.error('Erro inesperado! Tente novamente');
                break;
            }
          },
        });
    }
  }

  private resetCaptcha() {
    this.loginForm.get('recaptcha')?.setValue(null);
    this.loginForm.get('recaptcha')?.updateValueAndValidity();
  }
}
