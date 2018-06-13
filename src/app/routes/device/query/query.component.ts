import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DeviceService} from '../../../service/device.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  providers: [DeviceService]
})
export class QueryComponent implements OnInit {

  constructor(private fb: FormBuilder, private deviceService: DeviceService) { }
  // 查询数据
  public devInfoData = [];
  // 查询结果展示标识
  public showSearchFlag: Boolean;
  // 加载显示
  public loadingFlag: Boolean;
  // 当前页码
  public index: any;
  // 旧的标码
  public oldIndex: any;
  // 总页码
  public total: any;
  // 表单加载
  public tloading: Boolean;
  name = '设备查询';
  validateForm: FormGroup;
  controlArray = [
    {name: 'SN', control: 'sn'},
    {name: 'IMEI', control: 'imei'},
    {name: 'MCODE', control: 'mcode'},
    {name: 'CCID', control: 'ccid'}
  ];

  ngOnInit() {
    this.init();
  }

  /**
   * 初始化
   */
  init () {
    this.oldIndex = 1;
    // 初始化查询结果标识
    this.showSearchFlag = false;
    // 初始化加载标识
    this.loadingFlag = false;
    // 构造表单
    this.validateForm = this.fb.group({});
    for (const i of this.controlArray) {
      this.validateForm.addControl(i.control, new FormControl());
    }
  }
  /**
   * 重置表单
   */
  resetForm() {
    this.validateForm.reset();
  }

  /**
   * 分页查询
   */
  clickIndex() {
    if (this.index !== this.oldIndex) {
      this.oldIndex = this.index;
      if (this.validateForm.value.imei === null) {
        this.validateForm.value.imei = '';
      }
      if (this.validateForm.value.mcode === null) {
        this.validateForm.value.mcode = '';
      }
      if (this.validateForm.value.sn === null) {
        this.validateForm.value.sn = '';
      }
      // 表单加载
      this.tloading = true;
      const postData = {
        'imei': this.validateForm.value.imei,
        'mcode': this.validateForm.value.mcode,
        'sn': this.validateForm.value.sn,
        'pageNum': this.index,
        'pageSize': 10
      };
      this.deviceService.DevInfo(postData).then(res => {
        console.log(res);
        this.devInfoData = res.result.data;
        this.tloading = false;
      });
    }
  }

  /**
   * 执行查询动作
   */
  _query() {
    // 显示数据第一页
    this.index = 1;
    // 关闭数据展示
    this.showSearchFlag = false;
    // 开始加载
    this.loadingFlag = true;
    // 对象处理
    const obj = this.validateForm.value;
    const postData = {};
    // 输入对象预处理
    for (const key in this.validateForm.value) {
      if (obj[key] === null || obj[key] === '') {
        continue;
      }
      if (key === 'sn' || key === 'imei') {
        postData[key] = obj[key];
      } else {
        postData[key] = obj[key];
      }
    }
    // 请求数据
    this.deviceService.DevInfo(postData).then( res => {
      console.log(res);
      this.devInfoData = res.result.data;
      // this.total = res.count;
      this.total = parseInt(res.result.count, 10);
      // 展示数据
      this.showSearchFlag = true;
      // 关闭加载显示
      this.loadingFlag = false;
    });
  }
}
