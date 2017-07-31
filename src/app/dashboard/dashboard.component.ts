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
  loadingIndicator: boolean = true;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.refreshDashboard();
    this.cpServersColumns = [
      { prop: 'host', name: 'host', width: 100, minWidth: 100, maxWidth: 100, resizable: false, canAutoResize: false, draggable: false },
      { prop: 'nginxState', name: 'nginx', width: 100, minWidth: 100, maxWidth: 100, resizable: false, canAutoResize: false },
      { prop: 'postgresqlState', name: 'postgresql', width: 120, minWidth: 120, maxWidth: 120, resizable: false, canAutoResize: false },
      { prop: 'radiusState', name: 'radius', width: 100, minWidth: 100, maxWidth: 100, resizable: false, canAutoResize: false },
      { prop: 'replicationState', name: 'replication', width: 130, minWidth: 130, maxWidth: 130, resizable: false, canAutoResize: false },
      { prop: 'cpAppState', name: 'CP app', width: 120, minWidth: 120, maxWidth: 120, resizable: false, canAutoResize: false },
      { prop: 'cpSpace.freeGB', name: 'freeSpace', width: 120, minWidth: 120, maxWidth: 120, resizable: false, canAutoResize: false },
      { prop: 'certificateExpireDate', name: 'cert expires', width: 140, minWidth: 140, maxWidth: 140, resizable: false, canAutoResize: false }
    ];
    this.cpsColumns = [
      { prop: 'host', name: 'host', width: 80, minWidth: 80, maxWidth: 80, resizable: false, canAutoResize: false, draggable: false },
      { prop: 'nasid', name: 'nasid', width: 140, minWidth: 140, maxWidth: 140, resizable: false, canAutoResize: false, draggable: false  },
      { prop: 'localTime', name: 'localTime', width: 130, minWidth: 130, maxWidth: 130, resizable: false, canAutoResize: false, draggable: false  },
      { prop: 'lastHourSessionsCount', name: 'lastHourSessionsCount', width: 220, minWidth: 220, maxWidth: 220, resizable: false, canAutoResize: false, draggable: false  },
      { prop: 'todaySessionsCount', name: 'todaySessionsCount', width: 190, minWidth: 190, maxWidth: 190, resizable: false, canAutoResize: false, draggable: false  },
      { prop: 'lastHourNewUsersCount', name: 'lastHourNewUsersCount', width: 220, minWidth: 220, maxWidth: 220, resizable: false, canAutoResize: false, draggable: false  },
      { prop: 'todayNewUsersCount', name: 'todayNewUsersCount', width: 220, minWidth: 220, maxWidth: 220, resizable: false, canAutoResize: false, draggable: false  }
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
        this.cpServers[i].host = this.cpServers[i].host.replace('https://ikea-', '').replace('.net', '');
        let cpStateList = this.cpServers[i].cpStateList;
        if (this.cpServers[i].certificateExpireDate === 0) {
          this.cpServers[i].certificateExpireDate = 'UNDEFINED';
        } else {
          let d = new Date(this.cpServers[i].certificateExpireDate);
          let datepipe: DatePipe = new DatePipe(this.cpServers[i].certificateExpireDate);
          this.cpServers[i].certificateExpireDate = datepipe.transform(d, 'yyyy-MM-dd');
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
      this.loadingIndicator = false;
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
