import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app-store.reducer';
import { selectToeggeliSelectedSpaceName, selectToeggeliSpaces } from '../../toeggeli/toeggeli.reducer';

@Component({
  selector: 'app-space-selector',
  templateUrl: './space-selector.component.html',
  styleUrls: ['./space-selector.component.scss']
})
export class SpaceSelectorComponent implements OnInit {
  spaces$: Observable<any>;
  selectedSpaceName$: Observable<string>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.spaces$ = this.store.select(selectToeggeliSpaces);
    this.selectedSpaceName$ = this.store.select(selectToeggeliSelectedSpaceName);
  }
}
