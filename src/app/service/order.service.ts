import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CookieService} from './cookie.service';

@Injectable()
export class OrderService {

  constructor( private http: HttpClient, private _cookie: CookieService) { }
  // headers
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-access-token': this._cookie.getStorage('token'),
    'secret': this._cookie.getStorage('secret')
  });

  /**
   * 单号查询
   * @param body
   * @returns {Promise<any>}
   */
  public getOrder(body): Promise<any> {
    const uri = 'api/v1/order/query';
    return this.http.post(uri, body, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * 订单投诉
   * @param body
   * @returns {Promise<any>}
   */
  public getComplain(body): Promise<any> {
    const uri = '/api/v1/order/complain';
    return this.http.post(uri, body, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
