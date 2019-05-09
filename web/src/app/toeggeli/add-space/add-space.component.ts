import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-store.reducer';

@Component({
  selector: 'app-add-space',
  templateUrl: './add-space.component.html',
  styleUrls: ['./add-space.component.scss']
})
export class AddSpaceComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      spaceName: [null, [Validators.required]]
    });
  }

  onSubmit(data) {
    console.log(data);
  }
}
