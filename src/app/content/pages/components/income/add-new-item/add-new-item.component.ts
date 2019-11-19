import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IncomeService } from 'src/app/core/services/income.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.css']
})
export class AddNewItemComponent implements OnInit {
  addNewItemForm: FormGroup;
  submitted: boolean;
  constructor(private formBuilder: FormBuilder, private toaster: ToastrService, private spinner: NgxSpinnerService, private incomeService: IncomeService) { }

  ngOnInit() {
    this.addNewItemForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      quantity: new FormControl([], Validators.required),
      price: new FormControl([], Validators.required),
      tax: new FormControl([], Validators.required)
    })
  }

  onClickAddNewItem() {
    debugger;
    this.submitted = true;
    var quantity = parseInt(this.addNewItemForm.controls['quantity'].value);
    var price = parseInt(this.addNewItemForm.controls['price'].value);
    var tax = parseInt(this.addNewItemForm.controls['tax'].value);
    this.addNewItemForm.controls['quantity'].setValue(quantity);
    this.addNewItemForm.controls['price'].setValue(price);
    this.addNewItemForm.controls['tax'].setValue(tax);
    if (this.addNewItemForm.invalid) {
      return;
    }
    this.spinner.show();
    setTimeout(() => {
      console.log(this.addNewItemForm.controls['name'].value, this.addNewItemForm.controls['description'].value, this.addNewItemForm.controls['quantity'].value, this.addNewItemForm.controls['price'].value, this.addNewItemForm.controls['tax'].value)
      this.incomeService.createNewItem(this.addNewItemForm.controls['name'].value, this.addNewItemForm.controls['description'].value, this.addNewItemForm.controls['quantity'].value, this.addNewItemForm.controls['price'].value, this.addNewItemForm.controls['tax'].value)
        .subscribe(
          data => {
            if (data) {
              this.toaster.success(data.message);
            }
            else {
              this.toaster.error(data.message);
            }
            this.addNewItemForm.reset();
            this.spinner.hide();
          });
    }, 2000);
  }
}



