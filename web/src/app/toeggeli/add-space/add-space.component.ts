import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app-store.reducer';
import { AddSpaceRequested } from '../toeggeli.actions';
import { selectToeggeliAddSpaceError } from '../toeggeli.reducer';

@Component({
  selector: 'app-add-space',
  templateUrl: './add-space.component.html',
  styleUrls: ['./add-space.component.scss']
})
export class AddSpaceComponent implements OnInit {
  formGroup: FormGroup;
  hasAddSpaceError$: Observable<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.hasAddSpaceError$ = this.store.pipe(
      select(selectToeggeliAddSpaceError)
    );

    this.formGroup = this.formBuilder.group({
      spaceName: [null, [Validators.required]]
    });
  }

  onSubmit(data) {
    this.store.dispatch(new AddSpaceRequested({ spaceName: data.spaceName }));
  }
}
