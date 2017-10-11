import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/services";

@Component({
  selector: 'app-loginhistory',
  templateUrl: './loginhistory.component.html',
  styleUrls: ['./loginhistory.component.css']
})
export class LoginhistoryComponent implements OnInit {
  historys;
  historysColumns;
  currentHistorys;
  editAddhistoryPanelShown: boolean;
  edithistoryPanelShown: boolean;
  loadingIndicator: boolean = true;

  constructor(private data: DataService) {
    this.currentHistorys = {
      username: '',
      date: '',
      loginTime: '',
      logoutTime: '',
      logoutReason: ''
    };
    this.historysColumns =[
      { prop: 'username', name: 'username' , width: 200, minWidth: 200, maxWidth: 200, resizable: false, canAutoResize: false},
      { prop: 'date', name: 'date' , width: 200, minWidth: 200, maxWidth: 200, resizable: false, canAutoResize: false},
      { prop: 'loginTime', name: 'Login Time' , width: 200, minWidth: 200, maxWidth: 200, resizable: false, canAutoResize: false},
      { prop: 'logoutTime', name: 'Logout Time' , width: 200, minWidth: 200, maxWidth: 200, resizable: false, canAutoResize: false},
      { prop: 'logoutReason', name: 'Logout Reason' , width: 200, minWidth: 200, maxWidth: 200, resizable: false, canAutoResize: false}
    ];
    this.editAddhistoryPanelShown = false;
   }

  ngOnInit() {
    this.refreshHistorys();
  }

  onSelect({ selected }) {
    this.currentHistorys.username = selected[0].username;
    this.currentHistorys.date = selected[0].date;
    this.currentHistorys.loginTime = selected[0].loginTime;
    this.currentHistorys.logoutTime = selected[0].logoutTime;
    this.currentHistorys.logoutReason = selected[0].logoutReason;
  }

  private refreshHistorys() {
    this.data.getHistorys().subscribe(
      data => this.handleData_historys(data),
      error => this.handleError_historys(error),
      () => console.log('Completed!')
    );
  }

  private handleData_historys(data) {
    if (data.result == 'OK') {
      this.historys = data.payload;
      this.loadingIndicator = false;
    }
  }

  private handleError_historys(error) {
    console.log('Error during getting dashboard data!');
    console.log(error);
  }
}
