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
  allChecked = false;
  selectedImei: Array<any> = [];

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
      this.imeiSearchData = res.result.data;
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

  // 全选事件
  updateAllChecked() {
    for (let i = 0; i < 30; i++) {
      this.imeiSearchData[i].checked = this.allChecked;
    }
  }
  // 单选事件(不用也行)
  updateSingleChecked(i) {
    if (i <= 30) {
      if (this.imeiSearchData.every(item => item.checked === false)) {
        this.allChecked = false;
      } else if (this.imeiSearchData.every(item => item.checked === true)) {
        this.allChecked = true;
      }
    }
  }
  // 重新获取未激活设备
  updateNotActive() {
    this.search();
  }

  // 查询snType
  getSnType() {
    this.deviceService.getSnType().then(
      res => {
        for (let i = 0; i < res.result.length; i++) {
          this.snArr.push(res.result[i].type);
        }
      }
    );
  }

  // 删除未激活应用
  delUnActive() {
    const imei = [];
    for (let i = 0; i < this.imeiSearchData.length; i++) {
      if (this.imeiSearchData[i].checked) {
        imei.push(this.imeiSearchData[i].imei + '');
      }
    }
    if (imei) {
      console.log(imei);
      this.deviceService.delUnActive(imei).subscribe( res => {
        if (res.rcode === 0) {
          this.msg.create('success', '删除成功');
          this.search();
        } else {
          this.msg.create('error', '删除失败');
        }
      });
    } else {
      this.msg.create('warning', '当前未选择任何设备');
    }
  }
  // 查询snType
  getSnTypes() {
    this.deviceService.getSnType().then(
      res => {
        for (let i = 0; i < res.result.length; i++) {
          this.snArr.push( res.result[i].type);
        }
        console.log(this.snArr);
      }
    );
  }
  // 批量激活
  allActivate() {
    for (let i = 0; i < this.imeiSearchData.length; i ++) {
      // 根据双向数据绑定，当输入完成的时候，可以更新数组中的sn和type，传入activate挨个激活，所以遍历数组，sn有值的话就去调用激活事件
      if (this.imeiSearchData[i].sn) {
        this.activate(this.imeiSearchData[i].imei, this.imeiSearchData[i].sn, this.imeiSearchData[i].type, i);
      }
    }
  }
  // 设备激活（更新）事件
  activate(imei, sn, type, i) {
    const body = {
      'sn': 'sn' + '',
      'imei': imei + '',
      'type': type
    };
    this.deviceService.activate(body).then(
      res => {
        if (!this.isUpdate) {
          if (res.result === type ) {
            this.msg.create('success', '激活成功');
            this.imeiSearchData[i].isActive = true;
            // this.search(); // 如果不执行一次查询，拿不到新的状态，但是算上每次调用激活，如果每页最多30条数据，就要发起60次请求
            // 如果不执行查询，就直接手动更改数据里面activate的值为0
            this.imeiSearchData[i].activate = 0;
          } else {
            this.msg.create('error', '激活失败，' + res.result);
          }
        } else {
          if (res.result === type) {
            this.msg.create('succes', '更新成功');
            this.imeiSearchData[i].isActive = true;
            this.search();
          } else {
            this.msg.create('error', '更新失败，' + res.result);
          }
        }
      }
    );
  }

  // TODO:滚动用
  scroll() {
    function getScrollTop() {
      let scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      return scrollTop;
    }
    window.onscroll = () => {
      if (getScrollTop() > 100) {
        this.isFixed = 'fixed ant-btn ant-btn-primay ant-btn-lg';
      } else {
        this.isFixed = 'nofixed ant-btn ant-btn-primary ant-btn-lg';
      }
    };
  }
  ngOnInit() {
    this.validateForm = this.fb.group({});
    for (const i of this.controlArray) {
      this.validateForm.addControl(i.control, new FormControl());
      // this.search();
      this.getSnType();
      // this.scroll();
    }
  }

}
