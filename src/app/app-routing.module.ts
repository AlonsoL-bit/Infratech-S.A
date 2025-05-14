import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidentListComponent } from './incident/components/incident-list/incident-list.component';
import { DashboardStatsComponent } from './dashboard/components/dashboard-stats/dashboard-stats.component';

const routes: Routes = [
  { path: 'incidents', component: IncidentListComponent },
  { path: 'dashboard', component: DashboardStatsComponent },
  { path: '', redirectTo: '/incidents', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
