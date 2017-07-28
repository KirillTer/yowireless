import { CanActivate, Router } from '@angular/router';
import {DataService} from "../services/services";
import {Injectable} from "@angular/core";

@Injectable()
export class Authentication implements CanActivate {

  constructor(private data: DataService, private router: Router) {}

  canActivate() {
    this.data.isLoggedIn().subscribe(
        data => this.handleData_check(data),
        error => this.handleError_check(error),
        () => console.log('Completed!')
      );
    return true;
  }

  private handleData_check(data: any | any) {
    if(data.result == 'OK')
      return true;
  }

  private handleError_check(error: any) {
    this.router.navigate(['/login']);
  }
}
