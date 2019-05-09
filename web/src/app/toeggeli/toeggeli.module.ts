import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatProgressBarModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToeggeliRoutingModule } from './toeggeli-routing.module';
import { SpaceComponent } from './space/space.component';
import { ToeggeliEffects } from './toeggeli.effects';
import { toeggeliReducer } from './toeggeli.reducer';

@NgModule({
  declarations: [DashboardComponent, SpaceComponent],
  exports: [SpaceComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    EffectsModule.forFeature([ToeggeliEffects]),
    StoreModule.forFeature('toeggeli', toeggeliReducer),
    ToeggeliRoutingModule
  ]
})
export class ToeggeliModule {}
