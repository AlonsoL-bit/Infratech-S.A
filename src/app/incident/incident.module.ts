import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { IncidentListComponent } from './components/incident-list/incident-list.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class IncidentModule { }
const routes: Routes = [
  { path: '', redirectTo: 'incidentes', pathMatch: 'full' },
  { path: 'incidentes', component: IncidentListComponent },
];