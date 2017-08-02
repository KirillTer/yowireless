import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/services";
import {min} from "rxjs/operator/min";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  mail;
  sms;
  settings;
  times = [
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ];

  constructor(private data: DataService) {
    this.mail = {};
    this.sms = {};
    this.settings = {};

    this.loadEmail();
    this.loadSettings();
  }

  ngOnInit() {

  }

  saveSettings() {
    this.data.saveSettings(this.settings).subscribe(
      data => this.handleData_savesettings(data),
      error => this.handleError_savesettings(error),
      () => console.log('Completed!')
    );
  }

  private handleData_savesettings(data) {
    if (data.result == 'OK') {
      console.log('settings saved');
    }
  }

  private handleError_savesettings(error) {
    console.log('Error during saving email settings!');
    console.log(error);
  }

  loadSettings() {
    this.data.getSettings().subscribe(
      data => this.handleData_loadsettings(data),
      error => this.handleError_loadsettings(error),
      () => console.log('Completed!')
    );
  }

  private handleData_loadsettings(data) {
    if (data.result == 'OK') {
      this.settings = data.payload;
    }
  }

  private handleError_loadsettings(error) {
    console.log('Error during loading email settings!');
    console.log(error);
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
