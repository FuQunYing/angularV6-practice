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
    {name: 'ccid', control: 'ccid'}
  ];

  ngOnInit() {
  }

  /**
   * 重置表单
   */
  resetForm() {
    this.validateForm.reset();
  }
}
