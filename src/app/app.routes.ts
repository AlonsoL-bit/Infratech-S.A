import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    redirectTo: 'incidents',
    pathMatch: 'full'
  },
  {
    path: 'registrar',
    loadComponent: () => import('./incident/components/incident-form/incident-form.component').then(m => m.IncidentFormComponent)
  },
  {
    path: 'incident',
    loadComponent: () => import('./incident/components/incident-list/incident-list.component').then(m => m.IncidentListComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/components/dashboard-stats/dashboard-stats.component').then(m => m.DashboardStatsComponent)
  }
];


