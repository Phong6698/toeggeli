import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {AddSpaceComponent} from './add-space/add-space.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SpaceComponent} from './space/space.component';
import {ToeggeliRoutingModule} from './toeggeli-routing.module';
import {ToeggeliEffects} from './toeggeli.effects';
import {reducer} from './toeggeli.reducer';
import {NewMatchComponent} from './new-match/new-match.component';
import {PlayerSelectDialogComponent} from './player-select-dialog/player-select-dialog.component';
import {MatchHistoryComponent} from './match-history/match-history.component';

@NgModule({
  declarations: [
    DashboardComponent, SpaceComponent, AddSpaceComponent, NewMatchComponent, PlayerSelectDialogComponent,
    MatchHistoryComponent
  ],
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
    StoreModule.forFeature('toeggeli', reducer)
  ],
  entryComponents: [AddSpaceComponent, PlayerSelectDialogComponent]
})
export class ToeggeliModule {
}
