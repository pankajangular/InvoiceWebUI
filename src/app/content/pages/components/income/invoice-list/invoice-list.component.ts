import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IncomeService } from 'src/app/core/services/income.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  invoiceListForm: FormGroup;
  InvoiceList: [];

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
    });
    this.getInvoiceList();
  }

  getInvoiceList() {
    this.incomeService.getInvoiceList(this.invoiceListForm.value).subscribe((data) => {
      console.log(data.invoiceList.dataList);
      this.InvoiceList = data.invoiceList.dataList;
    })
  }

}
