import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/primeng";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {label: 'Dashboard', routerLink: ['/dashboard']},
      {label: 'Settings', routerLink: ['/settings']},
      {label: 'Logout', routerLink: ['/logout']}
    ];
  }

}
