import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IncidentService } from '../../incident/services/incident.service';
import { generarPDF } from '../../utils/pdf-utils';
import { Incidente } from '../../incident/interfaces/incidente.model'; 

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  visible = false;
  cantidad = 0;

  constructor(private incidentService: IncidentService) {
    this.incidentService.getIncidentes().subscribe((data: Incidente[]) => {
      this.cantidad = data.length;
    });
  }

  descargarInformePDF() {
    this.incidentService.getIncidentes().subscribe((incidentes: Incidente[]) => {
      generarPDF('Informe completo de incidentes', incidentes);
    });
  }
}

