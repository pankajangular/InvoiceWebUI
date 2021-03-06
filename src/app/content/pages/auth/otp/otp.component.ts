import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  verifyOtpForm = new FormGroup({
    otp: new FormControl('', Validators.required)
  });
  constructor(private toaster: ToastrService, private spinner: NgxSpinnerService, private router: Router, private userService: UserService) { }

  ngOnInit() {
  }
  onVerify() {
    this.submitted = true;
    if (this.verifyOtpForm.invalid) {
      return;
    }

    this.spinner.show();
    setTimeout(() => {
      this.userService.onVerify(this.verifyOtpForm.controls['otp'].value)
        .subscribe(
          data => {
            if (data.success == true) {
              this.router.navigateByUrl('/login');
              localStorage.removeItem('email');
              this.toaster.success(data.message);
            }
            else {
              this.toaster.error(data.message);
            }
            this.spinner.hide();
          },
          error => {
            this.error = error;
            this.loading = false;
            this.spinner.hide();
          });
    }, 2000);
  }


  onResendOTP() {
    this.spinner.show();
    localStorage.getItem('email');
    this.userService.onResendOtp().subscribe((data) => {
      if (data.success) {
        this.spinner.hide();
        this.toaster.success(data.message);
      }
      else {
        this.toaster.error(data.error)
      }
    })
  }
}
