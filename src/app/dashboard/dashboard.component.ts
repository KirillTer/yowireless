import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/services";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cpServers;
  cps;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.refreshDashboard();
  }

  refreshDashboard() {
    this.data.getDashboardData().subscribe(
      data => this.handleData_dashboard(data),
      error => this.handleError_dashboard(error),
      () => console.log('Completed!')
    );
  }

  private handleData_dashboard(data) {
    if (data.result == 'OK') {
      this.cpServers = data.cpServers;
      this.cps = [];
      for (let i = 0; i < this.cpServers.length; i++) {
        let cpStateList = this.cpServers[i].cpStateList;
        if (this.cpServers[i].certificateExpireDate === 0) {
          this.cpServers[i].certificateExpireDate = 'UNDEFINED';
        } else {
          let d = new Date(this.cpServers[i].certificateExpireDate);
          let datepipe: DatePipe = new DatePipe(this.cpServers[i].certificateExpireDate);
          this.cpServers[i].certificateExpireDate = datepipe.transform(d, 'yyyy-MM-dd hh:mm:ss');
        }
        if (cpStateList == null) {
          continue;
        }
        for (let j = 0; j < cpStateList.length; j++) {
          let cpState = cpStateList[j];
          cpState.host = this.cpServers[i].host;
          cpState.localTime = new Date(cpState.localTime);
          let datepipe: DatePipe = new DatePipe(cpState.localTime);
          cpState.localTime = datepipe.transform(cpState.localTime, 'yyyy-MM-dd hh:mm:ss');
          this.cps.push(cpState);
        }
      }
    }
  }

  private handleError_dashboard(error) {
    console.log('Error during getting dashboard data!');
    console.log(error);
  }
}
