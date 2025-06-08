import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentService } from '../../../incident/services/incident.service';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-stats',
  standalone: true,
  imports: [CommonModule, NgChartsModule, MatButtonModule, MatIconModule],
  templateUrl: './dashboard-stats.component.html',
  styleUrls: ['./dashboard-stats.component.css']
})

export class DashboardStatsComponent implements OnInit {
  incidentService = inject(IncidentService);
  router = inject(Router);
  incidentes: any[] = [];
  estadosData: number[] = [0, 0, 0]; // Nuevo, En proceso, Resuelto
  incidentesVencidos: any[] = [];

  selectedEstado: string | null = null;
  incidentesFiltrados: any[] = [];

  doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Nuevo', 'En proceso', 'Resuelto'] as string[],
    datasets: [{
      data: this.estadosData,
      backgroundColor: ['#ffca28', '#42a5f5', '#66bb6a']
    }]
  };

  prioridadesData: number[] = [0, 0, 0]; // Alta, Media, Baja

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Alta', 'Media', 'Baja'],
    datasets: [
      {
        label: 'Incidentes por Prioridad',
        data: this.prioridadesData,
        backgroundColor: ['#e53935', '#fdd835', '#43a047']
      }
    ]
  };

  contarPrioridades() {
    const alta = this.incidentes.filter(i => i.prioridad === 'Alta').length;
    const media = this.incidentes.filter(i => i.prioridad === 'Media').length;
    const baja = this.incidentes.filter(i => i.prioridad === 'Baja').length;

    this.prioridadesData = [alta, media, baja];
    this.barChartData.datasets[0].data = this.prioridadesData;
  }


  ngOnInit(): void {
    this.incidentService.incidentes$.subscribe((data) => {
      this.incidentes = data;
      this.contarEstados();
      this.filtrarVencidos();
      this.contarPrioridades();
    });
  }

  contarEstados() {
    const nuevo = this.incidentes.filter(i => i.estado === 'Nuevo').length;
    const enProceso = this.incidentes.filter(i => i.estado === 'En proceso').length;
    const resuelto = this.incidentes.filter(i => i.estado === 'Resuelto').length;

    this.estadosData = [nuevo, enProceso, resuelto];
    this.doughnutChartData.datasets[0].data = this.estadosData;
  }

  filtrarVencidos() {
    const ahora = new Date();
    this.incidentesVencidos = this.incidentes.filter(i => {
      const fecha = new Date(i.fecha);
      const diff = (ahora.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24);
      return diff > 2 && i.estado !== 'Resuelto';
    });
  }

  onChartClick(event: any) {
    const index = event.active?.[0]?.index;
    if (index !== undefined) {
      const estado = this.doughnutChartData.labels?.[index] as string;
      this.selectedEstado = estado;
      this.incidentesFiltrados = this.incidentes.filter(i => i.estado === estado);
    }
  }

  verListaFiltrada() {
    if (this.selectedEstado) {
      this.router.navigate(['/incident'], { queryParams: { estado: this.selectedEstado } });
    }
  }
}
