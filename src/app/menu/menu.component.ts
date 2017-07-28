import { Component, OnInit, Input } from '@angular/core';
import {MenuItem} from "primeng/primeng";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
 @Input() openedSidebar: boolean = false;
  constructor() { }

  items: MenuItem[];
  open(event) {
    let clickedComponent = event.target.closest('.nav-item');
    let items = clickedComponent.parentElement.children;

    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('opened');
    }
    clickedComponent.classList.add('opened');
  }

  close(event) {
    let clickedComponent = event.target;
    let items = clickedComponent.parentElement.children;

    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('opened');
    }
  }
  ngOnInit() {
    this.items = [
      {label: 'Dashboard', routerLink: ['/dashboard']},
      {label: 'Settings', routerLink: ['/settings']},
      {label: 'Users', routerLink: ['/users']},
      {label: 'Logout', routerLink: ['/logout']}
    ];
  }

}
