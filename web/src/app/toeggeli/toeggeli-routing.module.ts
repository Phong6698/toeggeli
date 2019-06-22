import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SpaceComponent} from './space/space.component';
import {NewMatchComponent} from './new-match/new-match.component';
import {MatchHistoryComponent} from './match-history/match-history.component';

const routes: Routes = [
  {
    path: ':spaceId',
    component: SpaceComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'new-match',
        component: NewMatchComponent
      },
      {
        path: 'match-history',
        component: MatchHistoryComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToeggeliRoutingModule {
}
