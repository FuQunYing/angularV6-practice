import { Component, OnInit } from '@angular/core';
import { PowerService } from '../../../service/power.service';
import { POWER_LIST } from '../../power-table';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  providers: [PowerService]
})
export class ManageComponent implements OnInit {
  name = '用户管理';
  // 管理者数据
  public userData: any;
  // 角色数据
  public roleData: any;
  // 资源数据
  public resData: any;
  // 展示数据
  public showFlag: any;
  // 对比数据
  public compareData: any;
  // 展示展示数据
  public userShowData: any;
  // 当前编辑的角色
  public selectRole: any;
  // 双向绑定显示数据
  public selectedOption: any;
  // 点击展示的名字
  public showName: any;
  // 点击所选角色
  public updateRolePlayer: any;
  public resShowFlag: Boolean;
  public resName: string;
  public resRoute: string;
  list: any[] = [];

  updataModel = false;
  addRoleModel = false;
  resModel = false;

  constructor(private powerService: PowerService, private _message: NzMessageService) {
  }

  ngOnInit() {
    this.resShowFlag = false;
    this.showFlag = false;
    this.refalsh();
    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: i.toString(),
        title: `content${i + 1}`,
        disabled: i % 3 < 1,
      });
    }
  }

  // 根据路由寻找对应权限
  changeTitle() {
    this.compareData = POWER_LIST;
    // 遍历对象
    for (let i = 0; i < this.userData.length; i++) {
      const taget = this.userData[i];
    }
  }

  refalsh() {
    // 获取角色规则
    this.powerService.getRole().then(res => {
      this.userData = res;
      this.userData = this.userData.result.data;
      // 初始化选择数组
      console.log(this.userData);
    });

    this.powerService.getUser().then(res => {
      this.showFlag = true;
      this.roleData = res;
      this.roleData = this.roleData.result.data;
    });
    // 获取资源
    this.powerService.getRes().then(res => {
      this.resData = res;
      this.resData = this.resData.result.data;
      console.log(this.resData);
      for (let i = 0; i < this.resData.length; i++) {
        this.resData[i].title = this.resData[i].name;
        this.resShowFlag = true;
      }
    });
  }

  // 更改身份弹窗
  updataID(data) {
    this.updataModel = true;
    this.showName = data.username;
    this.selectRole = data.role;
    for (let i = 0; i < this.userData.length; i++) {
      if (this.userData[i].role === this.selectRole) {
        this.selectedOption = this.userData[i];
      }
    }
  }

  updataOk = (e) => {
    console.log(this.showName);
    console.log(this.selectedOption, '选择角色');
    const postData = {
      'role': this.selectedOption.role,
      'status': 0
    };
    console.log(postData);
    this.powerService.editUser(postData, this.showName).then(res => {
      if (res.rcode === 0) {
        this._message.create('success', '修改成功');
        this.refalsh();
      } else {
        this._message.create('error', '修改失败');
      }
      console.log(res);
      this.updataModel = false;
    });
  }

  updataCancel = (e) => {
    this.updataModel = false;
  }

  // 身份管理
  addRole() {
    this.changeIndex(this.userData[0]);
    this.addRoleModel = true;
  }

  addOk(e) {
    this.addRoleModel = false;
  }

  addCancel(e) {
    this.addRoleModel = false;
  }

  // 修改角色的资源
  changeIndex(event) {
    this.updateRolePlayer = event.role;
    this.resShowFlag = false;
    for (let i = 0; i < this.resData.length; i++) {
      const lord = event.resources.find(f => f === this.resData[i].router_name);
      // 如果能找到
      if (lord) {
        this.resData[i].direction = 'left';
      } else {
        this.resData[i].direction = 'right';
      }
    }
  }

  test() {
    this.resShowFlag = true;
  }

  // 跟新角色所包括的资源
  upDateRole() {
    const postData = {
      'title': this.updateRolePlayer,
      'status': 0,
      'resources': [
      ]
    };
    for (let i = 0; i < this.resData.length; i++) {
      if (this.resData[i].direction === 'left') {
        postData.resources.push(this.resData[i].router_name);
      }
    }
    console.log(postData, '提交数据');
    // 发送put请求给后台
    this.powerService.editRole(postData, postData.title).then(
      res => {
        if (res.rcode === 0) {
          this._message.create('success', '修改成功');
        } else {
          this._message.create('error', '修改失败');
        }
        console.log(res);
      }
    );
  }

  select(ret: any) {
  }

  change(ret: any) {
    for (let i = 0; i < ret.list.length; i++) {
      this.resData.find(f => {
        if (f.router_name === ret.list[i].router_name) {
          if (f.direction === 'right') {
            f.direction = 'left';
          } else {
            f.direction = 'right';
          }
        }
      });
    }
  }

  // 添加新的资源

  addRes() {
    this.resModel = true;
  }
  resCancel() {
    this.resModel = false;
  }

  resOk() {
    console.log(this.resName);
    console.log(this.resRoute);
    const postData = {
      'name': this.resName,
      'router_name': this.resRoute,
      'method': 'post'
    };
    this.powerService.addRes(postData).then(res => {
      if (res.rcode === 0) {
        this._message.create('success', '添加成功');
      } else {
        this._message.create('error', '添加失败');
      }
    });
  }
}



