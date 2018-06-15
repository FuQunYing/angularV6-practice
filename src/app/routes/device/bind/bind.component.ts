import { Component, OnInit, ElementRef } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DeviceService} from '../../../service/device.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-bind',
  templateUrl: './bind.component.html',
  styleUrls: ['./bind.component.scss'],
  providers: [DeviceService]
})
export class BindComponent implements OnInit {

  constructor(private deviceService: DeviceService,
              private fb: FormBuilder,
              private elementRef: ElementRef,
              private message: NzMessageService) { }
  name = '设备绑定';
  validateForm: FormGroup;
  public res: any; // 保存请求数据
  inputValue: any; // 输入值
  band_dev_count: number[]; // 控制数组遍历
  row: {sn: string, imei: string} []; // 用于存储要绑定的信息
  state: {}[]; // 用于存储绑定状态
  lengthArr: {snLength: number, imeiLength: number} []; // 检测sn和imei号输入长度是否正确

  /**
   * 重置表单
   */
  resetForm () {
    this.validateForm.reset();
  }

  /**
   * 查询
   */
  _query() {
    console.log(this.row);
    const sn = this.elementRef.nativeElement.querySelectorAll('.sn');
    const imei = this.elementRef.nativeElement.querySelectorAll('.imei');
    for (let i = 0; i < this.band_dev_count.length; i++) {
      console.log(sn[i].value, imei[i].value);
      if (sn[i].value !== '' && imei[i].value !== '') {
        this.row[i].sn = sn[i].value;
        this.row[i].imei = imei[i].value;
      }
    }
    console.log(this.row);
    this.deviceService.deviceBind(this.row).then( res => {
      console.log(res);
      this.res = res.data;
      for (const key in this.res.result) {
        if (this.res.result) {
          this.state[key]['bindResult'] = this.res.result[key]['bindResult'];
          console.log(this.state);
          if (this.res.result[key].bindResult === 1) {
            this.message.create('success', '绑定成功');
          } else if (this.res.result[key].bindResult === 2) {
            this.message.create('info', '设备已存在');
          }
        }
      }
    });
  }

  /**
   * sn 和 imei 失去焦点判断
   */
  snBlur (index) {
    const sn = this.elementRef.nativeElement.querySelectorAll('.sn');
    console.log(sn);
    const target = sn[index].value;
    if (target.legnth !== 13) {
      console.log('sn长度有误');
      this.lengthArr[index].snLength = -1;
    } else {
      this.lengthArr[index].snLength = 0;
    }
  }

  imeiBlur(index) {
    const imei = this.elementRef.nativeElement.querySelectorAll('.imei');
    console.log(imei);
    const target = imei[index].value;
    if (target.length !== 15) {
      console.log('imei长度有误');
      this.lengthArr[index].imeiLength = -1;
    } else {
      this.lengthArr[index].imeiLength = 0;
    }
  }

  /**
   * 获取绑定数量
   */
  getDeviceNumber() {
    console.log(this.inputValue);
    if (this.inputValue <= 0) {
      alert('绑定设备数量最少为1');
      return;
    }
    // 充值所有生成的数组
    this.row = [];
    this.band_dev_count = [];
    this.lengthArr = [];
    this.state = [];
    for (let i = 0; i < this.inputValue; i++) {
      this.row.push({sn: '', imei: ''});
      this.band_dev_count.push(i);
      this.state.push({'rcode': -1});
      this.lengthArr.push({snLength: 0, imeiLength: 0});
    }
    console.log(this.band_dev_count);
    console.log(this.row);
  }
  ngOnInit() {
    this.inputValue = 10;
    this.row = [];
    this.band_dev_count = [];
    this.state = [];
    this.lengthArr = [];
    this.getDeviceNumber();
  }

}
