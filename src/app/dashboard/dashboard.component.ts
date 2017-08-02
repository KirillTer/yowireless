import {Component, OnInit} from '@angular/core';
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
  loadingIndicator: boolean = true;
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
          cpState.localTime = datepipe.transform(cpState.localTime, 'yyyy-MM-dd HH:mm:ss');
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

  getRowClass(row) {
    return {
      'age-is-ten': (row.age % 10) === 0
    };
  }

  getCellClass({ row, column, value }): any {
    if (value == 0) {
      return ' bad ';
    }
    else if(value > 0 && value <= 30){
      return ' medium '
    }
    else if(value>30){
      return ' good '
    }
  }
  serverState({row, column, value}): any {
    if(value == "OK"){
      return ' good '
    }
    else if(value == "DOWN"){
      return ' bad '
    }
  }
  freeSpace({ row, column, value }): any {
    if (value > 27) {
      return ' good ';
    }
    else if(value < 10){
      return ' bad ';
    }
    else if(value >= 10 && value <= 27){
      return ' medium ';
    }

  }
}
