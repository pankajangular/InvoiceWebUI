import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/core/services/setting.service';

@Component({
  selector: 'app-linked-user',
  templateUrl: './linked-user.component.html',
  styleUrls: ['./linked-user.component.css']
})
export class LinkedUserComponent implements OnInit {

  linkedUsersList: [];


  constructor(private settingService: SettingService) { }

  ngOnInit() {
    this.settingService.getAllLinkedUsers().subscribe((data) => {
      console.log(data);
      this.linkedUsersList = data;
    })
  }

}
