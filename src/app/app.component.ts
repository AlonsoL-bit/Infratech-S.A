import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IncidentFormComponent } from "./incident/components/incident-form/incident-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IncidentFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'infratech-frontend';
}
