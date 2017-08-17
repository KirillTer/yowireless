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
  editAddUserPanelShown: boolean;
  editUserPanelShown: boolean;
  loadingIndicator: boolean = true;

  constructor(private data: DataService) {
    this.currentUser = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      sendEmail: false,
      phoneNumber: '',
      sendSms: false
    };
    this.usersColumns =[
      { prop: 'id', name: 'id' , width: 60, minWidth: 60, maxWidth: 60, resizable: false, canAutoResize: false},
      { prop: 'username', name: 'username' , width: 200, minWidth: 200, maxWidth: 200, resizable: false, canAutoResize: false},
      { prop: 'firstName', name: 'first name' , width: 140, minWidth: 140, maxWidth: 140, resizable: false, canAutoResize: false},
      { prop: 'lastName', name: 'last name' , width: 140, minWidth: 140, maxWidth: 140, resizable: false, canAutoResize: false},
      { prop: 'email', name: 'email' , width: 340, minWidth: 340, maxWidth: 340, resizable: false, canAutoResize: false},
      { prop: 'sendEmail', name: 'send email' , width: 140, minWidth: 140, maxWidth: 140, resizable: false, canAutoResize: false},
      { prop: 'phoneNumber', name: 'phone number' , width: 180, minWidth: 180, maxWidth: 180, resizable: false, canAutoResize: false},
      { prop: 'sendSms', name: 'send sms', width: 140, minWidth: 140, maxWidth: 140, resizable: false, canAutoResize: false }
    ];
    this.editAddUserPanelShown = false;
  }

  ngOnInit() {
    this.refreshUsers();
  }

  onSelect({ selected }) {
    this.currentUser.id = selected[0].id;
    this.currentUser.username = selected[0].username;
    this.currentUser.password = selected[0].password;
    this.currentUser.firstName = selected[0].firstName;
    this.currentUser.lastName = selected[0].lastName;
    this.currentUser.email = selected[0].email;
    this.currentUser.sendEmail = selected[0].sendEmail;
    this.currentUser.phoneNumber = selected[0].phoneNumber;
    this.currentUser.sendSms = selected[0].sendSms;
    this.editUser();
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

  editUser() {
    this.editAddUserPanelShown = true;
    this.editUserPanelShown = true;
    this.currentUser.newUser = false;
  }

  addUser() {
    this.editAddUserPanelShown = true;
    this.currentUser.newUser = true;
  }

  cancelAddUser() {
    this.editAddUserPanelShown = false;
    this.currentUser = {};
  }

  saveUser() {
    if (this.currentUser.newUser) {
      this.data.createUser(this.currentUser).subscribe(
        data => this.handleData_createusers(data),
        error => this.handleError_createusers(error)
      );
    } else {
      this.data.editUser(this.currentUser).subscribe(
        data => this.handleData_createusers(data),
        error => this.handleError_createusers(error)
      );
    }
    this.editAddUserPanelShown = false;
    this.currentUser = {};
  }

  deleteUser() {
    this.data.deleteUser(this.currentUser).subscribe(
      data => this.handleData_createusers(data),
      error => this.handleError_createusers(error)
    );
  }

  private handleData_createusers(data: any) {
    if (data.result == 'OK') {
      this.users = data.payload;
    }
  }

  private handleError_createusers(error: any) {
    console.log('error during creating user');
  }
}
