import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Incidente {
  tipo: string;
  area: string;
  descripcion: string;
  estado: string;
  prioridad: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  private incidentesSubject = new BehaviorSubject<Incidente[]>([
    {
      tipo: 'Red',
      area: 'TI',
      descripcion: 'Sin acceso a internet',
      estado: 'Nuevo',
      prioridad: 'Alta',
      fecha: '2025-05-23',
    },
    {
      tipo: 'Software',
      area: 'Contabilidad',
      descripcion: 'Error al abrir aplicación contable',
      estado: 'En proceso',
      prioridad: 'Media',
      fecha: '2025-05-22',
    },
    {
      tipo: 'Hardware',
      area: 'Soporte',
      descripcion: 'Pantalla parpadeando',
      estado: 'Resuelto',
      prioridad: 'Baja',
      fecha: '2025-05-20',
    },
  ]);

  incidentes$ = this.incidentesSubject.asObservable();

  agregarIncidente(nuevo: Incidente) {
    const actuales = this.incidentesSubject.value;
    this.incidentesSubject.next([...actuales, nuevo]);
  }
}
