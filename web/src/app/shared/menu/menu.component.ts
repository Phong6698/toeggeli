import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {selectToeggeliSelectedSpaceId} from '../../toeggeli/toeggeli.reducer';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app-store.reducer';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output()
  logout = new EventEmitter();

  selectedSpaceId$: Observable<string>;


  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.selectedSpaceId$ = this.store.select(selectToeggeliSelectedSpaceId);
  }

  logoutClicked() {
    this.logout.emit();
  }
}
