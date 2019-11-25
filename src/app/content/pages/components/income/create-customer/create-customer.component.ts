import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';
import { IncomeService } from 'src/app/core/services/income.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  customerForm: FormGroup;
  customerListForm: FormGroup;
  submitted: boolean;
  customersList: [];

  constructor(private formBuilder: FormBuilder,
    private toaster: ToastrService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private incomeService: IncomeService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  openCreateNewCustomer(content) {
    this.modalService.open(content, { windowClass: 'my-class' });
  }
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
    }),
      this.customerListForm = this.formBuilder.group({
        pageNumber: new FormControl(1),
        pageSize: new FormControl(10),
        searchQuery: new FormControl(null),
      });
    this.getCustomersList();
  }

  //Create Customer

  onCreateCustomer() {
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }
    this.spinner.show();
    setTimeout(() => {
      this.incomeService.createCustomer(this.customerForm.value)
        .subscribe(
          data => {
            if (data) {
              this.toaster.success(data.message);
              this.getCustomersList();
            }
            else {
              this.toaster.error(data.message);
            }
            this.customerForm.reset();
            this.modalService.dismissAll();
            this.spinner.hide();
          });
    }, 2000);
  }

  //Get Customer List

  getCustomersList() {
    this.spinner.show();
    setTimeout(() => {
      this.incomeService.getCustomersList(this.customerListForm.value).subscribe((data) => {
        this.customersList = data.customerList.dataList;
        this.spinner.hide();
      })
    })
  }

  //Get Customer By Id /Edit

  onEditCustomer(id: number) {
    this.incomeService.getCustomerById(id).subscribe((data) => {
    })
  }


  //Delete Customer

  onDeleteCustomer(id: number) {
    alert("Are you sure want to delete")
    this.spinner.show();
    this.incomeService.deleteCustomer(id).subscribe((data) => {
      this.spinner.hide();
      this.getCustomersList();
      this.toaster.success(data.message);
    })

  }


}
