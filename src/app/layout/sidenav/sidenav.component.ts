import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ROUTER_LIST } from '../../routes/routes';
import { Title } from '@angular/platform-browser';
import { CookieService } from '../../service/cookie.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {


  public username: any;
  public firstName: any;
  public roleTitle: any; // 用户职位
  public powerArr: any; // 权限列表
  routerList = ROUTER_LIST; // 路由总表
  componentList = [];
  choose = '';
  powerManage = false;

  constructor( private router: Router, private title: Title, private _cookie: CookieService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.username = this._cookie.getStorage('username'); // 获取用户名
    this.firstName = this.username.substr(0, 1); // 获取用户名的首字母，做头像
    this.roleTitle = this._cookie.getStorage('title'); // 获取职位
    const Arr = this._cookie.getStorage('power'); // 获取权限
    const role = this._cookie.getStorage('role');
    this.powerArr = JSON.parse(Arr);
    if ( role === 'admin' ) {
      console.log('超级管理员登录');
      this.powerManage = true;
    } else {
      // 权限配置
      this.powerArr = this.powerArr.arr;
      console.log(this.powerArr);
      const newArr =  this.routerList;
      // 权限预处理
      for (let i = 0; i < newArr.components.length; i++) {
        const target = newArr.components[i].children;
        for (let j = 0; j < target.length; j++) {
          if (!this.powerArr.find(f => f === target[j].path)) {
            target.splice(j, 1);
          }
        }
      }
      // 路由变换改变样式
      const lard = this.powerArr.find(f => f === 'device/activate');
      if (!lard) {
        const Del = this.routerList.components[0].children.find(f => f.path === 'device/activate');
        if (Del) {
          const index = this.routerList.components[0].children.indexOf(Del);
          this.routerList.components[0].children.splice(index, 1);
        }
      }
    }
    this.routerList.components.forEach(group => {
      this.componentList = this.componentList.concat([...group.children]);
    });
    this.router.events.subscribe( event => { // 标签页的title更改
      if (event instanceof NavigationEnd) {
        const currentDemoComponent = this.componentList.find( component => `/${component.path}` === this.router.url);
        if (currentDemoComponent) {
          this.title.setTitle(`${currentDemoComponent.zh} - 运维平台`);
          const chooseArr = currentDemoComponent.path.split('/');
          this.choose = chooseArr[0];
        }
        window.scrollTo(0, 0);
      }
    });
  }
}
