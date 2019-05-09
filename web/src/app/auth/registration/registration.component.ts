import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app-store.reducer';
import { UserRegistrationRequested } from '../../store/auth.actions';
import { selectUserRegistrationError } from '../../store/auth.reducer';

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
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit(data) {
    this.store.dispatch(
      new UserRegistrationRequested({
        email: data.email,
        password: data.password
      })
    );
  }
}
