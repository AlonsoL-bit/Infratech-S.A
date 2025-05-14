import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IncidentFormComponent } from "./incident/components/incident-form/incident-form.component";
import { IncidentListComponent } from "./incident/components/incident-list/incident-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IncidentFormComponent, IncidentListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'infratech-frontend';
}
