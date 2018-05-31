import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from './cookie.service';

@Injectable()
export class PowerService {

  constructor(private http: HttpClient, private _cookie: CookieService) { }
  // headers
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-access-token': this._cookie.getStorage('token'),
    'secret': this._cookie.getStorage('secret')
  });

  /**
   * 获取所有用户
   * @returns {Promise<Object>}
   */
  public getUser(): Promise<any> {
    const uri = '/api/v1/user?pageSize=99&pageNum=1&step=start';
    return this.http.get(uri, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * 获取所有角色
   * @returns {Promise<any>}
   */
  public getRole(): Promise<any> {
    const uri = '/api/v1/role?pageSize=99&pageNum=1&step=start';
    return this.http.get(uri, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * 获取资源
   * @returns {Promise<any>}
   */
  public getRes(): Promise<any> {
    const uri = '/api/v1/res?pageSize=99&pageNum=1&step=start';
    return this.http.get(uri, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }
  handleError(error: any) {
    console.log('An error occurred:', error);
    return Promise.reject(error.message || error);
  }
}
