import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { CookieService } from './cookie.service';
import {NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class AuthGuardService implements CanActivate {

  powerArr: any;
  constructor(
    private router: Router,
    private _cookie: CookieService,
    private _message: NzMessageService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    if (url === '/login') {
      return true;
    }
    if (this._cookie.getStorage('title') === '超级管理员') {
    } else {
      const power = this._cookie.getStorage('power');
      this.powerArr = JSON.parse(power);
      this.powerArr = this.powerArr.arr;
      const canFlag = this.powerArr.find(f => '/' + f === url);
      if (canFlag) {
      } else {
        this._message.create('error', '您没有此权限');
        return false;
      }
    }
    return this.checkAuth(url);
  }
  checkAuth(url): boolean {
    if (this._cookie.getCookie('login') === 'true') {
      return true;
    } else {
      console.log('尚未登录');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
