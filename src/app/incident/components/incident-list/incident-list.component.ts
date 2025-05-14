import { Component, OnInit } from '@angular/core';
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
export class IncidentListComponent implements OnInit {
  incidentes: Incident[] = [];

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    try {
      this.incidentes = this.taskService.getIncidentes();
    } catch (error) {
      this.mostrarError('Error al cargar los incidentes.');
    }
  }

  mostrarError(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000
    });
  }
}


