import { Component, Input, ViewChild } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
declare var jQuery: any;
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hiddenHeaderAside = true;
  constructor(
    private router: Router) { }

  ngOnInit() {
    AOS.init();

    this.router.events.subscribe((defaultpage) => {
      if (defaultpage instanceof NavigationStart) {
        if (defaultpage.url === "/" || defaultpage.url === "/login" || defaultpage.url === "/reset-password" || defaultpage.url === "**" || defaultpage.url === "login" || defaultpage.url === "/forgot-password" || defaultpage.url === "/register" || defaultpage.url === "/otp") {
          this.hiddenHeaderAside = false;
        } else {
          this.hiddenHeaderAside = true;
        }
      }
    })

  }



}
