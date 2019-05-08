import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  invalidLogin: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.createForm();
  }

  onSubmit(data) {
    console.log(data);
    if (data.email === 'admin') {
      console.log('success');
      this.router.navigate(['/toeggeli']);
    } else {
      this.invalidLogin = true;
    }
  }

  private createForm() {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }
}
