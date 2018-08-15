import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import {ConsumerManagementService} from '../../../service/consumer-management.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  providers: [ConsumerManagementService]
})
export class QueryComponent implements OnInit {

  name = '卡号查询';
  validateForm: FormGroup;
  amount = false;
  redpacket = false;
  amountLoading = false;
  redpacketLoading = false;
  //  单号查询数据
  public cardInfoData;
  //  查询数据展示标识
  public showBoxFlag: Boolean;
  // 加载显示
  public loadingFlag: Boolean;
  // 提交数据
  public postData: any;
  // 搜寻回来的卡号;
  public cardno: number;
  constructor(
    private fb: FormBuilder,
    private consumerMangementService: ConsumerManagementService,
    private _message: NzMessageService
  ) {
  }

  controlArray = [
    { name: '卡号', contorl: 'cardno' },
    { name: 'openid', contorl: 'openid' }
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
    // 对象处理
    const obj = this.validateForm.value;
    this.postData = {};
    // 输入对象预处理
    for (const key in obj) {
      if (obj[key] === null) {
        // this.postData[key] = '';
      } else {
        this.postData[key] = obj[key];
      }
    }

    if (Object.keys(this.postData).length === 0) {
      this._message.create('error', '输入为空');
      return;
    }

    this.showBoxFlag = false;
    // 显示加载
    this.loadingFlag = true;

    this.consumerMangementService.getCardInfo(this.postData).then(
      res => {
        this.cardInfoData = res;
        this.showBoxFlag = true;
        this.loadingFlag = false;
      }
    );
  }

  // 更新函数
  update(cardno) {
    const postData = {
      'cardno': cardno
    };
    this.showBoxFlag = false;
    // 显示加载
    this.loadingFlag = true;
    this.consumerMangementService.getCardInfo(postData).then(
      res => {
        this.cardInfoData = res;
        this.showBoxFlag = true;
        this.loadingFlag = false;
      }
    );
  }

  amountCanle() {
    this.amount = false;
  }

  // 清空余额
  clearBlance(data) {
    this.amount = true;
    this.cardno = data.cardno;
  }

  amountOk() {
    this.amountLoading = true;
    const postData = {
      'cardno': this.cardno
    };
    this.consumerMangementService.clearAmount(postData).then(
      res => {
        this.amountLoading = false;
        if (res.rcode === 0) {
          this._message.create('success', '余额清空成功');
          this.update(this.cardno);
        } else {
          this._message.create('error', '余额清空失败');
        }
        this.amount = false;
      }
    );
  }
  // 清空虚拟余额
  clearRedpacket(data) {
    this.cardno = data.cardno;
    this.redpacket = true;
  }

  redpacketOK() {
    this.redpacketLoading = true;
    const postData = {
      'cardno': this.cardno
    };
    this.consumerMangementService.updateRedpacket(postData).then(
      res => {
        this.redpacketLoading = false;
        if (res.rcode === 0) {
          this._message.create('success', '余额清空成功');
          this.update(this.cardno);
        } else {
          this._message.create('error', '余额清空失败');
        }
        this.redpacket = false;
      }
    );
  }

  handleCancel() {
    this.amount = false;
  }

  ngOnInit() {
    this.showBoxFlag = false;
    this.validateForm = this.fb.group({});
    for (const i of this.controlArray) {
      this.validateForm.addControl(i.contorl, new FormControl());
    }
  }

}
