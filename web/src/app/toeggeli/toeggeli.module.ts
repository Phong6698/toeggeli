import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';

import { ToeggeliRoutingModule } from './toeggeli-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ToeggeliRoutingModule,
    MatCardModule
  ]
})
export class ToeggeliModule { }
