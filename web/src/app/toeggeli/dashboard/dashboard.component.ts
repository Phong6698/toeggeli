import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app-store.reducer';
import {selectSpaceUsers} from '../toeggeli.reducer';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  hash = '';

  players$: Observable<any>;

  players = [
    {
      firstName: 'Steven',
      lastName: 'Imhof',
      username: 'Angry Steven',
      wins: 10,
      losses: 0
    },
    {
      firstName: 'Chiramet',
      lastName: 'Penglerd',
      username: 'Phong',
      wins: 8,
      losses: 2
    },
    {
      firstName: 'Dominik',
      lastName: 'Forster',
      username: 'domi',
      wins: 6,
      losses: 4
    },
    {
      firstName: 'Peter',
      lastName: 'Meier',
      username: 'pete',
      wins: 2,
      losses: 8
    }
  ];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.players$ = this.store.select(selectSpaceUsers);
  }

}
