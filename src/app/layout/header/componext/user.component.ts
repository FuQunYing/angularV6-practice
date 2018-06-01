import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from '../../../service/cookie.service';

@Component({
  selector: 'app-header-user',
  template: `
    <nz-dropdown [nzTrigger]="'click'">
      <div class="user" nz-dropdown>
        <nz-avatar [nzText]="firstName" style="margin-right: 8px;"></nz-avatar>
        <div class="info">{{username}}<i class="anticon anticon-down"></i></div>
      </div>
      <ul nz-menu>
        <li nz-menu-item>
          <a target="_blank" rel="noopener noreferrer"><i class="anticon anticon-user"></i>个人资料</a>
        </li>
        <li nz-menu-item>
          <a target="_blank" rel="noopener noreferrer">操作记录</a>
        </li>
        <li nz-menu-item>
          <a target="_blank" rel="noopener noreferrer" (click)="logOut()"><i class="anticon anticon-logout"></i>退出</a>
        </li>
      </ul>
    </nz-dropdown>
  `,
  styles: [`
      .user{
        display: flex;
        align-items: center;
        color: #fff;
        cursor: pointer;
      }
  `]
})
export class HeaderUserComponent implements OnInit {
  constructor (private router: Router, private _cookie: CookieService) {}
  public username: any;
  public firstName: any;
  logOut() {
    localStorage.clear();
    this._cookie.delCookie('login');
    this.router.navigate(['/login']);
    location.reload();
  }
  ngOnInit() {
    this.username = this._cookie.getStorage('username');
    this.firstName = this.username.substr(0, 1);
  }
}
