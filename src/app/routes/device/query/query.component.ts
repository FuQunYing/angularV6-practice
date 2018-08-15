import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, ValidationErrors} from '@angular/forms';
import {DeviceService} from '../../../service/device.service';
import { NzMessageService, NzModalService} from 'ng-zorro-antd';



@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  providers: [DeviceService],
})

export class QueryComponent implements OnInit {


  constructor(private fb: FormBuilder,
              private deviceService: DeviceService,
              private msg: NzMessageService,
              private modal: NzModalService) { }
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
  validateForm1: FormGroup;
  controlArray = [
    {name: 'SN', control: 'sn'},
    {name: 'IMEI', control: 'imei'},
    {name: 'MCODE', control: 'mcode'},
    {name: 'CCID', control: 'ccid'}
  ];
  // 保存设备类型
  typeArr: Array<any> = [];
  upmcode: String;
  upsn: String;
  upimei: String;
  upccid: String;
  upstatus: String;
  uptype: String;
  acttime: String;
  updateModal = false;
  deviceUpdateArray = [
    { name: 'MCODE', ctl: 'updatemcode', type: 'minput', required: false, value: this.upmcode },
    { name: 'SN', ctl: 'updatesn', type: 'sinput', required: true, value: this.upsn },
    { name: 'IMEI', ctl: 'updateimei', type: 'iinput', required: true, value: this.upimei },
    { name: 'CCID', ctl: 'updateccid', type: 'cinput', required: true, value: this.upccid },
    { name: '激活状态', ctl: 'updatestatus', type: 'sselect', required: true, value: this.upstatus },
    { name: '设备类型', ctl: 'updatetype', type: 'tselect', required: true, value: this.uptype },
    { name: '激活时间', ctl: 'activetime', type: 'tinput', required: false , value: this.acttime},
  ];
  isSimShow = false;
  simData: any = {
    'iccid': '',
    'msisdn': '',
    'pkgName': '',
    'usedFlow': '',
    'userStatus': ''
  };
  simDataLoad: Boolean;
  isSimUpdateShow = false;
  updateLoad: Boolean;
  curCcid: any;
  curStatus: any;
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
    this.validateForm1 = this.fb.group({
      updatesn: [null, [Validators.required]],
      updateimei: [null, [Validators.required]],
      updatemcode: [null],
      updateccid: [null, [Validators.required]],
      updatestatus: [null, [Validators.required]],
      updatetype: [null, [Validators.required]],
      activetime: [null]
    });
    this.getSnTypes();
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

  // sim卡信息查询
  getSim(ccid) {
    this.isSimShow = true;
    this.simDataLoad = true;
    this.deviceService.getSimCard(ccid).subscribe( res => {
      // console.log(res);
      if (res.rcode === 0) {
        this.simDataLoad = false;
        this.simData = res.result;
        this.curStatus = res.result.userStatus;
      }
    });
  }

  // sim卡状态更新
  updateSim() {
    this.updateLoad = true;
    this.deviceService.updateSimCard(this.curCcid, Number(this.curStatus)).subscribe( res => {
      // console.log(res);
      if (res.rcode === 0) {
        this.updateLoad = false;
        this.msg.create('success', '卡状态已更改');
        this.isSimUpdateShow = false;
        this.getSim(this.curCcid);
      }
    });
  }
  handleClose() {
    this.isSimShow = false;
  }
  handleCancel() {
    this.isSimUpdateShow = false;
  }
  openUpdate(ccid) {
    this.isSimShow = false;
    this.isSimUpdateShow = true;
    this.curCcid = ccid;
    // console.log(this.curCcid, this.curStatus);
  }

  // device update 更新设备信息
  updateDevice(mcode, sn, imei, ccid, activate, type, time) {
    // this.validateForm1.reset();
    this.validateForm1.value.updatemcode = mcode ? mcode : '';
    this.validateForm1.value.updatesn = sn ? sn : '';
    this.validateForm1.value.updateimei = imei ? imei : '';
    this.validateForm1.value.updateccid = ccid ? ccid : '';
    this.validateForm1.value.updatestatus = activate ? activate : 0;
    this.validateForm1.value.updatetype = type ? type : this.typeArr[0] ;
    this.validateForm1.value.activetime = time ? time : '';
    this.upmcode = mcode;
    this.upsn = sn;
    this.upimei = imei;
    this.upccid = ccid;
    this.upstatus = activate;
    this.uptype = type;
    this.acttime = time;
    // console.log(this.validateForm1.value);
    this.updateModal = true;
  }
  confirmUpdate() {
    this.updateModal = false;
    // console.log(this.validateForm1.value);
    const body = {
      'mcode': this.upmcode,
      'updateInfo': {
        'sn': this.validateForm1.value.updatesn + '',
        'imei': this.validateForm1.value.updateimei + '',
        'ccid': this.validateForm1.value.updateccid + '',
        'activate': this.validateForm1.value.updatestatus,
        'type': this.validateForm1.value.updatetype,
        'activate_time': this.validateForm1.value.activetime
      }
    };
    // console.log(body);
    this.modal.confirm({
      nzTitle: '确认更新当前设备信息吗？',
      nzOnOk: () => {
        this.deviceService.updateDevice(body).subscribe( res => {
          console.log(res);
          if (res.rcode === 0) {
            this.msg.create('success', '更新成功');
            this._query();
          }
        });
      },
      nzOnCancel: () => {
        this.msg.create('info',  '取消更新');
        this.updateModal = false;
      }
    });
  }
  updateClose() {
    this.msg.create('info', '取消更新');
    this.updateModal = false;
  }

  // 查询snType
  getSnTypes() {
    this.deviceService.getSnType().then(
      res => {
        for (let i = 0; i < res.result.length; i++) {
          this.typeArr.push( res.result[i].type);
        }
      }
    );
  }
  submitForm(): void {
    for (const i in this.validateForm1.controls) {
      if (this.validateForm1.controls[i]) {
        this.validateForm1.controls[i].markAsDirty();
        this.validateForm1.controls[i].updateValueAndValidity();
      }
    }
  }
}
