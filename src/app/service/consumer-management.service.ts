import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from './cookie.service';


@Injectable()
export class ConsumerManagementService {

  constructor(private http: HttpClient, private router: Router, private _cookie: CookieService) { }
  // 设置头部
  private header = new HttpHeaders({
    'Coontent-Type': 'application/json',
    'x-access-token': this._cookie.getStorage('token'),
    'secret': this._cookie.getStorage('secret')
  });

  /**
   * 获取卡信息
   * @param body
   * @returns {Promise<any>}
   */
  public getCardInfo(body): Promise<any> {
    const uri = '/api/v1/cardno/query';
    return this.http.post(uri, body, {headers: this.header})
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * 虚拟充值
   * @param body
   * @returns {Promise<any>}
   */
  public recharge(body): Promise<any> {
    const uri = '/api/v1/cardno/recharge';
    return this.http.post(uri, body, {headers: this.header})
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * 清空余额功能
   * @param body
   * @returns {Promise<any>}
   */
  public clearAmount(body): Promise<any> {
    const uri = '/api/v1/cradno/clear_amount';
    return this.http.post(uri, body, {headers: this.header})
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * 清除虚拟余额功能
   * @param body
   * @returns {Promise<any>}
   */
  public updateRedpacket(body): Promise<any> {
    const uri = '/api/v1/cardno/udpate_redpacket';
    return this.http.post(uri, body, {headers: this.header})
      .toPromise()
      .catch(this.handleError);
  }
  // 打印错误
    private handleError(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
