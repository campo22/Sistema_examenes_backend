// signup.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  private _apiUserService = inject(UserService);
  registrationSuccess = false;


  public user = {
    username: '',
    password: '',
    name: '',
    lastname: '',
    email: '',
    phone: ''

  }





  constructor(private fb: FormBuilder,) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  ngOnInit(): void { }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);

      // Simulate API call
      this._apiUserService.posUser(this.signupForm.value).subscribe(
        (data) => {
          console.log(data);
          console.log("Datos enviados de manera correcta");
          this.registrationSuccess = true;
        },
        (error) => {
          console.log("Error al enviar los datos" + error)
        }
      );
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  get username() { return this.signupForm.get('username'); }
  get name() { return this.signupForm.get('name'); }
  get lastName() { return this.signupForm.get('lastName'); }
  get phone() { return this.signupForm.get('phone'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }


}
