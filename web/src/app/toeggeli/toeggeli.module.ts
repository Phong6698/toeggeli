import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToeggeliRoutingModule } from './toeggeli-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ToeggeliRoutingModule,
    MatCardModule,
  ]
})
export class ToeggeliModule {
}
