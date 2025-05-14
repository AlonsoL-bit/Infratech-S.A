import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Incident } from '../models/incident.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // Creamos un BehaviorSubject para los incidentes
  private incidentesSubject = new BehaviorSubject<Incident[]>([
    {
      id: 1,
      tipo: 'Red',
      area: 'TI',
      descripcion: 'Problemas de conexión',
      estado: 'Nuevo',
      fechaCreacion: new Date('2025-05-10T10:00:00'),
      prioridad: 'Alta',
      responsable: 'Juan Pérez'
    },
    {
      id: 2,
      tipo: 'Software',
      area: 'Contabilidad',
      descripcion: 'Error en sistema ERP',
      estado: 'En Proceso',
      fechaCreacion: new Date('2025-05-09T09:30:00'),
      prioridad: 'Media',
      responsable: 'Ana Torres'
    }
  ]);

  // Getter para obtener los incidentes como un observable
  getIncidentes() {
    return this.incidentesSubject.asObservable();
  }

  // Método para agregar un nuevo incidente
  agregarIncidente(nuevoIncidente: Incident) {
    // Obtener la lista actual de incidentes
    const incidentesActualizados = [...this.incidentesSubject.value, nuevoIncidente];
    
    // Actualizar el BehaviorSubject con la nueva lista
    this.incidentesSubject.next(incidentesActualizados);
  }
}

