import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../../service/login.service';
import {CookieService} from '../../../service/cookie.service';
import {ROUTER_LIST} from '../../routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService, CookieService]
})
export class LoginComponent implements OnInit {

  public loadingFlag: boolean;
  validateForm: FormGroup;
  public res: any;
  routerList = ROUTER_LIST;
  constructor(private fb: FormBuilder, private loginService: LoginService, private _cookie: CookieService, private router: Router) { }

  keyDown(e) {
    const keyCode = window.event ? e.keyCode : e.which;
    if (keyCode === 13) {
      this._submitForm();
    }
  }

  _submitForm() {
    this.loadingFlag = true;
    this._cookie.setStorage('username', this.validateForm.value.userName);
    this.loginService.login(this.validateForm.value).subscribe( res => {
      console.log(res);
      this.loadingFlag = false;
      this.res = res;
      if (this.res.rcode !== 0) {
        console.log('登录失败');
      } else {
        this._cookie.setStorage('token', this.res.result.token);
        this._cookie.setStorage('secret', this.res.result.secret);
        this._cookie.setStorage('role', this.res.result.role);
        this._cookie.setStorage('title', this.res.result.title);
        this._cookie.setCookie('login', 'true', 2);
        this.router.navigate(['device']);
        const powerArr = {
          arr: this.res.result.resources
        };
        this._cookie.setStorage('power', JSON.stringify(powerArr));
      }
    });
  }
  ngOnInit() {
    this.isLogin();
    // 防止后退触发
    /*const load = this._cookie.getStorage('username');
    console.log(load);
    if (load) {
      localStorage.clear();
      location.reload();
    }*/
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
//  判断cookie是否已经存在登录
  isLogin() {
    if (this._cookie.getCookie('login') === 'true') {
      this.router.navigate(['device']);
    }
  }
}
