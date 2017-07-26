import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/services";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  mail;

  constructor(private data: DataService) {
    this.mail = [];
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
    this.mail = data;
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
}
