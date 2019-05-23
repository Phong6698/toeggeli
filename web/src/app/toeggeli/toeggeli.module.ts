import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSlideToggleModule
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
import {PlayerSelectDialogComponent} from './player-select-dialog/player-select-dialog.component';

@NgModule({
  declarations: [DashboardComponent, SpaceComponent, AddSpaceComponent, NewMatchComponent, PlayerSelectDialogComponent],
  exports: [SpaceComponent, AddSpaceComponent],
  imports: [
    CommonModule,
    ToeggeliRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    MatSlideToggleModule,
    MatMenuModule,
    EffectsModule.forFeature([ToeggeliEffects]),
    StoreModule.forFeature('toeggeli', toeggeliReducer)
  ],
  entryComponents: [AddSpaceComponent, PlayerSelectDialogComponent]
})
export class ToeggeliModule {}
