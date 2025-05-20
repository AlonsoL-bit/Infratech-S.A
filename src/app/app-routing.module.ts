import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'registrar', pathMatch: 'full' },
  { path: 'registrar', loadComponent: () => import('./incident/components/incident-form/incident-form.component').then(m => m.IncidentFormComponent) },
  { path: 'incident', loadComponent: () => import('./incident/components/incident-list/incident-list.component').then(m => m.IncidentListComponent) },
  { path: 'dashboard', loadComponent: () => import('./dashboard/components/dashboard-stats/dashboard-stats.component').then(m => m.DashboardStatsComponent) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
