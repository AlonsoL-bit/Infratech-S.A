import { Injectable } from '@angular/core';
import { Incident } from '../../core/models/incident.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private incidentes: Incident[] = [
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
  ];

  private incidentesSubject = new BehaviorSubject<Incident[]>(this.incidentes);
  
  incidentes$ = this.incidentesSubject.asObservable();

  constructor() {}

  getIncidentes(): Incident[] {
    return this.incidentes;
  }

  agregarIncidente(incidente: Incident) {
    const nuevoId = this.incidentes.length > 0 ? Math.max(...this.incidentes.map(i => i.id)) + 1 : 1;
    
    const incidenteConId = { ...incidente, id: nuevoId };
    
    this.incidentes.push(incidenteConId);
    
    this.incidentesSubject.next(this.incidentes);
  }
}
