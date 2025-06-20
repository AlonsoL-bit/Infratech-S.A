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

  getTiempoResolucion(incidente: Incidente): string {
  if (!incidente.fecha || !incidente.fechaResolucion) return '—';

  const inicio = new Date(incidente.fecha);
  const fin = new Date(incidente.fechaResolucion);
  const diffMs = fin.getTime() - inicio.getTime();

  const diffHoras = diffMs / (1000 * 60 * 60);

  if (diffHoras < 24) {
    return `${Math.floor(diffHoras)} hora(s)`;
  } else {
    const dias = Math.floor(diffHoras / 24);
    return `${dias} día(s)`;
  }
  }

  filtro = {
    tipo: '',
    estado: '',
    prioridad: '',
    responsable:''
  };

  tipoOpciones: string[] = [];
  fechaDesde: string = '';
  fechaHasta: string = '';
  responsablesOpciones: string[] = [];


  get incidentesFiltradosFinal() {
  return this.incidentesFiltrados.filter(i => {
    const fechaValidaDesde = !this.fechaDesde || i.fecha >= this.fechaDesde;
    const fechaValidaHasta = !this.fechaHasta || i.fecha <= this.fechaHasta;

    return (
      (!this.filtro.responsable || i.responsable === this.filtro.responsable) &&
      (!this.filtro.tipo || i.tipo === this.filtro.tipo) &&
      (!this.filtro.estado || i.estado === this.filtro.estado) &&
      (!this.filtro.prioridad || i.prioridad === this.filtro.prioridad) &&
      fechaValidaDesde &&
      fechaValidaHasta
    );
  });
}



  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const estado = params['estado'];
      this.incidentService.incidentes$.subscribe(incidentes => {
        this.incidentesFiltrados = estado
          ? incidentes.filter(i => i.estado === estado)
          : incidentes;

        this.tipoOpciones = [...new Set(incidentes.map(i => i.tipo))];
        this.responsablesOpciones = [...new Set(incidentes.map(i => i.responsable))];

        });
      });
    }
  }
