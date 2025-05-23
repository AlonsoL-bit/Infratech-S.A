import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Incidente {
  tipo: string;
  descripcion: string;
  estado: string;
  fecha: string;
  prioridad: string;
}

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  private incidentesSubject = new BehaviorSubject<Incidente[]>([
    {
      tipo: 'Red',
      descripcion: 'Sin acceso a internet',
      estado: 'Nuevo',
      fecha: '2025-05-23',
      prioridad: 'Alta',
    },
    {
      tipo: 'Software',
      descripcion: 'Error al abrir aplicación contable',
      estado: 'En proceso',
      fecha: '2025-05-22',
      prioridad: 'Media',
    },
    {
      tipo: 'Hardware',
      descripcion: 'Pantalla parpadeando',
      estado: 'Resuelto',
      fecha: '2025-05-20',
      prioridad: 'Baja',
    },
  ]);

  incidentes$ = this.incidentesSubject.asObservable(); // para componentes

  constructor() {}

  getIncidentes(): Incidente[] {
    return this.incidentesSubject.value;
  }

  getCantidad(): number {
    return this.incidentesSubject.value.length;
  }

  agregar(inc: Incidente) {
    const nuevos = [...this.incidentesSubject.value, inc];
    this.incidentesSubject.next(nuevos);
  }

  eliminar(index: number) {
    const nuevos = this.incidentesSubject.value.filter((_, i) => i !== index);
    this.incidentesSubject.next(nuevos);
  }
}
