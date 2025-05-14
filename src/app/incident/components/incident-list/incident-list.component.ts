import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Incident } from '../../../core/models/incident.model';
import { TaskService } from '../../../core/services/task.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css'],
  imports: [CommonModule, MatSnackBarModule]
})
export class IncidentListComponent implements OnInit, OnDestroy {
  incidentes: Incident[] = [];
  private incidentesSubscription: Subscription = new Subscription();

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
  this.taskService.getIncidentes().subscribe({
    next: (datos) => {
      this.incidentes = datos;
    },
    error: () => {
      this.mostrarError('Error al cargar los incidentes.');
    }
  });
}

  ngOnDestroy(): void {
    // Cancelar la suscripción al destruir el componente
    this.incidentesSubscription.unsubscribe();
  }

  mostrarError(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000
    });
  }
}



