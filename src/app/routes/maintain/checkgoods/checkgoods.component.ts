import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../../service/device.service';
import { MaintainService } from '../../../service/maintain.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-checkgoods',
  templateUrl: './checkgoods.component.html',
  styleUrls: ['./checkgoods.component.scss'],
  providers: [MaintainService]
})
export class CheckgoodsComponent implements OnInit {
  // 数据展示
  public showBoxFlag: Boolean;
  // 加载显示
  public loadingFlag: Boolean;
  // 测试数据
  public checkGoodsData: any;
  // 弹窗显示
  public isVisible: Boolean;
  // 选择编辑数据
  public editData: any;
  // 加载提示
  public buttonLoading: Boolean;
  // 存储操作index
  public index: number;
  // 总页数
  public total: number;
  // 当前页码
  public pageIndex: any;
  // 旧的标码
  public oldIndex: any;
  // 展示分页
  public showSearchFlag: any;

  name = '商品审核';
  // 控制全选
  allChecked = false;
  indeterminate = true;
  // 被选中的商品的userid和goodsid
  checkedGoods: any = [];
  showDuration = false;

  constructor(private mainTainService: MaintainService, private fb: FormBuilder, private _message: NzMessageService) {
  }

  validateForm: FormGroup;
  /**
   * 执行查询动作
   * @private
   */
  _query() {
  }
  // 审核通过
  passReview(body, index) {
    console.log(body, index);
    const postData = {
      'userid': body.userid,
      'goods_id': body.goods_id
    };
    this.mainTainService.passReview(postData).then(res => {
      // 审核通过
      if (res.rcode === 0) {
        console.log(res);
        this.checkGoodsData[index].review_status = 2;
      }
    });
  }
  // 审核不通过
  notPassReview(body, index) {
    console.log(body, index);
    const postData = {
      'userid': body.userid,
      'goods_id': body.goods_id
    };
    this.mainTainService.notPassReview(postData).then(res => {
      // 审核通过
      if (res.rcode === 0) {
        console.log(res);
        this.checkGoodsData[index].review_status = 3;
      }
    });
  }

