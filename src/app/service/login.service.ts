import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(
    private  http: HttpClient,
  ) { }
  public login(postData) {
    const uri = '/login';
    const body = {
      'username': postData.userName,
      'password': postData.password
    };
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(uri, body, {headers: header}).map(res => {
      console.log(res);
      return res;
    });
  }
  async getPromise(uri, body, headers): Promise<any> {
    return this.http.post(uri, body, headers).toPromise();
  }
  private HandlerError(error: any): Promise<any> {
    console.log('发生了一个错误', error);
    return Promise.reject(error.message || error);
  }
}
