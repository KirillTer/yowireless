import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, RequestMethod} from "@angular/http";
import {Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Globals} from "../globals/globals";

@Injectable()
export class DataService {
  data: Response;
  result: any;
  error: any;

  constructor(private http: Http) {
    this.data = null;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(responseError: Response) {
    let body = responseError.json();
    return Observable.throw(body);
  }

  login(username, password){
    console.log(username);
    console.log(password);
    let body = {
      username: username,
      password: password
    };
    let url = Globals.SERVERADDR + '/login?username=' + username + '&password=' + password;
    let userCred = window.btoa(username + ':' + password);
    let headers = new Headers({
      'Authorization': 'Basic ' + userCred,
      'Content-Type': 'application/json'
    });
    console.log(body);
    return this.http.post(url, body, {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  getDashboardData() {
    let headers = new Headers({'X-AUTH-TOKEN': Globals.USERTOKEN});
    return this.http.get(Globals.SERVERADDR + '/cpServersStatus', {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }
}
