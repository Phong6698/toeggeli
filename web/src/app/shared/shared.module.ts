import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';
import {ToeggeliModule} from '../toeggeli/toeggeli.module';
import {MenuComponent} from './menu/menu.component';
import {HeaderComponent} from './header/header.component';
import {SpaceSelectorComponent} from './space-selector/space-selector.component';

@NgModule({
  declarations: [MenuComponent, HeaderComponent, SpaceSelectorComponent],
  exports: [MenuComponent, HeaderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    ToeggeliModule,
    MatDividerModule,
    RouterModule
  ]
})
export class SharedModule {}
