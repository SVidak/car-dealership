import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  
  signupForm!: FormGroup;
  isSpinning: boolean = false;

  constructor(private fb: FormBuilder, private service: AuthService, private notification: NzNotificationService, private router: Router) { 
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required], this.confirmationValidator],
    });
  }

  confirmationValidator = (control: FormControl): {[s:string]:boolean} => {
    if(!control.value)
      return {require: true};
    else if(control.value !== this.signupForm.controls["password"].value)
      return {confirm: true, error: true};
    return {};
  }

  signup() {
    this.isSpinning = true;
    this.service.register(this.signupForm.value).subscribe({
      next: (res) => {
        this.notification.success('Registration successful', 'You have successfully registered!');
        this.router.navigateByUrl("/login");
      },
      error: (err) => {
        this.notification.error('Registration failed', 'An error occurred during registration. Please try again.');
      },
      complete: () => {
        this.isSpinning = false;
      }
    });
  }
}