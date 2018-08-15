import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OrderService } from '../../../service/order.service';

@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.scss'],
  providers: [OrderService]
})
export class ComplainComponent implements OnInit {
  name = '投诉查询';
  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private orderService: OrderService) {
  }

  // 存储查询后的数据
  public orderInfoData: any;
  // 查询数据展示标识
  public showBoxFlag: Boolean;
  // 加载显示
  public loadingFlag: Boolean;

  controlArray = [
    { name: '投诉单号', contorl: 'ordernum' },
    { name: '卡号', contorl: 'cardno' },
    { name: 'DEV_MCODE', contorl: 'mcode' }
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
    // 加载显示
    this.loadingFlag = true;
    // 数据展示
    this.showBoxFlag = false;
    // 设计倒计时
    const timer = setTimeout(() => {
      this.loadingFlag = false;
      alert('加载超时');
    }, 7000);
    console.log(this.validateForm.value);
    const body = {
      'ordernum': this.validateForm.value.ordernum,
      'cardno': this.validateForm.value.cardno,
      'mcode': [this.validateForm.value.mcode]
    };
    if (this.validateForm.value.mcode == null) {
      body.mcode = [''];
    }

    console.log(body, '数据提交');
    this.orderService.getComplain(body).then(order => {
        this.orderInfoData = order.result.result.pagingData;
        console.log(this.orderInfoData);
        // 数据展示
        this.showBoxFlag = true;
        // 关闭计时器和加载显示
        clearTimeout(timer);
        this.loadingFlag = false;
      }
    );
  }

  ngOnInit() {
    // 初始化展示标识
    this.showBoxFlag = false;
    this.validateForm = this.fb.group({});
    for (const i of this.controlArray) {
      this.validateForm.addControl(i.contorl, new FormControl());
    }
  }

}
