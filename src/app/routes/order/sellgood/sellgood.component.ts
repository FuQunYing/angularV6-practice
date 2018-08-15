import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { OrderService} from '../../../service/order.service';
import * as dateFns from 'date-fns';

@Component({
  selector: 'app-sellgood',
  templateUrl: './sellgood.component.html',
  styleUrls: ['./sellgood.component.scss'],
  providers: [OrderService]
})
export class SellgoodComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private orderService: OrderService) { }

  validateForm: FormGroup;
  condition: any;
  name: String = '商品销量查询';
  controlArr = [
    {name: '开始时间', ctl: 'stime', type: 'time', value: dateFns.format(new Date(), 'YYYY-MM-DD 00:00:00')},
    {name: '结束时间', ctl: 'etime', type: 'time', value: dateFns.format(new Date(), 'YYYY-MM-DD 23:59:59')},
    {name: 'SN', ctl: 'sn', type: 'input', value: ''},
    {name: '客户端', ctl: 'client', type: 'select', value: ''},
    {name: '消费者卡号', ctl: 'cardno', type: 'input', value: ''},
    {name: '交易者单号', ctl: 'ordernum', type: 'input', value: ''},
    {name: '订单号', ctl: 'no3', type: 'input', value: ''},
    {name: '订单状态', ctl: 'status', type: 'select', value: ''},
    {name: '交易金额', ctl: 'money', type: 'range', value: '', min: '', max: ''}
  ];
  orderStatus = [
    {value: 0, label: '已支付'},
    {value: 1, label: '已完成'},
    {value: 2, label: '已完成（已找零）'},
    {value: 3, label: '已退款'}
  ];
  _current = 1;
  _pageSize = 10;
  _total = 0;
  _dataSet = [];
  _analysis = {
    weixin: {
      income: 0,
      sales: 0
    },
    alipay: {
      income: 0,
      sales: 0
    }
  };
  _loading = false;
  d3pay: any;
  canRefund = false;
  accountList = [];

  // 时间快速选择
  selectTime(type) {
    switch (type) {
      case 'empty': {
        this.validateForm.get('stime').setValue('');
        this.validateForm.get('etime').setValue('');
        break;
      }
      case 'today': {
        this.validateForm.get('stime').setValue(dateFns.format(new Date(), 'YYYY-MM-DD 00:00:00'));
        this.validateForm.get('etime').setValue(dateFns.format(new Date(), 'YYYY-MM-DD 23:59:59'));
        break;
      }
      case 'yestoday': {
        this.validateForm.get('stime').setValue(dateFns.startOfYesterday());
        this.validateForm.get('etime').setValue(dateFns.endOfYesterday());
        break;
      }
      case 'last7': {
        this.validateForm.get('stime').setValue(dateFns.format(dateFns.subDays(new Date(), 6), 'YYYY-MM-DD 00:00:00'));
        this.validateForm.get('etime').setValue(dateFns.format(new Date(), 'YYYY-MM-DD 23:59:59'));
        break;
      }
      case 'thismonth': {
        this.validateForm.get('stime').setValue(dateFns.format(dateFns.startOfMonth(new Date()), 'YYYY-MM-DD 00:00:00'));
        this.validateForm.get('etime').setValue(dateFns.format(dateFns.endOfMonth(new Date()), 'YYYY-MM-DD 23:59:59'));
        break;
      }
      case 'lastmonth': {
        this.validateForm.get('stime')
          .setValue(dateFns.format(dateFns.startOfMonth(dateFns.subMonths(new Date() , 1)), 'YYYY-MM-DD 00:00:00'));
        this.validateForm.get('etime')
          .setValue(dateFns.format(dateFns.endOfMonth(dateFns.subMonths(new Date(), 1)), 'YYYY-MM-DD 23:59:59'));
        break;
      }
      default: {
        this.validateForm.get('stime').setValue('');
        this.validateForm.get('etime').setValue('');
        break;
      }
    }
  }

  refreshData(reset: boolean = false) {
    if (reset) {
      this._current = 1;
    }
    this._loading = true;
    this.orderService.getYhdOrder(this._current, this._pageSize, this.condition).then(res => {
      if (res.rcode === 0) {
        this._loading = false;
        if (res.result.order_count) {
          this._total = res.result.order_count;
        }
        this._dataSet = res.result.data;
        console.log(this._dataSet);
        for ( let i = 0; i < this._dataSet.length; i++) {
          this._dataSet[i].product_info = JSON.parse(this._dataSet[i].product_info);
          if (this._dataSet[i].client === 1) {
            this._dataSet[i].client = 'weixin';
          }
          if (this._dataSet[i].client === 2) {
            this._dataSet[i].client = 'alipay';
          }
        }
        if (reset) {
          if ( res.result.analysis.alipay && res.result.analysis.weixin) {
            this._analysis = res.result.analysis;
          }
          if ( JSON.stringify(res.result.analysis) === '{}') {
            this._analysis = {
              weixin: {
                income: 0,
                sales: 0
              },
              alipay: {
                income: 0,
                sales: 0
              }
            };
          }
          if ( res.result.analysis.weixin  && !res.result.analysis.alipay) {
            this._analysis.weixin = res.result.analysis.weixin;
            this._analysis.alipay.income = 0;
            this._analysis.alipay.sales = 0;
          }
          if ( !res.result.analysis.weixin  && res.result.analysis.alipay) {
            this._analysis.alipay = res.result.analysis.alipay;
            this._analysis.weixin.income = 0;
            this._analysis.weixin.sales = 0;
          }
        }
        console.log(this._analysis);
      }
    });
  }

  // 搜索
  search() {
    this.condition = this.validateForm.value;
    this.condition.stime = this.condition.stime ? dateFns.format(this.condition.stime, 'YYYY-MM-DD HH:mm:ss') :
      dateFns.format(new Date(), 'YYYY-MM-DD 00:00:00');
    this.condition.etime = this.condition.etime ? dateFns.format(this.condition.etime, 'YYYY-MM-DD HH:mm:ss') :
      dateFns.format(new Date(), 'YYYY-MM-DD 23:59:59');
    console.log(this.condition);
    this.refreshData(true);
  }
  // 清空
  resetForm() {
    this.validateForm.reset();
  }

  // 订单状态说明
  statusDetail(status) {
    switch (status) {
      case 0:
        return '货款到账';
      case 1:
        return '货款到账，及正常出货';
      case 2:
        return '货款到账，沒掉货，款退到会员卡内';
      case 3:
        return '从会员卡内把款退到客户的支付账号内';
      default:
        return;
    }
  }

  ngOnInit() {
    console.log(this.controlArr);
    this.validateForm = this.fb.group({});
    for (const i of this.controlArr) {
      this.validateForm.addControl(i.ctl, new FormControl(i.value));
    }
    this.validateForm.addControl('moneyMin', new FormControl());
    this.validateForm.addControl('moneyMax', new FormControl());
    this.condition = this.validateForm.value;
    // this.refreshData(true);
  }

}
