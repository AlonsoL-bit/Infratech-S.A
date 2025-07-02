import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncidentService } from '../../services/incident.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Incidente } from '../../../incident/interfaces/incidente.model';

@Component({
  selector: 'app-incident-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.css'],
})
export class IncidentFormComponent {
  nuevoIncidente: Incidente = {
    tipo: '',
    area: '',
    descripcion: '',
    estado: 'Nuevo',
    prioridad: 'Media',
    responsable: '',
    fecha: new Date().toISOString(), // ✅ Completa la fecha
  };

  tecnicos: string[] = ['Alonso Labbé', 'Benjamín Barraza', 'Ignacio Neira'];
  incidentService = inject(IncidentService);
  snackBar = inject(MatSnackBar);

  registrarIncidente() {
    this.incidentService.agregarIncidente({ ...this.nuevoIncidente }).subscribe({
      next: () => {
        this.snackBar.open('✅ Incidente registrado correctamente.', 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'snackbar-success',
        });

        // Reiniciar el formulario
        this.nuevoIncidente = {
          tipo: '',
          area: '',
          descripcion: '',
          estado: 'Nuevo',
          prioridad: 'Media',
          responsable: '',
          fecha: new Date().toISOString(),
        };
      },
      error: () => {
        this.snackBar.open('❌ Error al registrar el incidente.', 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'snackbar-error',
        });
      }
    });
  }
}
