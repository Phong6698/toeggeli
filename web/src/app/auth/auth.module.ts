import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatButtonModule
} from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: []
})
export class AuthModule {}