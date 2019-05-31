import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ActionsSubject, select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {AppState} from '../../store/app-store.reducer';
import {AddSpaceRequested, ToeggeliActionTypes} from '../toeggeli.actions';
import {selectToeggeliAddSpaceError} from '../toeggeli.reducer';

@Component({
  selector: 'app-add-space',
  templateUrl: './add-space.component.html',
  styleUrls: ['./add-space.component.scss']
})
export class AddSpaceComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  hasAddSpaceError$: Observable<any>;
  subsc = new Subscription();

  constructor(
    private dialogRef: MatDialogRef<AddSpaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private actionsSubj: ActionsSubject
  ) {}

  ngOnInit() {
    this.hasAddSpaceError$ = this.store.pipe(
      select(selectToeggeliAddSpaceError)
    );

    this.formGroup = this.formBuilder.group({
      spaceName: [null, [Validators.required]]
    });

    this.subsc = this.actionsSubj.subscribe(data => {
      if (data.type === ToeggeliActionTypes.AddSpaceCreated) {
        this.dialogRef.close();
      }
    });
  }

  onSubmit(data) {
    this.store.dispatch(new AddSpaceRequested({ spaceName: data.spaceName }));
  }

  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
}
