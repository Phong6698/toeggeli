import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatProgressBarModule } from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToeggeliRoutingModule } from './toeggeli-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ToeggeliRoutingModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class ToeggeliModule {
}
