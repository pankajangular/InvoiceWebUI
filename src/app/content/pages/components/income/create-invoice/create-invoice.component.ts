import { Component, OnInit } from '@angular/core';
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
