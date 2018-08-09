import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CookieService} from './cookie.service';
import { Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor( private router: Router, private http: HttpClient, private _cookie: CookieService) { }
  // 头部
  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-access-token': this._cookie.getStorage('token'),
    'secret': this._cookie.getStorage('secret')
  });

  /**
   * 设备查询功能
   * @param body
   * @returns {Promise<any>}
   * by valerie 2018-05-25
   */
  public DevInfo(body): Promise<any> {
    const uri = '/api/v1/device/query';
    return this.http.post(uri, body, {headers: this.headers})
      .toPromise()
      .catch(this.handlerError);
  }

  /**
   * 设备绑定
   * @param body
   * @returns {Promise<any>}
   */
  public deviceBind(body): Promise<any> {
    const uri = '/api/v1/device/bind';
    return this.http.post(uri, body, {headers: this.headers})
      .toPromise()
      .catch(this.handlerError);
  }

  /**
   * 生产激活 imei查询
   * @param body
   * @returns {Promise<any>}
   */
  public imeiSearch(body): Promise<any> {
    const uri = '/api/v1/device/searchImei';
    return this.http.post(uri, body, {headers: this.headers})
      .toPromise()
      .catch(this.handlerError);
  }

  /**
   * 生产激活 ，activate查询
   * @param body
   * @returns {Promise<any>}
   */
  public activate(body): Promise<any> {
    const uri = '/api/v1/device/sntype/get';
    return this.http.post(uri, body, {headers: this.headers})
      .toPromise()
      .catch(this.handlerError);
  }

  /**
   * 设备类型查询
   * @returns {Promise<any>}
   */
  public getSnType(): Promise<any> {
    const uri = '/api/v1/device/sntype/get';
    return this.http.post(uri, null, {headers: this.headers})
      .toPromise()
      .catch(this.handlerError);
  }

  /**
   * 获取sim卡信息
   * @param {string} iccid
   * @returns {Observable<any>}
   */
  public getSimCard( iccid: string): Observable<any> {
    const uri = `/api/v1/device/simcard/get`;
    const body = {
      'iccid': iccid
    };
    return this.http.post(uri, JSON.stringify(body), {headers: this.headers});
  }

  /**
   * 更新Sim卡状态
   * @param {string} iccid
   * @param {number} status
   * @returns {Observable<any>}
   */
  public updateSimCard( iccid: string, status: number): Observable<any> {
    const uri = `/api/v1/device/simcard/update`;
    const body = {
      'iccid': iccid,
      'status': status
    };
    return this.http.post(uri, JSON.stringify(body), {headers: this.headers});
  }

//  错误处理
  private handlerError(error: any): Promise<any> {
    console.log('发生错误', error);
    return Promise.reject(error.message || error);
  }
}
