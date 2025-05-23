import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentService, Incidente } from '../../services/incident.service';

@Component({
  standalone: true,
  selector: 'app-incident-list',
  imports: [CommonModule],
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css'],
})
export class IncidentListComponent implements OnInit {
  incidentes: Incidente[] = [];

  constructor(private incidentService: IncidentService) {}

  ngOnInit(): void {
    this.incidentes = this.incidentService.getIncidentes();
  }
}
