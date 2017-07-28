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
  items: MenuItem[];
  notifications = [];

  constructor(private data: DataService, private router: Router) {
    this.notifications = [];
    this.refreshNotifications();
  }

  hideNotif(elToRemove) {
    this.notifications = this.notifications.filter(function (el) {
      return elToRemove.name != el.name;
    });
    if (this.notifications.length == 0){
      document.getElementById('overlay').click();
    }
  }

  hideAllNotif(){
    for (let i = this.notifications.length - 1; i >= 0; i--) {
      this.hideNotif(this.notifications[i]);
    }
  }

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

  private refreshNotifications() {
    this.data.getNotifications().subscribe(
      data => this.handleData_notif(data),
      error => this.handleError_notif(error),
      () => console.log('Completed!')
    );
  }

  private handleData_notif(data: any | any) {
    if (data.result = 'OK') {
      this.notifications = data.payload;
      console.log(this.notifications);
    }
  }

  private handleError_notif(error: any) {
    console.log('error getting notifications');
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
