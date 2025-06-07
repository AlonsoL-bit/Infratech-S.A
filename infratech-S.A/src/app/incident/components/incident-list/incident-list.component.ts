import { Component, OnInit, inject } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Incidente } from '../../services/incident.service';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent implements OnInit {
  private incidentService = inject(IncidentService);
  private route = inject(ActivatedRoute);

  incidentesFiltrados: any[] = [];

  actualizarEstado(incidente: Incidente) {
  if (incidente.estado === 'Resuelto') {
    incidente.fechaResolucion = new Date().toISOString().split('T')[0];
  } else {
    incidente.fechaResolucion = undefined;
  }

  const incidentes = this.incidentService.incidentesSubject.value.map(i =>
    i === incidente ? incidente : i
  );

  this.incidentService.incidentesSubject.next(incidentes);
}


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
