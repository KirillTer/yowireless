import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Globals} from "../globals/globals";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Injectable()
export class DataService {
  data: Response;
  result: any;
  error: any;

  constructor(private http: Http,
              private router: Router,
              private cookies: CookieService) {
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
    this.loadToken();
    let headers = new Headers({'X-AUTH-TOKEN': Globals.USERTOKEN});
    return this.http.post(Globals.SERVERADDR + '/cpServersStatus', {}, {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  getEmailSettings() {
    this.loadToken();
    let headers = new Headers({'X-AUTH-TOKEN': Globals.USERTOKEN});
    return this.http.post(Globals.SERVERADDR + '/getEmailSettings', {}, {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  loadToken(){
    if (Globals.USERTOKEN == null) {
      Globals.USERTOKEN = this.cookies.get(Globals.COOK_USERTOKEN);
    }
  }

  saveEmailSettings(mail: any) {
    this.loadToken();
    let headers = new Headers({'X-AUTH-TOKEN': Globals.USERTOKEN});
    return this.http.post(Globals.SERVERADDR + '/saveEmailSettings', mail,{headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  getUsers() {
    this.loadToken();
    let headers = new Headers({'X-AUTH-TOKEN': Globals.USERTOKEN});
    return this.http.post(Globals.SERVERADDR + '/users', {}, {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  getSmsSettings() {
    let headers = new Headers({'X-AUTH-TOKEN': Globals.USERTOKEN});
    return this.http.post(Globals.SERVERADDR + '/getSmsSettings', {}, {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  saveSmsSettings(sms: any) {
    this.loadToken();
    let headers = new Headers({'X-AUTH-TOKEN': Globals.USERTOKEN});
    return this.http.post(Globals.SERVERADDR + '/saveSmsSettings', sms,{headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  getNotifications() {
    let headers = new Headers({'X-AUTH-TOKEN': Globals.USERTOKEN});
    return this.http.post(Globals.SERVERADDR + '/getNotifications', {},{headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }
}
