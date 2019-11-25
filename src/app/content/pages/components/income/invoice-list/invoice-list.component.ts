import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IncomeService } from 'src/app/core/services/income.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  invoiceListForm: FormGroup;
  InvoiceList: [];

  constructor(private formBuilder: FormBuilder,
    private incomeService: IncomeService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService) {
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
    this.spinner.show();
    this.incomeService.getInvoiceList(this.invoiceListForm.value).subscribe((data) => {
      this.InvoiceList = data.invoiceList.dataList;
      this.spinner.hide();
    })
  }

  onEditInvoice(id: number) {
    this.incomeService.getInvoiceById(id).subscribe((data) => {
    })
  }

  onDeleteInvoice(id: number) {
    alert("Are you sure want to delete")
    this.spinner.show();
    this.incomeService.deleteInvoice(id).subscribe((data) => {
      this.spinner.hide();
      this.getInvoiceList();
      this.toaster.success(data.message);
    })

  }


}
