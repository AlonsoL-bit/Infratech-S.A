import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Incident } from '../../../core/models/incident.model';
import { TaskService } from '../../../core/services/task.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css'],
  imports: [CommonModule, FormsModule, MatSnackBarModule, MatListModule, MatIconModule, MatChipsModule, MatSelectModule, MatCardModule, MatDatepickerModule,MatInputModule, MatNativeDateModule]
})
export class IncidentListComponent implements OnInit, OnDestroy {
  incidentes: Incident[] = [];
  filtroEstado: string = '';
  filtroPrioridad: string = '';
  filtroArea: string = '';
  filtroTipo: string = '';
  fechaDesde: Date | null = null;
  fechaHasta: Date | null = null;
  incidentesFiltrados: Incident[] = [];
  tiposDisponibles: string[] = [];

  private incidentesSubscription: Subscription = new Subscription();

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  cambiarEstado(id: number, nuevoEstado: 'Nuevo' | 'En Proceso' | 'Resuelto'): void {
    this.taskService.actualizarEstado(id, nuevoEstado);
  }

  ngOnInit(): void {
  this.taskService.getIncidentes().subscribe({
    next: (datos) => {
      this.incidentes = datos;
      this.actualizarTiposDisponibles();
      this.aplicarFiltros();
    },
    error: () => {
      this.mostrarError('Error al cargar los incidentes.');
    }
  });
}

getPrioridadColor(prioridad: string): 'primary' | 'accent' | 'warn' {
  switch (prioridad) {
    case 'Alta': return 'warn';
    case 'Media': return 'accent';
    case 'Baja': return 'primary';
    default: return 'primary';
  }
}

getEstadoColor(estado: string): 'primary' | 'accent' | 'warn' {
  switch (estado) {
    case 'Nuevo': return 'primary';
    case 'En Proceso': return 'accent';
    case 'Resuelto': return 'warn';
    default: return 'primary';
  }
}

  ngOnDestroy(): void {
    this.incidentesSubscription.unsubscribe();
  }

  mostrarError(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000
    });
  }

  actualizarTiposDisponibles(): void {
  const tiposSet = new Set<string>();
  this.incidentes.forEach(inc => {
    if (inc.tipo && inc.tipo.trim() !== '') {
      tiposSet.add(inc.tipo);
    }
  });
  this.tiposDisponibles = Array.from(tiposSet).sort();
}

  aplicarFiltros(): void {
  this.incidentesFiltrados = this.incidentes.filter(incidente =>
    (this.filtroTipo === '' || incidente.tipo === this.filtroTipo) &&
    (this.filtroEstado === '' || incidente.estado === this.filtroEstado) &&
    (this.filtroPrioridad === '' || incidente.prioridad === this.filtroPrioridad) &&
    (this.filtroArea === '' || incidente.area === this.filtroArea)&&
    (!this.fechaDesde || new Date(incidente.fechaCreacion) >= this.fechaDesde) &&
    (!this.fechaHasta || new Date(incidente.fechaCreacion) <= this.fechaHasta)
  );
}
obtenerAreasUnicas(): string[] {
  const areas = this.incidentes.map(i => i.area);
  return [...new Set(areas)];
}
esAntiguoNoResuelto(incidente: Incident): boolean {
  if (incidente.estado === 'Resuelto') {
    return false;
  }

  const fechaCreacion = new Date(incidente.fechaCreacion);
  const ahora = new Date();
  const horasDiferencia = (ahora.getTime() - fechaCreacion.getTime()) / (1000 * 60 * 60);

  return horasDiferencia > 48;
}

calcularTiempoResolucion(incidente: Incident): string | null {
  if (incidente.estado !== 'Resuelto' || !incidente.fechaActualizacion) {
    return null;
  }

  const fechaInicio = new Date(incidente.fechaCreacion).getTime();
  const fechaFin = new Date(incidente.fechaActualizacion).getTime();
  const diferenciaMs = fechaFin - fechaInicio;

  const horas = Math.floor(diferenciaMs / (1000 * 60 * 60));
  const dias = Math.floor(horas / 24);

  return dias > 0
    ? `${dias} día(s) y ${horas % 24} hora(s)`
    : `${horas} hora(s)`;
}



}



