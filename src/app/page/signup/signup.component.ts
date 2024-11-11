import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  private _apiUserService = inject(UserService);
  private _snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      // Verificar que ningún campo esté vacío
      if (Object.values(formData).every(x => x !== null && x !== '')) {
        this._apiUserService.posUser(formData).subscribe(
          (data) => {
            console.log(data);
            console.log("Datos enviados de manera correcta");
            Swal.fire('¡Bien hecho!', 'Se ha enviado tu información de manera correcta', 'success');
            // this.showSuccessMessage();
            this.resetForm();
          },
          (error) => {
            console.log("Error al enviar los datos" + error);
            Swal.fire('¡Error!', 'Ha ocurrido un error al enviar tu información', 'error');
            // this.showErrorMessage();
          }
        );
      } else {
        Swal.fire('Por favor, complete todos los campos', 'error');
        // this.showErrorMessage('Por favor, complete todos los campos');
      }
    } else {
      this.signupForm.markAllAsTouched();
      this.showErrorMessage('Por favor, corrija los errores en el formulario');
    }
  }

  showSuccessMessage() {
    this._snackBar.open('Registro exitoso', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  showErrorMessage(message: string = 'Error en el registro') {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  resetForm() {
    this.signupForm.reset();
    Object.keys(this.signupForm.controls).forEach(key => {
      this.signupForm.get(key)?.setErrors(null);
    });
  }

  // Getters para acceder fácilmente a los form controls
  get username() { return this.signupForm.get('username'); }
  get name() { return this.signupForm.get('name'); }
  get lastname() { return this.signupForm.get('lastname'); }
  get phone() { return this.signupForm.get('phone'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
}
