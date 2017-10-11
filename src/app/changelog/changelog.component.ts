import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/services";

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.css']
})
export class ChangelogComponent implements OnInit {
  logs;
  logsColumns;
  currentLog;
  editAddLogPanelShown: boolean;
  editLogPanelShown: boolean;
  loadingIndicator: boolean = true;

  constructor(private data: DataService) {
    this.currentLog = {
      username: '',
      date: '',
      objectType: '',
      operationType: '',
      stateBefore: '',
      stateAfter: '',
      changes: ''
    };
    this.logsColumns =[
      { prop: 'username', name: 'username' , width: 140, minWidth: 140, maxWidth: 140, resizable: false, canAutoResize: false},
      { prop: 'date', name: 'date' , width: 140, minWidth: 140, maxWidth: 140, resizable: false, canAutoResize: false},
      { prop: 'objectType', name: 'Object Type' , width: 140, minWidth: 140, maxWidth: 140, resizable: false, canAutoResize: false},
      { prop: 'operationType', name: 'Operation Type' , width: 160, minWidth: 160, maxWidth: 160, resizable: false, canAutoResize: false},
      { prop: 'stateBefore', name: 'State Before' , width: 140, minWidth: 140, maxWidth: 140, resizable: false, canAutoResize: false},
      { prop: 'stateAfter', name: 'State After' , width: 140, minWidth: 140, maxWidth: 140, resizable: false, canAutoResize: false},
      { prop: 'changes', name: 'changes' , width: 140, minWidth: 140, maxWidth: 140, resizable: false, canAutoResize: false}
    ];
    this.editAddLogPanelShown = false;
   }

  ngOnInit() {
    this.refreshLogs();
  }

  onSelect({ selected }) {
    this.currentLog.username = selected[0].username;
    this.currentLog.date = selected[0].date;
    this.currentLog.objectType = selected[0].objectType;
    this.currentLog.operationType = selected[0].operationType;
    this.currentLog.stateBefore = selected[0].stateBefore;
    this.currentLog.stateAfter = selected[0].stateAfter;
    this.currentLog.changes = selected[0].changes;
  }

  private refreshLogs() {
    this.data.getLogs().subscribe(
      data => this.handleData_logs(data),
      error => this.handleError_logs(error),
      () => console.log('Completed!')
    );
  }

  private handleData_logs(data) {
    if (data.result == 'OK') {
      this.logs = data.payload;
      this.loadingIndicator = false;
    }
  }

  private handleError_logs(error) {
    console.log('Error during getting dashboard data!');
    console.log(error);
  }

}
