import {Headers} from "@angular/http";

export class Globals {
  static USERTOKEN: string;
  static LOGGEDINUSER: any;

  static SERVERADDR: string = 'http://127.0.0.1:9201';

  static getHeaders() {
    return new Headers({
      'X-AUTH-TOKEN': Globals.USERTOKEN,
      'Content-Type': 'application/json'
    });
  }
}
