import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule
} from '@angular/material';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {AddSpaceComponent} from './add-space/add-space.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SpaceComponent} from './space/space.component';
import {ToeggeliRoutingModule} from './toeggeli-routing.module';
import {ToeggeliEffects} from './toeggeli.effects';
import {toeggeliReducer} from './toeggeli.reducer';
import {NewMatchComponent} from './new-match/new-match.component';

@NgModule({
  declarations: [DashboardComponent, SpaceComponent, AddSpaceComponent, NewMatchComponent],
  exports: [SpaceComponent, AddSpaceComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
    EffectsModule.forFeature([ToeggeliEffects]),
    StoreModule.forFeature('toeggeli', toeggeliReducer),
    ToeggeliRoutingModule
  ],
  entryComponents: [AddSpaceComponent]
})
export class ToeggeliModule {}
