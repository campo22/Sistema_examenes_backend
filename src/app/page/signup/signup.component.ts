import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../Services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  private _router = inject(Router);

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
      if (Object.values(formData).every(x => x !== null && x !== '')) {
        this._apiUserService.posUser(formData).subscribe(
          (data) => {
            console.log(data);
            console.log("Datos enviados de manera correcta");
            this.showSuccessAlert();
            this.resetForm();
          },
          (error) => {
            console.log("Error al enviar los datos" + error);
            this.showErrorAlert('Ha ocurrido un error al enviar tu información');
          }
        );
      } else {
        this.showErrorAlert('Por favor, complete todos los campos');
      }
    } else {
      this.signupForm.markAllAsTouched();
      this.showErrorMessage('Por favor, corrija los errores en el formulario');
    }
  }

  showSuccessAlert() {
    Swal.fire({
      title: '¡Registro Exitoso!',
      html: `
        <p>Bienvenido a nuestra plataforma de exámenes en línea, donde <strong>facilitamos la gestión y realización de evaluaciones</strong> para
        estudiantes y profesores.</p>
        <p>Con nuestra herramienta, los profesores pueden <strong>crear y administrar exámenes fácilmente</strong>, mientras que los estudiantes
        pueden acceder a sus evaluaciones de manera digital, asegurando que siempre estén disponibles y organizadas.</p>
        <p>Di adiós a los exámenes en papel y a las calificaciones manuales: ahora, tus evaluaciones estarán al alcance de un clic,
        simplificando el proceso de aprendizaje y mejorando tu experiencia educativa.</p>
      `,
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ir al Login',
      cancelButtonText: 'Cerrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(['/login']);
      }
    });
  }

  showErrorAlert(message: string) {
    Swal.fire('¡Error!', message, 'error');
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
