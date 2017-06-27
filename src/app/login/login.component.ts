import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  var1: string;
  var2: string;

  constructor() {
    this.var1 = '';
    this.var2 = '';
  }

  ngOnInit() {
  }

  login(){

  }
}
