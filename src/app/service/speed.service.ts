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
  data: any;
  public selectSN(body) {
    console.log(body);
    const uri = '/api/v1/device/selectSn';
    return this.http.post(uri, body, {headers: this.header})
      .toPromise()
      .then(res => {
        console.log(res);
        this.data = res;
        if (this.data.result === 0) {
          return [];
        } else {
          return [this.data.result];
        }
      }).catch(this.handleError);
  }
  public UpDate(body) {
    const uri = '/api/v1/device/speed';
    return this.http.post(uri, body, {headers: this.header})
      .toPromise()
      .then( res => {
        console.log(res);
        return res;
      }).catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.log('上分服务发生错误', error);
    return Promise.reject(error.message || error);
  }
}
