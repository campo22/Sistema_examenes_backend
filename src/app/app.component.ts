import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SignupComponent } from "./page/signup/signup.component";
import { ReactiveFormsModule } from "@angular/forms";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SignupComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sistema-examenes-frontend';
}
