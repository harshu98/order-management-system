import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    public router: Router, private service: AppService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  get f() { return this.loginForm.controls; }

  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    };
    // console.log(this.f['username'].value, this.f['password'].value);
    const usersList = await lastValueFrom(this.service.checkUser());
    const isLoggedIn = usersList.filter((user) => { return user.username === this.f['username'].value && user.password === this.f['password'].value }).length == 0 ? false : true;
    // console.log(isLoggedIn);
    if (isLoggedIn) {
      this.router.navigateByUrl('orders');
    }
    else { return; }
  }
}
