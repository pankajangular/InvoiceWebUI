import { Component, OnInit, HostListener } from '@angular/core';
import { IncomeService } from 'src/app/core/services/income.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {
  invoiceListForm: FormGroup;
  getListForm: FormGroup;
  InvoiceList: [];
  customersList: [];
  itemList: [];
  keys: String[];
  constructor(private formBuilder: FormBuilder, private incomeService: IncomeService, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }


  openCreateNewInvoice(content) {
    this.modalService.open(content, { windowClass: 'my-class' });
  }

  ngOnInit() {

    this.invoiceListForm = this.formBuilder.group({
      pageNumber: new FormControl(1),
      pageSize: new FormControl(10),
      searchQuery: new FormControl(null),
      filterBy: new FormControl(null),
    }),
      this.getListForm = this.formBuilder.group({
        pageNumber: new FormControl(1),
        pageSize: new FormControl(10),
        searchQuery: new FormControl(null),
      });



    this.getInvoiceList();
    this.getCustomersList();
    this.getItemList();
  }

  getInvoiceList() {
    this.incomeService.getInvoiceList(this.invoiceListForm.value).subscribe((data) => {
      this.InvoiceList = data.invoiceList.dataList;
    })
  }
  getItemList() {
    this.incomeService.getitemsList(this.getListForm.value).subscribe((data) => {
      this.itemList = data.itemList.dataList;
      this.keys = Object.keys(this.itemList);

    })
  }

  onChange(deviceValue) {
    console.log(deviceValue);
  }

  getCustomersList() {
    this.incomeService.getCustomersList(this.getListForm.value).subscribe((data) => {
      this.customersList = data.customerList.dataList;
    })
  }


}
