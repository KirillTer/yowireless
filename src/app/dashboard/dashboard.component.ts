import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/services";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cpServers;
  cps;

  constructor(private data: DataService, ) { }

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
        if (cpStateList == null) {
          continue;
        }
        for (let j = 0; j < cpStateList.length; j++) {
          let cpState = cpStateList[j];
          cpState.host = this.cpServers[i].host;
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
