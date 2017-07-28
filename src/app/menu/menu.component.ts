import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "primeng/primeng";
import {DataService} from "../../services/services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() openedSidebar: boolean = false;

  constructor(private data: DataService, private router: Router) { }

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

  logout() {
    this.data.logout().subscribe(
      data => this.handleData_logout(data),
      error => this.handleError_logout(error),
      () => console.log('Completed!')
    );
  }

  private handleError_logout(error: any) {
    console.log('error during logout');
  }

  private handleData_logout(data: any | any) {
    this.router.navigate(['/login']);
  }
}
