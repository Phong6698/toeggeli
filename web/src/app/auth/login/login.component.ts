import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppState} from '../../store/app-store.reducer';
import {userLoginRequested} from '../../store/auth.actions';
import {selectAuthLoginError} from '../../store/auth.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  isLoggedIn: boolean;
  hasLoginError$: Observable<any>;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {}

  ngOnInit() {
    this.hasLoginError$ = this.store.pipe(select(selectAuthLoginError));

    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit(data) {
    this.store.dispatch(userLoginRequested({ email: data.email, password: data.password }));
  }
}
