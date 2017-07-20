import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/services";
import {Globals} from "../../globals/globals";
import {Route, Router, Routes} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ywm_username: string;
  ywm_password: string;

  constructor(private data: DataService, private router: Router) {
    this.ywm_username = '';
    this.ywm_password = '';
  }

  ngOnInit() {
  }

  login(){
    this.data.login(this.ywm_username, this.ywm_password).subscribe(
      data => this.handleData_login(data),
      error => this.handleError_login(error),
      () => console.log('Completed!')
    )
  }

  private handleData_login(data) {
    if (data.result == 'OK') {
      Globals.USERTOKEN = data.securityToken;
      Globals.LOGGEDINUSER = data.loggedInUser;
      this.router.navigate(['/dashboard']);
    }
  }

  private handleError_login(error) {
    console.log('Error during login!');
    console.log(error);
  }
}
