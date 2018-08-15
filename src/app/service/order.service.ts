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
  /**
   * 获取收益分析
   * @returns {Promise<any>}
   */
  getYhdOrder(pageNum: number, pageSize: number, condition: any): Promise<any> {
    const uri = `/api/v1/order/yhd`;
    const body = {
      'condition': {
        'time': {'start': condition.stime, 'end': condition.etime},
        'ordernum': condition.ordernum ? condition.ordernum : '',
        'no3': condition.no3 ? condition.no3 : '',
        'sn': condition.sn ? condition.sn : '',
        'mcode': condition.mcode ? condition.mcode : '',
        'account': condition.account ? condition.account : '',
        'client': condition.client ? condition.client : '',
        'cardno': condition.cardno ? condition.cardno : '',
        'status': `${condition.status === undefined || condition.status === null ? '' : condition.status}`,
        'price': {'start': condition.moneyMin * 100, 'end': condition.moneyMax * 100}
      },
      'pageNum': pageNum,
      'pageSize': pageSize,
      'step': 'start'
    };
    console.log(body);
    return this.http.post(uri, JSON.stringify(body), {headers: this.headers})
      .toPromise();
  }
  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
