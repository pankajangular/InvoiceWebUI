import { Component, OnInit, HostListener } from '@angular/core';
import { IncomeService } from 'src/app/core/services/income.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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

  @HostListener('window:scroll', ['$event'])
  onScroll(e) {
    console.log('window', e);
  }

  divScroll(e) {
    console.log('div App', e);
  }

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
      console.log(data.invoiceList.dataList);
      this.InvoiceList = data.invoiceList.dataList;
    })
  }
  getItemList() {
    this.incomeService.getitemsList(this.getListForm.value).subscribe((data) => {
      console.log(data.itemList.dataList);
      console.log("jnjsfan", data.itemList.dataList);
      localStorage.setItem('items', data.itemList.dataList);
      this.itemList = data.itemList.dataList;
    })
  }

  onChange(deviceValue) {
    debugger;
    console.log(deviceValue.name);
  }

  getCustomersList() {
    this.incomeService.getCustomersList(this.getListForm.value).subscribe((data) => {
      console.log(data.customerList.dataList);
      this.customersList = data.customerList.dataList;
    })
  }


}
