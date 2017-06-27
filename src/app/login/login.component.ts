import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/services";
import {Globals} from "../../globals/globals";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  data: DataService;

  constructor(data: DataService) {
    this.data = data;

    this.username = '';
    this.password = '';
  }

  ngOnInit() {
  }

  login(){
    this.data.login(this.username, this.password).subscribe(
      data => this.handleData_login(data),
      error => this.handleError_login(error),
      () => console.log('Completed!')
    )
  }

  private handleData_login(data) {
    if (data.result == 'ok') {
      Globals.USERTOKEN = data.payload.securityToken;
      Globals.LOGGEDINUSER = data.payload.loggedInUser;
      console.log(Globals.USERTOKEN);
      console.log(Globals.LOGGEDINUSER);
    }
  }

  private handleError_login(error) {
    console.log('Error during login!')
    console.log(error)
  }
}
