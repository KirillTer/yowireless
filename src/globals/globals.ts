import {Headers} from "@angular/http";

export class Globals {

  static USERTOKEN: string;
  static COOK_USERTOKEN: string = 'ywm_token';
  static LOGGEDINUSER: any;

  static SERVERADDR: string = 'https://ikea-cp-mon.net/server';
  // static SERVERADDR: string = 'http://localhost:9300';

  static getHeaders() {
    return new Headers({
      'X-AUTH-TOKEN': Globals.USERTOKEN,
      'Content-Type': 'application/json'
    });
  }
}
