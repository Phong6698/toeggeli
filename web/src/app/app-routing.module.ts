import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'toeggeli',
    pathMatch: 'full'
  },
  {
    path: 'toeggeli',
    loadChildren: './toeggeli/toeggeli.module#ToeggeliModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
