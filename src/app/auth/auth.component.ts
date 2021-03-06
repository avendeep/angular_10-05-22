import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService,private router:Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      alert('Invalid form. Please enter all the form fields correctly.');
      return;
    }
    console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    if (this.isLoginMode) {
      //sign in block
      console.log('sign in func triggered');
      this.authService.login(email, password).subscribe({
        next:(resData)=>{
           console.log(resData)
           this.isLoading= false;
           this.router.navigate(['/recipes']);
        },
        error: (errorMessage)=>{
          console.log(errorMessage);
          this.error= errorMessage;
          this.isLoading= false;
        }
      })
    } else {
      //sign up block
      console.log('sign up function triggered');
      this.authService.signup(email, password).subscribe({
        next:(resData)=>{
           console.log(resData)
           this.isLoading= false;
           this.router.navigate(['/recipes']);
        },
        error: (errorMessage)=>{
          console.log(errorMessage);
          this.error= errorMessage;
          this.isLoading= false;
        }
      })
    }

    form.reset();
  }
}
