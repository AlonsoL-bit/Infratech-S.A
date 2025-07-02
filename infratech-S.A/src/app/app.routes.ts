import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'incident',
        loadComponent: () =>
          import('./incident/components/incident-list/incident-list.component').then(
            (m) => m.IncidentListComponent
          ),
      },
      {
        path: 'registrar',
        loadComponent: () =>
          import('./incident/components/incident-form/incident-form.component').then(
            (m) => m.IncidentFormComponent
          ),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/components/dashboard-stats/dashboard-stats.component').then(
            (m) => m.DashboardStatsComponent
          ),
      },
    ],
  },
];

