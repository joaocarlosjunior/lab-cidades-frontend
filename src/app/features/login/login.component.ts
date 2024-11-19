import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  error!: string;

  constructor(private _fb: FormBuilder){

  }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
    console.log(this.loginForm.value);
  }
}
