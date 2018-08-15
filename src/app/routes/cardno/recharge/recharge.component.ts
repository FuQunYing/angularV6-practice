import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {ConsumerManagementService} from '../../../service/consumer-management.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.scss'],
  providers: [ConsumerManagementService]
})
export class RechargeComponent implements OnInit {

  name = '虚拟充值';
  validateForm: FormGroup;

  // 加载标识
  public loadingFlag: boolean;


  constructor(private fb: FormBuilder,
              private consumerMangementService: ConsumerManagementService,
              private _message: NzMessageService) {
  }

  controlArray = [
    { name: '卡号', contorl: 'cardno' },
    { name: '充值金额(元)', contorl: 'variable' }
  ];

  /**
   * 重置表单
   */

  resetForm() {
    this.validateForm.reset();
  }

  /**
   * 执行查询动作
   * @private
   */

  _query() {
    if (parseInt(this.validateForm.value.variable, 10) < 0 || this.validateForm.value.variable === null) {
      this._message.create('error', `输入值不能为空`);
      return;
    }
    console.log('点击充值');
    // 开启加载提示
    this.loadingFlag = true;
    const body = {
      'cardno': this.validateForm.value.cardno,
      'variable': parseInt(this.validateForm.value.variable, 10),
      'action': 'update'
    };

    console.log('提交数据', body);
    this.consumerMangementService.recharge(body).then(res => {
      console.log('返回结果', res);
      if (res.rcode === 0) {
        this._message.create('success', '充值成功');
      } else {
        this._message.create('error', '充值失败');
      }
      // 关闭计时器和加载显示
      this.loadingFlag = false;
    });
  }

  ngOnInit() {
    this.loadingFlag = false;
    this.validateForm = this.fb.group({});
    for (const i of this.controlArray) {
      this.validateForm.addControl(i.contorl, new FormControl());
    }
  }

}
