import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/services";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users;
  usersColumns;
  currentUser;
  newUserPannelShown: boolean;
  loadingIndicator: boolean = true;

  constructor(private data: DataService) {
    this.currentUser = {};
    this.usersColumns =[
      { prop: 'id', name: 'id' , width: 60, minWidth: 60, maxWidth: 60, resizable: false, canAutoResize: false},
      { prop: 'username', name: 'username' , width: 120, minWidth: 120, maxWidth: 120, resizable: false, canAutoResize: false},
      // { prop: 'password', name: 'password' , width: 120, minWidth: 120, maxWidth: 120, resizable: false, canAutoResize: false},
      { prop: 'firstName', name: 'firstName' , width: 120, minWidth: 120, maxWidth: 120, resizable: false, canAutoResize: false},
      { prop: 'lastName', name: 'lastName' , width: 120, minWidth: 120, maxWidth: 120, resizable: false, canAutoResize: false},
      { prop: 'email', name: 'email' , width: 240, minWidth: 240, maxWidth: 240, resizable: false, canAutoResize: false},
      { prop: 'sendEmail', name: 'sendEmail' , width: 120, minWidth: 120, maxWidth: 120, resizable: false, canAutoResize: false},
      { prop: 'phoneNumber', name: 'phoneNumber' , width: 160, minWidth: 160, maxWidth: 160, resizable: false, canAutoResize: false},
      { prop: 'sendSms', name: 'sendSms', width: 120, minWidth: 120, maxWidth: 120, resizable: false, canAutoResize: false }
    ];
    this.newUserPannelShown = false;
  }

  ngOnInit() {
    this.refreshUsers();
  }

  private refreshUsers() {
    this.data.getUsers().subscribe(
      data => this.handleData_users(data),
      error => this.handleError_users(error),
      () => console.log('Completed!')
    );
  }

  private handleData_users(data) {
    if (data.result == 'OK') {
      this.users = data.payload;
      this.loadingIndicator = false;
    }
  }

  private handleError_users(error) {
    console.log('Error during getting dashboard data!');
    console.log(error);
  }

  addUser() {
    this.newUserPannelShown = true;
  }

  cancelAddUser() {
    this.newUserPannelShown = false;
  }

  saveUser() {
    this.data.createUser(this.currentUser).subscribe(
      data => this.handleData_createusers(data),
      error => this.handleError_createusers(error),
      () => console.log('Completed!')
    );
    this.newUserPannelShown = false;
  }

  deleteUser() {

  }

  private handleData_createusers(data: any) {

  }

  private handleError_createusers(error: any) {
    console.log('error during creating user');
  }
}
