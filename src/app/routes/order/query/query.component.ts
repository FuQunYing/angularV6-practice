import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {OrderService} from '../../../service/order.service';
import {NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  providers: [OrderService]
})

export class QueryComponent implements OnInit {

  // 单号查询数据
  public orderinfoData;
  // 查询数据展示标识
  public showBoxFlag: Boolean;
  // 加载显示
  public loadingFlag: Boolean;
  public index: any;
  public oldIndex: any;
  public total: any;
  public tableLoadingFlag: Boolean;
  public startDate: any;
  public endDate: any;

  constructor(private fb: FormBuilder,
              private orderService: OrderService,
              private modalService: NzModalService) {
  }

  name = '订单查询';
  validateForm: FormGroup;
  // 提交搜索数据
  public postData: any;

  controlArray = [
    {name: '单号', contorl: 'ordernum'},
    {name: '卡号', contorl: 'card_no'},
    {name: 'DEV_MCODE', contorl: 'mcode'},
    {name: 'SN', contorl: 'sn'}
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

  clickIndex() {
    // 点击了分页栏
    if (this.index !== this.oldIndex) {
      // 展示数据
      this.tableLoadingFlag = true;
      this.oldIndex = this.index;
      // 用之前搜索的数据
      const postData = {
        'pageNum': this.index,
        'pageSize': 20,
        'card_no': this.postData.card_no,
        'mcode': this.postData.mcode,
        'ordernum': this.postData.ordernum,
        'sn': this.postData.sn,
        'start_time': this.postData.start_time,
        'end_time': this.postData.end_time
      };
      // console.log(this.postData);
      this.orderService.getOrder(postData).then(order => {
        this.orderinfoData = order.result.data;
        this.total = order.result.count;
        this.total = parseInt(this.total, 10);
        // 展示数据
        this.tableLoadingFlag = false;
      });
    }
  }

  _query() {
    // 展示数据
    this.showBoxFlag = false;
    // 显示加载
    this.loadingFlag = true;
    // 设计倒计时
    this.postData = this.validateForm.value;
    // 增加分页功能
    this.postData.pageNum = 1;
    this.postData.pageSize = 20;
    // 去掉所有空格
    for (const key in this.postData) {
      if (typeof (this.postData[key]) === 'string') {
        // console.log(this.postData[key]);
        let str = '';
        str = this.postData[key];
        this.postData[key] = str.replace(/(^\s+)|(\s+$)/g, '');
      }
    }
    this.postData.sn = Number(this.postData.sn);
    this.postData.start_time = this.GMTToStr(this.validateForm.value.start_time);
    this.postData.end_time = this.GMTToStr(this.validateForm.value.end_time);
    // console.log(this.postData);
    this.orderService.getOrder(this.postData)
      .then(order => {
          this.orderinfoData = order.result.data;
          // console.log(this.orderinfoData);
          this.total = order.result.count;
          this.total = parseInt(this.total, 10);
          // 展示数据
          this.showBoxFlag = true;
          // 关闭计时器和加载显示
          this.loadingFlag = false;
        }
      );
  }
  // 点击第三方，显示第三方支付单号
  info(no3) {
    this.modalService.info({
      nzTitle: '第三方支付单号',
      nzContent: no3
    });
  }

  // 时间转化;
  GMTToStr(time) {
    if (time) {
      const date = new Date(time);
      let str = date.getFullYear() + '-';
      // 月
      if (date.getMonth() + 1 <= 9) {
        str = str + '0' + (date.getMonth() + 1) + '-';
      } else {
        str = str + (date.getMonth() + 1) + '-';
      }
      // 日
      if (date.getDate() <= 9) {
        str = str + '0' + date.getDate() + ' ';
      } else {
        str = str + date.getDate() + ' ';
      }

      // 时
      if (date.getHours() <= 9) {
        str = str + '0' + date.getHours() + ':';
      } else {
        str = str + date.getHours() + ':';
      }
      // 分
      if (date.getMinutes() <= 9) {
        str = str + '0' + date.getMinutes() + ':';
      } else {
        str = str + date.getMinutes() + ':';
      }
      // 秒
      if (date.getSeconds() <= 9) {
        str = str + '0' + date.getSeconds();
      } else {
        str = str + date.getSeconds();
      }
      return str;
    } else {
      return null;
    }
  }

  ngOnInit() {
    this.oldIndex = 1;
    this.index = 1;
    this.tableLoadingFlag = false;
    this.validateForm = this.fb.group({});
    this.showBoxFlag = false;
    for (const i of this.controlArray) {
      this.validateForm.addControl(i.contorl, new FormControl());
    }
    this.validateForm.addControl('end_time', new FormControl());
    this.validateForm.addControl('start_time', new FormControl());
  }
}
