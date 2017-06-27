import {Headers} from "@angular/http";

export class Globals {
  static USERTOKEN: string;
  static LOGGEDINUSER: any;

  static SERVERADDR: string;

  constructor() {
    Globals.SERVERADDR = window.location.host + '9100';
  }

  static getHeaders() {
    return new Headers({
      'X-AUTH-TOKEN': Globals.USERTOKEN,
      'Content-Type': 'application/json'
    });
  }
}
