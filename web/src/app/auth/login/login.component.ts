import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from '../../core/auth.service';

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
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.createForm();
    //this.isLoggedIn = this.authService.isLoggedIn();
  }

  onSubmit(data) {
    this.authService
      .doPasswordLogin(data.email, data.password)
      .pipe(take(1))
      .subscribe(user => {
        console.log(user);
        //if (user) this.isLoggedIn = true;
        //this.age = Utils.getFormattedAgeString(thisitem.timestamp);
      });

    /*console.log(data);
    if (data.email === 'admin') {
      console.log('success');
      this.router.navigate(['/toeggeli']);
    } else {
      this.invalidLogin = true;
    }*/
  }

  private createForm() {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }
}
