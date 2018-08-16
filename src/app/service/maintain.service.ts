import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CookieService} from './cookie.service';

@Injectable()
export class MaintainService {

  constructor(private http: HttpClient, private _cookie: CookieService  ) { }
  // headers
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-access-token': this._cookie.getStorage('token'),
    'secret': this._cookie.getStorage('secret')
  });

  /**
   * 获取审核商品列表
   * @param body
   * @returns {Promise<any>}
   */
  public getCheckgoods(body): Promise<any> {
    const uri = '/api/v1/maintain/checkgoods';
    return this.http.post(uri, body, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * 通过审核
   * @param body
   * @returns {Promise<any>}
   */
  public passReview(body): Promise<any> {
    const uri = '/api/v1/maintain/passReview';
    return this.http.post(uri, body, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * 一键审核通过
   * @param body
   * @returns {Promise<any>}
   */
  public passReviewMore(body): Promise<any> {
    const uri = '/api/v1/maintain/passReviewMore';
    const data = {
      'data': body
    };
    return this.http.post(uri, data, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * 商品审核不通过
   * @param body
   * @returns {Promise<any>}
   */
  public notPassReview(body): Promise<any> {
    const uri = '/api/v1/maintain/notPassReview';
    return this.http.post(uri, body, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * 一键审核不通过
   * @param body
   * @returns {Promise<any>}
   */
  public notPassReviewMore(body): Promise<any> {
    const uri = '/api/v1/maintain/notPassReviewMore';
    const data = {
      'data': body
    };
    return this.http.post(uri, data, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * 获取公有库商品
   * @param body
   * @returns {Promise<any>}
   */
  public getGoods(body): Promise<any> {
    const uri = '/api/v1/maintain/good/get';
    return this.http.post(uri, body, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * 获取公有图片库
   * @param body
   * @returns {Promise<any>}
   */
  public getImg(body): Promise<any> {
    const uri = '/api/v1/maintain/good/img';
    return this.http.post(uri, body, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * 添加商品到公有库
   * @param body
   * @returns {Promise<any>}
   */
  public addGoods(body): Promise<any> {
    const uri = '/api/v1/maintain/good/add';
    return this.http.post(uri, body, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * 修改公有库商品
   * @param body
   * @returns {Promise<any>}
   */
  public editGoods(body): Promise<any> {
    const uri = '/api/v1/maintain/good/edit';
    return this.http.post(uri, body, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * 删除公有库商品
   * @param body
   * @returns {Promise<any>}
   */
  public delete(body): Promise<any> {
    const uri = '/api/v1/maintain/good/del';
    return this.http.post(uri, body, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
