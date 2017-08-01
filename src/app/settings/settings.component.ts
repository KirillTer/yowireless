import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/services";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  mail;
  sms;
public myModel = '';
  public mask = [ /[1-2]/, /\d/, ':', /[1-6]/, /\d/];
  constructor(private data: DataService) {
    this.mail = {};
    this.sms = {};
    this.loadEmail();
  }

  ngOnInit() {
  }

  loadEmail() {
    this.data.getEmailSettings().subscribe(
      data => this.handleData_loademail(data),
      error => this.handleError_loademail(error),
      () => console.log('Completed!')
    );
  }

  private handleData_loademail(data) {
    if (data.result == 'OK') {
      this.mail = data.payload;
    }
  }

  private handleError_loademail(error) {
    console.log('Error during loading email settings!');
    console.log(error);
  }

  saveEmail() {
    this.data.saveEmailSettings(this.mail).subscribe(
      data => this.handleData_saveemail(data),
      error => this.handleError_saveemail(error),
      () => console.log('Completed!')
    );
  }

  private handleData_saveemail(data) {
    if (data.result == 'OK') {
      console.log('email saved');
    }
  }

  private handleError_saveemail(error) {
    console.log('Error during saving email settings!');
    console.log(error);
  }

  loadSms() {
    this.data.getSmsSettings().subscribe(
      data => this.handleData_loadsms(data),
      error => this.handleError_loadsms(error),
      () => console.log('Completed!')
    );
  }

  private handleData_loadsms(data) {
    if (data.result == 'OK') {
      this.sms = data.payload;
    }
  }

  private handleError_loadsms(error) {
    console.log('Error during loading sms settings!');
    console.log(error);
  }

  saveSms() {
    this.data.saveSmsSettings(this.sms).subscribe(
      data => this.handleData_savesms(data),
      error => this.handleError_savesms(error),
      () => console.log('Completed!')
    );
  }

  private handleData_savesms(data) {
    if (data.result == 'OK') {
      console.log('sms saved');
    }
  }

  private handleError_savesms(error) {
    console.log('Error during saving sms settings!');
    console.log(error);
  }
}
