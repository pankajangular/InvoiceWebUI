import { Component, OnInit } from '@angular/core';
import { IncomeService } from 'src/app/core/services/income.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {

  constructor(private incomeService: IncomeService) { }

  ngOnInit() {

  }

}
