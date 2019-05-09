import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-store.reducer';
import { SpacesRequested } from '../toeggeli.actions';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {}
}
