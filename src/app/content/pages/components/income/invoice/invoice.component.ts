import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IncomeService } from 'src/app/core/services/income.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoiceListForm: FormGroup;
  InvoiceList: [];

  constructor(private formBuilder: FormBuilder, private incomeService: IncomeService) { }

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
