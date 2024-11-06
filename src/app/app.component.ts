import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignupComponent } from "./page/signup/signup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SignupComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corregido a styleUrls
})
export class AppComponent {
  title = 'Sistema-examenes-frontend';
}
