import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { DeviceService} from '../../../service/device.service';
import { NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss'],
  providers: [DeviceService]
})
export class ActivateComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private deviceService: DeviceService,
              private el: ElementRef,
              private msg: NzMessageService) { }

  name = '生产激活';
  validateForm: FormGroup;
  imeiSearchData: any; // 存储查询imei数据
  showBoxFlag: Boolean; // 展示数据标识
  imeiForSearch: any; // 存储搜索使用的imei号
  public loadingFlag: Boolean; // 加载展示
  public cbData: any; // 返回数据
  snArr: Array<any> = []; // 保存sn types
  isUpdate: Boolean = false;
  isFixed: String = 'nofixed ant-btn ant-btn-primary ant-btn-lg';
  controlArray = [
    { name: 'IMEI', control: 'imei', placeholder: 'IMEI'},
    { name: 'SN', control: 'sn', placeholder: 'SN（只能查询已激活设备的sn号）'}
  ];

  // 重置表单
  resetForm() {
    this.validateForm.reset();
  }

  // 执行查询动作
  _query() {
    console.log(this.validateForm.value);
  }

  // 查询imei
  search() {
    this.showBoxFlag = false;
    this.loadingFlag = true;
  //  这里进行判断，imei和sn全部为null时才执行全部查询，不能直接进行null的判定，如果输入过了又删掉了拿到的值不是null
    if (!this.validateForm.value.imei && !this.validateForm.value.sn) {
      const body = {
        'imei': '',
        'pageNum': 1,
        'pageSize': 99,
        'step': 'start'
      };
      this.imeiSearch(body);
     } else if (this.validateForm.value.imei) {
    //  imei存在执行imei查询
      const body = {
        'imei': this.validateForm.value.imei,
        'pageNum': 1,
        'pageSize': 99,
        'step': 'start'
      };
      this.imeiSearch(body);
    }
  //  sn存在的时候先通过sn查询imei，再查询到设备，虽然用户只点击了一下，其实发起了两次请求
    if (this.validateForm.value.sn) {
      const snbody = {
        'imei': '',
        'mcode': '',
        'sn': this.validateForm.value.sn,
        'pageNum': 1,
        'pageSize': 30
      };
      this.deviceService.DevInfo(snbody)
        .then( res => {
          if (res.data[0].imei) {
            const sbody = {
              'imei': res.data[0].imei + '',
              'pageNum': 1,
              'pageSize': 99,
              'step': 'start'
            };
            this.imeiSearch(sbody);
          } else {
            this.msg.create('error', '查询sn出错，当前sn未激活', {nzDuration: 5000});
          }
        });
    }
  }

  imeiSearch(body) {
    this.deviceService.imeiSearch(body).then( res => {
      console.log(res);
      this.imeiSearchData = res.data;
    //  为请求回来的数据增加状态
      for (let i = 0; i < this.imeiSearchData.length; i++) {
        console.log(this.imeiSearchData[i].sn);
        if (this.imeiSearchData[i].sn === undefined || this.imeiSearchData[i].sn === null) {
          this.imeiSearchData[i].sn = '';
          this.isUpdate = false;
        } else {
          this.isUpdate = true;
        }
        if (this.imeiSearchData[i].activate === 0) {
          if (!this.imeiSearchData[i].type) {
          //  某些已激活的旧设备不会烦恼会type，显示为空
            this.imeiSearchData[i].type = '';
            this.msg.create('info', '此设备未返回当前设备类型', {nzDuration: 5000});
          }
        } else {
          if (!this.imeiSearchData[i].type) {
          //  未激活的设备没有type字段，手动添加进行双向数据绑定
            this.imeiSearchData[i].type = 'mdb';
          }
        }
        this.imeiSearchData[i].isActive = false;
      }
      console.log(this.imeiSearchData);
      this.showBoxFlag = true;
      this.loadingFlag = false;
    });
  }
  ngOnInit() {
  }

}
