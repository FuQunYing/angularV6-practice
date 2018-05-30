import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CookieService} from './cookie.service';

@Injectable()
export class SpeedService {

  constructor(private http: HttpClient, private _cookie: CookieService) { }
  private header = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-access-token': this._cookie.getStorage('token'),
    'secret': this._cookie.getStorage('secret')
  });

  /**
   * 查询SN
   * @param body
   * @returns {Promise<any>}
   */
  public selectSN(body) {
    console.log(body);
    const uri = '/api/v1/device/selectSn';
    return this.http.post(uri, body, {headers: this.header})
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * 更新设备延时
   * @param body
   * @returns {Promise<any>}
   * @constructor
   */
  public UpDate(body) {
    const uri = '/api/v1/device/speed';
    return this.http.post(uri, body, {headers: this.header})
      .toPromise()
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.log('上分服务发生错误', error);
    return Promise.reject(error.message || error);
  }
}
