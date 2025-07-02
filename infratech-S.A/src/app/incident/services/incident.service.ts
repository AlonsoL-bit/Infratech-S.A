import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Incidente } from '../interfaces/incidente.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private baseUrl = 'http://127.0.0.1:8000/api/incidentes/';

  constructor(private http: HttpClient) {}

  getIncidentes() {
    return this.http.get<Incidente[]>(this.baseUrl);
  }

  agregarIncidente(incidente: Incidente) {
    return this.http.post<Incidente>(this.baseUrl, incidente);
  }

  actualizarIncidente(id: number, incidente: Incidente) {
    return this.http.put<Incidente>(`${this.baseUrl}${id}/`, incidente);
  }

  eliminarIncidente(id: number) {
    return this.http.delete(`${this.baseUrl}${id}/`);
  }
}



