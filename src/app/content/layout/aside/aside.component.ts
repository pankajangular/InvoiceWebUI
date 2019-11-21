import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'm-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    $(document).ready(function () {
      $(".flip").click(function (e) {
        $(".panel , .body-content").toggleClass('open');
      });
    });
  }
  onClickInvoiceManagement() {
    this.router.navigateByUrl('/invoice');
  }
  onClickDashBoard() {
    this.router.navigateByUrl('/dashboard');
  }
}
