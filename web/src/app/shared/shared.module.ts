import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ToeggeliModule } from '../toeggeli/toeggeli.module';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { SpaceSelectorComponent } from './space-selector/space-selector.component';

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
    ToeggeliModule
  ]
})
export class SharedModule {}
