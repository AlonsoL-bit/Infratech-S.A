import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { TaskService } from '../../../core/services/task.service';
import { Incident } from '../../../core/models/incident.model';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';



@Component({
  selector: 'app-dashboard-stats',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard-stats.component.html',
  styleUrls: ['./dashboard-stats.component.css']
})
export class DashboardStatsComponent implements OnInit {
  incidentes: Incident[] = [];

  estados: string[] = ['Nuevo', 'En Proceso', 'Resuelto'];
  estadoCounts: number[] = [0, 0, 0];
  prioridades: string[] = ['Alta', 'Media', 'Baja'];
  prioridadCounts: number[] = [0, 0, 0];

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.estados,
    datasets: [
      {
        data: this.estadoCounts,
        label: 'Incidentes por Estado',
        backgroundColor: ['#2196f3', '#ff9800', '#4caf50']
      }
    ]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  };

  pieChartData: ChartConfiguration<'pie'>['data'] = {
  labels: this.prioridades,
  datasets: [
    {
      data: this.prioridadCounts,
      backgroundColor: ['#f44336', '#ffc107', '#8bc34a']
    }
  ]
};

pieChartOptions: ChartConfiguration<'pie'>['options'] = {
  responsive: true,
  plugins: {
    legend: { display: true }
  }
};

tipos: string[] = [];
tipoCounts: number[] = [];

tipoChartData: ChartConfiguration<'bar'>['data'] = {
  labels: [],
  datasets: [
    {
      data: [],
      label: 'Incidentes por Tipo',
      backgroundColor: '#673ab7'
    }
  ]
};

tipoChartOptions: ChartConfiguration<'bar'>['options'] = {
  responsive: true,
  plugins: {
    legend: { display: true }
  }
};

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getIncidentes().subscribe(incidentes => {
      this.incidentes = incidentes;
      this.calcularEstadisticas();
    });
  }

  calcularEstadisticas(): void {
  // Estado
  const conteosEstado = { 'Nuevo': 0, 'En Proceso': 0, 'Resuelto': 0 };
  this.incidentes.forEach(inc => conteosEstado[inc.estado]++);
  this.estadoCounts = [conteosEstado['Nuevo'], conteosEstado['En Proceso'], conteosEstado['Resuelto']];
  this.barChartData.datasets[0].data = this.estadoCounts;

  // Prioridad
  const conteosPrioridad = { 'Alta': 0, 'Media': 0, 'Baja': 0 };
  this.incidentes.forEach(inc => conteosPrioridad[inc.prioridad]++);
  this.prioridadCounts = [conteosPrioridad['Alta'], conteosPrioridad['Media'], conteosPrioridad['Baja']];
  this.pieChartData.datasets[0].data = this.prioridadCounts;

  // Tipo
  const conteoPorTipo: { [tipo: string]: number } = {};
  this.incidentes.forEach(inc => {
    conteoPorTipo[inc.tipo] = (conteoPorTipo[inc.tipo] || 0) + 1;
  });
  this.tipos = Object.keys(conteoPorTipo);
  this.tipoCounts = Object.values(conteoPorTipo);
  this.tipoChartData.labels = this.tipos;
  this.tipoChartData.datasets[0].data = this.tipoCounts;
}

}

