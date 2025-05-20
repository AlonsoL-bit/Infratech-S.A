import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Incident } from '../models/incident.model';

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
      responsable: 'Juan Pérez',
      tecnico: 'Carlos López'
    },
    {
      id: 2,
      tipo: 'Software',
      area: 'Contabilidad',
      descripcion: 'Error en sistema ERP',
      estado: 'En Proceso',
      fechaCreacion: new Date('2025-05-09T09:30:00'),
      prioridad: 'Media',
      responsable: 'Ana Torres',
      tecnico: 'Laura Gómez'
    }
  ];

  private incidentesSubject = new BehaviorSubject<Incident[]>(this.incidentes);

  getIncidentes(): Observable<Incident[]> {
    return this.incidentesSubject.asObservable();
  }

  agregarIncidente(nuevo: Incident): void {
    nuevo.id = this.incidentes.length + 1;
    this.incidentes.push(nuevo);
    this.incidentesSubject.next(this.incidentes); // notifica el cambio
  }
  actualizarEstado(id: number, nuevoEstado: "Nuevo" | "En Proceso" | "Resuelto"): void {
  const incidente = this.incidentes.find(i => i.id === id);
  if (incidente) {
    incidente.estado = nuevoEstado;
    incidente.fechaActualizacion = new Date();
    this.incidentesSubject.next([...this.incidentes]); // forzar update
  }
}

}



