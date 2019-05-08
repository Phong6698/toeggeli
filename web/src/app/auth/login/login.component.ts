import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-store.reducer';
import { UserLoginRequested } from '../../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  invalidLogin: boolean;
  isLoggedIn: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit(data) {
    this.store.dispatch(new UserLoginRequested({ email: data.email, password: data.password }));
  }

}
