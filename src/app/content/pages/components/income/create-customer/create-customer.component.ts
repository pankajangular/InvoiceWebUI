import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';
import { IncomeService } from 'src/app/core/services/income.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  customerForm: FormGroup;
  submitted: boolean;

  constructor(private formBuilder: FormBuilder, private toaster: ToastrService, private spinner: NgxSpinnerService, private incomeService: IncomeService) { }
  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      bussinessName: new FormControl('', Validators.required),
      personalEmail: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      address1: new FormControl('', Validators.required),
      website: new FormControl('', Validators.required),
      countryId: new FormControl(1),
      stateId: new FormControl(5),
      address2: new FormControl(''),
      city: new FormControl(''),
      postalcode: new FormControl(''),
      fax: new FormControl(''),
    })
  }

  get f() { return this.customerForm.controls; }

  onCreateCustomer() {
    debugger;
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }
    this.spinner.show();
    setTimeout(() => {
      this.incomeService.createCustomer(this.customerForm.value)
        .subscribe(
          data => {
            console.log(data);
            if (data) {
              this.toaster.success(data.message);
            }
            else {
              this.toaster.error(data.message);
            }
            this.customerForm.reset();
            this.spinner.hide();
          });
    }, 2000);
  }
}
