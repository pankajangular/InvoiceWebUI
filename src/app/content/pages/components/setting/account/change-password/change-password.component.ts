import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private authenticationService: AuthenticationService,
  ) { }



  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d$@$#!%*?&]{8,}")]),
      confirmNewPassword: new FormControl(null, Validators.required),
    }, { validator: this.checkIfMatchingPasswords('newPassword', 'confirmNewPassword') })
  }


  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey], passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }
  onChangePassword() {
    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }

    this.spinner.show();
    setTimeout(() => {
      this.authenticationService.changePassword(this.changePasswordForm.value)
        .subscribe(
          data => {
            this.spinner.hide();
          });
    }, 2000);
  }
}