  ngOnInit() {
    this.pageIndex = 1;
    this.oldIndex = 1;
    this.showBoxFlag = false;
    this.loadingFlag = true;
    this.isVisible = false;
    this.buttonLoading = false;
    this.showSearchFlag = false;
    const body = {
      'pageNum': 1,
      'pageSize': 10,
      'step': 'start'
    };
    this.mainTainService.getCheckgoods(body).then(res => {
      console.log(res);
      this.showBoxFlag = true;
      this.showSearchFlag = true;
      this.checkGoodsData = res.result.data;
      // 为数据添加checked字段，控制全选
      for (let i = 0; i < this.checkGoodsData.length; i++) {
        this.checkGoodsData[i].checked = false;
      }
      this.total = res.result.count;
      // this.total = Math.ceil(this.total / 10);
      // 关闭加载显示
      this.loadingFlag = false;
    });
    this.validateForm = this.fb.group({
      goods_name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      goods_type: [0, [Validators.required]],
      spec: ['', [Validators.required]],
      duration: [0, [Validators.required]]
    });
  }
  // 监控全选
  updateAllChecked() {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkGoodsData.forEach((item) => {
          item.checked = true;
        }
      );
    } else {
      this.checkGoodsData.forEach(item => item.checked = false);
    }
  }

  // 监控单个选择
  updateSingleChecked() {
    if (this.checkGoodsData.every(item => item.checked === false)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkGoodsData.every(item => item.checked === true)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }
  // 一键审核通过/不通过
  handleAllGoods(key) {
    this.checkGoodsData.forEach((item) => {
      if (item.checked) {
        this.checkedGoods.push({'userid': item.userid, 'goods_id': item.goods_id});
        console.log(this.checkedGoods);
      }
    });
    if ( this.checkedGoods.length > 0) {
      if (key) {
        this.mainTainService.passReviewMore(this.checkedGoods)
          .then( res => {
            console.log(res);
            if (res.result === this.checkedGoods.length ) {
              this._message.create('success', '操作成功');
              // 遍历操作成功的goods_id，与商品数组相同的，就改变状态
              for (let j = 0; j < this.checkedGoods.length; j++) {
                for (let i = 0; i < this.checkGoodsData.length; i++) {
                  // console.log(this.checkedGoods[j]);
                  if (this.checkGoodsData[i].goods_id === this.checkedGoods[j].goods_id) {
                    this.checkGoodsData[i].review_status = 2;
                    this.checkGoodsData[i].checked = false;
                    this.allChecked = false;
                  }
                }
              }
              this.checkedGoods = []; // 操作成功之后清空数组，避免叠加
            } else {
              this._message.create('error', '操作失败');
              this.checkedGoods = [];
            }
          });
      } else {
        this.mainTainService.notPassReviewMore(this.checkedGoods)
          .then( resp => {
            console.log(resp);
            if (resp.result === this.checkedGoods.length ) {
              this._message.create('success', '操作成功');
              // 遍历操作成功的goods_id，与商品数组相同的，就改变状态
              for (let j = 0; j < this.checkedGoods.length; j++) {
                for (let i = 0; i < this.checkGoodsData.length; i++) {
                  if (this.checkGoodsData[i].goods_id === this.checkedGoods[j].goods_id) {
                    this.checkGoodsData[i].review_status = 3;
                    this.checkGoodsData[i].checked = false;
                    this.allChecked = false;
                  }
                }
              }
              this.checkedGoods = [];
            } else {
              this._message.create('error', '操作失败');
              this.checkedGoods = [];
            }
          });
      }
    } else {
      this._message.create('warning', '请先勾选商品');
    }
  }
  //  点击页面跳转
  clickIndex() {
    // 点击了分页栏
    if (this.pageIndex !== this.oldIndex) {
      this.oldIndex = this.pageIndex;
      console.log(this.pageIndex);
      this.showBoxFlag = false;
      this.loadingFlag = true;
      this.isVisible = false;
      this.buttonLoading = false;
      this.showSearchFlag = false;
      const body = {
        'pageNum': this.pageIndex,
        'pageSize': 10,
        'step': 'start'
      };
      this.mainTainService.getCheckgoods(body).then(res => {
        console.log(res);
        this.showBoxFlag = true;
        this.showSearchFlag = true;
        this.checkGoodsData = res.result.data;
        this.total = res.result.count;
        // 关闭加载显示
        this.loadingFlag = false;
      });
    }
  }

  // 编辑弹窗
  showModal = (data, idx) => {
    // 存储选择编辑货物数据
    this.editData = data;
    this.isVisible = true;
    this.index = idx;
    if (this.checkGoodsData[idx].duration !== 0) {
      this.showDuration = true;
    }
    // 创建表单
    this.validateForm = this.fb.group({
      goods_name: [data.goods_name, [Validators.required]],
      description: [data.description, [Validators.required]],
      goods_type: [data.goods_type, [Validators.required]],
      spec: [data.spec, [Validators.required]],
      duration: [data.duration, [Validators.required]]
    });
  }
  // 编辑完成
  handleOk = (e) => {
    // 开始加载倒计时
    const timer = setTimeout(() => {
      this.loadingFlag = false;
      alert('加载超时');
    }, 7000);
    this.buttonLoading = true;
    const body = {
      'goods_id': this.editData.goods_id,
      'goods_type': this.validateForm.value.goods_type,
      'goods_name': this.validateForm.value.goods_name,
      'duration': this.validateForm.value.duration,
      'description': this.validateForm.value.description,
      'img': this.editData.img,
      'spec': this.validateForm.value.spec
    };
    console.log(body);
    this.mainTainService.editGoods(body).then(
      response => {
        console.log(response);
        if (response.rcode === 0) {
          this._message.create('success', '修改成功,并通过审核');
          // 关闭加载显示
          this.buttonLoading = false;
          // 关闭倒计时
          clearTimeout(timer);
          // 显示已审核
          this.checkGoodsData[this.index].review_status = 2;
        } else {
          this._message.create('error', '修改失败');
        }
        this.isVisible = false;
      }
    );
  }
  // 取消编辑
  handleCancel = (e) => {
    console.log(e);
    this.isVisible = false;
  }

}
