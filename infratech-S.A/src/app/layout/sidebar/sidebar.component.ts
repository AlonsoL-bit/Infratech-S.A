import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IncidentService } from '../../incident/services/incident.service';
import { generarPDF } from '../../utils/pdf-utils';


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


  descargarInformePDF() {
    this.incidentService.incidentes$.subscribe(incidentes => {
      generarPDF('Informe completo de incidentes', incidentes);
    }).unsubscribe(); 
  }
  
  constructor(private incidentService: IncidentService) {
    this.incidentService.incidentes$.subscribe((data) => {
      this.cantidad = data.length;
    });
  }
}
