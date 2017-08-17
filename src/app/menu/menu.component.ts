import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "primeng/primeng";
import {DataService} from "../../services/services";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: MenuItem[];
  notifications = [];
  showMenu: boolean = false;


  constructor(private data: DataService, private router: Router) {
    this.notifications = [];
    Observable.interval(15000)
      .take(10).map((x) => x+1)
      .subscribe((x) => {
        this.refreshNotifications();
      });
  }

  hideNotif(elToRemove) {
    this.data.deleteNotification(elToRemove).subscribe(
      data => this.handleData_delnotif(data),
      error => this.handleError_delnotif(error));

    this.notifications = this.notifications.filter(function (el) {
      return elToRemove.id != el.id;
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
  showMainMenu(){
    if(this.showMenu){
      this.showMenu = false;
    }
    else{
      this.showMenu = true;
    }
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
      error => this.handleError_notif(error)
    );
  }

  private handleData_notif(data: any | any) {
    if (data.result = 'OK') {
      this.notifications = data.payload;
      for (let j = 0; j < this.notifications.length; j++) {
        let cpState = this.notifications[j];
        let datepipe: DatePipe = new DatePipe(this.notifications[j].createdTime);
        this.notifications[j].createdTimeFormated = datepipe.transform(this.notifications[j].createdTime, 'yyyy-MM-dd HH:mm:ss');
      }
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

  private handleData_delnotif(data: any) {
    if (data.result = 'OK') {

    }
  }

  private handleError_delnotif(error: any) {
    console.log(error);
    console.log('error during deleting notification');
  }
}
