import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Globals} from "../globals/globals";

@Injectable()
export class DataService {
  http: Http;
  data: Response;
  result: any;
  error: any;

  constructor(http: Http) {
    this.http = http;
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
    let body = JSON.stringify({
      username: username,
      password: password
    });

    let userCred = window.btoa(username + ':' + password);
    let headers = new Headers({
      'Authorization': 'Basic ' + userCred,
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({headers: headers});

    return this.http.post(Globals.SERVERADDR + '/public/login', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
}
