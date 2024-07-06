import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {
  otp: string[] = ['', '', '', ''];
  phoneNumber = '';
  email = '';
  timerStarted!: boolean;
  resend: boolean = false;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _snakbar: MatSnackBar
  ) {
    this.phoneNumber = history.state.phoneNumber;
    this.email = history.state.email;
  }
  ngOnInit(): void {
    this.timerStarted = true;
  }

  resendOtp(){
    alert(this.email)
  }

  // Setter method for otpString
  set otpString(value: string) {
    // Assign the value of otpString
    this._otpString = value;
    console.log('OTP String:', this._otpString);
  }

  get otpString(): string {
    return this._otpString;
  }

  private _otpString: string = '';

  submitOtp() {
    // Join the otp array to get otpString
    this.otpString = this.otp.join('');

    console.log('hello');
    console.log(this.otpString);
    this._http
      .post(`${environment.apiUrl}/user-auth/verify-otp`, {
        phoneNumber: this.phoneNumber,
        otp: this.otpString,
      })
      .subscribe(
        (data: any) => {
          if (data.error) {
            this._snakbar.open(data.error, 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error'],
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
            return;
          }
          this._router.navigate(['/']);
          console.log(data);
          console.log('Successfully Verified');
        },
        (error) => {
          if(error.status == 400){
             this._snakbar.open(error.error, 'Close', {
               duration: 3000,
               panelClass: ['snackbar-error'],
               verticalPosition: 'top',
               horizontalPosition: 'center',
             });
          }
          console.error('OTP verification error', error);
        }
      );
  }

  handleTimerFinished() {
    console.log('Timer finished!');
    this.resend = true;
  }
}

