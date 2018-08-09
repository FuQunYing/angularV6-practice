import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { SpeedService} from '../../../service/speed.service';
import { ConsumerManagementService} from '../../../service/consumer-management.service';
import { NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-speed',
  templateUrl: './speed.component.html',
  styleUrls: ['./speed.component.scss'],
  providers: [SpeedService]
})
export class SpeedComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private speedService: SpeedService,
              private consumer: ConsumerManagementService,
              private msg: NzMessageService) { }

  public envFlag: Boolean; // 设置环境
  isVisible = false; // 弹窗设置
  public loadingFlag: Boolean; // 加载提示
  public showFlag: Boolean; // 数据展示
  public snInfoData: any; // 查询数据
  public snData: any; // 存储搜索完毕的SN号，防止表单不小心篡改SN
  public coin_delayValue: any;
  public charge_delayValue: any;
  public environment: any;
  name = '上分速度';
  validateForm: FormGroup;
  controlArray = [
    {name: 'SN', ctl: 'sn'}
  ];
  public enterEditFlag: Boolean; // 控制进入修改模式标记

  enterChange() { // 进入修改模式
    console.log('点击进入修改模式');
    this.enterEditFlag = true;
  }

  // 点击修改
  enterEdit() {
    this.enterEditFlag = true;
    this.coin_delayValue = this.snInfoData[0].coin_delay;
    this.charge_delayValue = this.snInfoData[0].charge_delay;
  }

  change() {
    console.log('提交修改');
    const postData = {
      'sn': this.snInfoData[0].sn,
      'coin': parseInt(this.coin_delayValue, 10),
      'charge': parseInt(this.charge_delayValue, 10),
      'env': this.environment
    };
    console.log(postData);
    this.speedService.UpDate(postData).then(res => {
      console.log(res);
      if (res.rcode === 0) {
        this.msg.create('success', '修改成功');
      } else {
        this.msg.create('error', '修改失败');
      }
    });
  }

  _query() {
    this.enterEditFlag = false;
    this.snInfoData = {};
    this.environment = this.envFlag ? 'prod' : 'test';
    const postData = {
      sn: this.validateForm.value.sn,
      env: this.environment
    };
    console.log(postData);
  //  加载提示
    this.loadingFlag = true;
    this.showFlag = false;
    this.speedService.selectSN(postData).then( res => {
      this.snInfoData = res;
      console.log(this.snInfoData);
    //  关闭加载
      this.loadingFlag = false;
      this.showFlag = true;
    });
  }
  ngOnInit() { // 初始化
  //  隐藏数据
    this.loadingFlag = false;
    this.showFlag = false;
  //  查询设备数据
    this.snInfoData = [];
  //  构造 查询SN号表单
    this.validateForm = this.fb.group({});
    for (const i of this.controlArray) {
      this.validateForm.addControl(i.ctl, new FormControl());
    }
  //  初始化修改模式
    this.enterEditFlag = false;
  }

}
