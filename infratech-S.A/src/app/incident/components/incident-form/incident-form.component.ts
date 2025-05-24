import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncidentService } from '../../services/incident.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-incident-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.css'],
})
export class IncidentFormComponent {
  nuevoIncidente = {
    tipo: '',
    area: '',
    descripcion: '',
    estado: 'Nuevo',
    prioridad: 'Media',
    fecha: new Date().toISOString().split('T')[0],
  };

  incidentService = inject(IncidentService);
  snackBar = inject(MatSnackBar);

  registrarIncidente() {
    this.incidentService.agregarIncidente({ ...this.nuevoIncidente });

    this.snackBar.open('✅ Incidente registrado correctamente.', 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'snackbar-success',
    });

    this.nuevoIncidente = {
      tipo: '',
      area: '',
      descripcion: '',
      estado: 'Nuevo',
      prioridad: 'Media',
      fecha: new Date().toISOString().split('T')[0],
    };
  }
}
