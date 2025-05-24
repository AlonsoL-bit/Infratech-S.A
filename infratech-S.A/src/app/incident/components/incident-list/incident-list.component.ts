import { Component, OnInit, inject } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent implements OnInit {
  private incidentService = inject(IncidentService);
  private route = inject(ActivatedRoute);

  incidentesFiltrados: any[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const estado = params['estado'];
      this.incidentService.incidentes$.subscribe(incidentes => {
        this.incidentesFiltrados = estado
          ? incidentes.filter(i => i.estado === estado)
          : incidentes;
      });
    });
  }
}
