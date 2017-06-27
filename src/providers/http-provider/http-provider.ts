import {Injectable} from "@angular/core";
import {Http, RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";

import {Globals} from "../../globals/globals";

@Injectable()
export class HTTPProvider {
    requestOptions: any;

    constructor(public http: Http) {
    }

    /*    private handleData(response: Response) {
     let body = response.json();

     return body || {};
     }
     */

    /*    private handleError(responseError: Response) {
     return Observable.throw(responseError);
     }
     */
    private handleError(error: any): Promise<any> {
        return Promise.resolve(error.message || error);
    }

    setRequestOptions() {
        this.requestOptions = new RequestOptions({headers: Globals.getHeaders()});
    }

    get(httpRequestURL) {
        // Set the request options (header)
        this.setRequestOptions();

        return new Promise(resolve => {
            this.http.get(httpRequestURL, this.requestOptions)
                .map(res => res.json())
                .catch(this.handleError)
                .subscribe(
                    data => resolve(data),
                    error => this.handleError(error)
                );
        });
    }

    post(httpRequestURL, requestBody) {
        // Set the request options (header)
        this.setRequestOptions();

        return new Promise(resolve => {
            this.http.post(httpRequestURL, requestBody, this.requestOptions)
                .map(res => res.json())
                .catch(this.handleError)
                .subscribe(
                    data => resolve(data),
                    error => this.handleError(error)
                )
        })
    }

    put(httpRequestURL, requestBody) {
        // Set the request options (header)
        this.setRequestOptions();

        return new Promise(resolve => {
            this.http.put(httpRequestURL, requestBody, this.requestOptions)
                .map(res => res.json())
                .catch(this.handleError)
                .subscribe(
                    data => resolve(data),
                    error => this.handleError(error)
                )
        })
    }
}
