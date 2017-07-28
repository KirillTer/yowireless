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
  tempCps;
  cpServersColumns;
  cpsColumns;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.refreshDashboard();
    this.cpServersColumns = [
      { prop: 'host', name: 'host' },
      { prop: 'nginxState', name: 'nginxState' },
      { prop: 'postgresqlState', name: 'postgresqlState' },
      { prop: 'radiusState', name: 'radiusState' },
      { prop: 'replicationState', name: 'replicationState' },
      { prop: 'cpAppState', name: 'cpAppState' },
      { prop: 'cpSpace.totalGB', name: 'totalSpace' },
      { prop: 'cpSpace.freeGB', name: 'freeSpace' },
      { prop: 'cpSpace.availableSpace', name: 'availableSpace' },
      { prop: 'certificateExpireDate', name: 'certificateExpireDate' }
    ];
    this.cpsColumns = [
      { prop: 'host', name: 'host' },
      { prop: 'nasid', name: 'nasid' },
      { prop: 'localTime', name: 'localTime' },
      { prop: 'lastHourSessionsCount', name: 'lastHourSessionsCount' },
      { prop: 'todaySessionsCount', name: 'todaySessionsCount' },
      { prop: 'lastHourNewUsersCount', name: 'lastHourNewUsersCount' },
      { prop: 'todayNewUsersCount', name: 'todayNewUsersCount' }
    ];
  }

  refreshDashboard() {
    this.data.getDashboardData().subscribe(
      data => this.handleData_dashboard(data),
      error => this.handleError_dashboard(error),
      () => console.log('Completed!')
    );
  }

  private handleData_dashboard(data) {
    console.log(data);
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
      this.tempCps = this.cps;
    }
  }

  private handleError_dashboard(error) {
    console.log('Error during getting dashboard data!');
    console.log(error);
  }

  updateFilterHost(event) {
    const val = event.target.value;

    // filter our data
    const temp = this.tempCps.filter(function(d) {
      return d.host.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.cps = temp;
  }
  updateFilterNasid(event) {
    const val = event.target.value;

    // filter our data
    const temp = this.tempCps.filter(function(d) {
      return d.nasid.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.cps = temp;
  }
}
