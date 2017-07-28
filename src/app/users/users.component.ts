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

  constructor(private data: DataService, ) {
    this.currentUser =[];
    this.usersColumns =[
      { prop: 'id', name: 'id' },
      { prop: 'username', name: 'username' },
      { prop: 'password', name: 'password' },
      { prop: 'firstName', name: 'firstName' },
      { prop: 'lastName', name: 'lastName' },
      { prop: 'email', name: 'email' },
      { prop: 'sendEmail', name: 'sendEmail' },
      { prop: 'phoneNumber', name: 'phoneNumber' },
      { prop: 'sendSms', name: 'sendSms' }
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
    }
  }

  private handleError_users(error) {
    console.log('Error during getting dashboard data!');
    console.log(error);
  }

  addUser() {
    this.newUserPannelShown = true;
  }

  saveUser() {

  }

  deleteUser() {

  }
}
