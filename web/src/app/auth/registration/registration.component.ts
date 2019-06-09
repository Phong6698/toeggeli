import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppState} from '../../store/app-store.reducer';
import {userRegistrationRequested} from '../../store/auth.actions';
import {selectUserRegistrationError} from '../../store/auth.reducer';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  formGroup: FormGroup;
  hasRegistrationError$: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.hasRegistrationError$ = this.store.pipe(
      select(selectUserRegistrationError)
    );

    this.formGroup = this.formBuilder.group({
      username: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit(data) {
    this.store.dispatch(
      userRegistrationRequested({
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      })
    );
  }
}
