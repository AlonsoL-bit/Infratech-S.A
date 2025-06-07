import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Incidente {
  tipo: string;
  area: string;
  descripcion: string;
  estado: string;
  prioridad: string;
  fecha: string;
  responsable: string; 
  fechaResolucion?: string;
}


@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  private incidentesSubject = new BehaviorSubject<Incidente[]>([
    
  ]);

  incidentes$ = this.incidentesSubject.asObservable();

  agregarIncidente(nuevo: Incidente) {
    const actuales = this.incidentesSubject.value;
    this.incidentesSubject.next([...actuales, nuevo]);
  }
}
