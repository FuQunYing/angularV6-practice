import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MaintainService } from '../../../service/service.module';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-edit-goods',
  templateUrl: './edit-goods.component.html',
  styleUrls: ['./edit-goods.component.scss']
})
export class EditGoodsComponent implements OnInit {

  validateForm: FormGroup;
  // 双向绑定的数据
  goods_name: any;
  goods_price: any;
  description: any;
  status: any;
  goods_type: any;
  duration: any;
  // 公有图片数据获取
  imageData: any;
  // 分页用到的
  oldIndex: any;
  // 展示图片
  imageShow: Boolean;
  // 提交加载提示
  isLoadingOne: Boolean;
  index: any;
  controlArray = [
    { name: '货物名称', contorl: 'goods_name', target: '' },
    { name: '货物价格', contorl: 'goods_price', target: 0 },
    { name: '货物描述', contorl: 'description', target: '' },
    { name: '货物规格', contorl: 'spec', target: '' },
    { name: '货物图片', contorl: 'img', target: '' }
  ];

  constructor(
    private modelRef: NzModalRef,
    private fb: FormBuilder,
    private mainTainService: MaintainService,
    private el: ElementRef,
    private _message: NzMessageService
  ) {
  }

  _mode: string;
  _data: any;
  total: any;
  loadingFlag: Boolean;
  pagination: Boolean;
  // 选取的图片
  selectData: any;

  @Input()
  set model(value: string) {
    this._mode = value;
  }

  set inputData(value: string) {
    this._data = value;
  }
  // 点击分页检测
  changeIndex() {
    // 点击了分页栏
    console.log(this.index);
    // 判断是否点击了页码
    if (this.index !== this.oldIndex) {
      // 隐藏样式
      this.imageShow = false;
      this.loadingFlag = true;
      this.oldIndex = this.index;
      const postData = {
        'pageNum': this.index,
        'pageSize': 6
      };
      // 获取数据
      this.mainTainService.getImg(postData).then(res => {
        this.imageData = res;
        this.imageData = this.imageData.result.data;
        this.imageShow = true;
        this.loadingFlag = false;
      });
    }
  }
  // 保存数据
  emitDataOutside() {
    this.isLoadingOne = true;
    const postData = this.validateForm.value;

    // postData.img = this.selectData;
    postData.goods_price = postData.goods_price * 100;
    postData.goods_type = this.goods_type;
    // 判断数据输入是否正确
    if (this.goods_type === 1) {
      postData.duration = 0;
    } else {
      postData.duration = this.duration;
    }

    if (postData.goods_price === NaN) {
      this._message.create('error', '请填写正确价格');
      this.isLoadingOne = false;
      return;
    }

    if (!postData.img) {
      this._message.create('error', '请选择图片');
      this.isLoadingOne = false;
      return;
    }

    if (postData.spec === '') {
      this._message.create('error', '请添加规格');
      this.isLoadingOne = false;
      return;
    }

    if (postData.goods_name === '') {
      this._message.create('error', '名字不能为空');
      this.isLoadingOne = false;
      return;
    }

    if (postData.description === '') {
      this._message.create('error', '描述不能为空');
      this.isLoadingOne = false;
      return;
    }
    // 提交添加数据
    if (this._mode === 'add') {
      this.mainTainService.addGoods(postData).then(res => {
        console.log(res);
        if (res.rcode === 0) {
          this._message.create('success', '添加成功');
          this.isLoadingOne = false;
          /*this.subject.next(0);
          this.subject.destroy('onCancel');*/
        } else {
          this._message.create('error', '添加失败');
          this.isLoadingOne = false;
        }
      });
    }
    // 提交修改数据
    if (this._mode === 'edit') {
      postData.goods_id = this._data.goods_id;
      console.log(postData, '提交数据');
      this.mainTainService.editGoods(postData).then(
        res => {
          if (res.rcode === 0) {
            this._message.create('success', '修改成功');
            /*this.subject.next(0);
            this.subject.destroy('onCancel');*/
          } else {
            this._message.create('error', '修改失败');
          }
          this.isLoadingOne = false;
        }
      );
    }
  }
  // 点击取消
  handleCancel(e) {
    // this.subject.destroy('onCancel');
  }

  // 删除商品
  // delete() {
  //   console.log('删除公有商品');
  //   const postData = {
  //     goods_id: this._data.goods_id
  //   };
  //   this.mainTainService.delete(postData).then(res => {
  //     if (res.rcode === 0) {
  //       this._message.create('success', '删除成功');
  //       this.subject.next(0);
  //       this.subject.destroy('onCancel');
  //     } else {
  //       this._message.create('error', '删除失败');
  //     }
  //   });
  // }

  // 选择图片
  selectImg(e, select) {
    const img = this.el.nativeElement.querySelectorAll('img');
    for (let i = 0; i < img.length; i++) {
      img[i].style.border = 'none';
    }
    e.target.style.border = '1px solid #7DA8D2';
    e.target.style.borderRadius = '3%';
    this.selectData = select.url;
    this.controlArray[4].target = select.url;
  }

  ngOnInit() {
    this.goods_type = 1;
    // 初始化图片展示区域
    this.imageShow = false;
    this.loadingFlag = true;
    this.pagination = false;
    // 初始化开始页
    this.oldIndex = 1;
    // 提交初始化请求数据
    const postData = {
      'pageNum': 1,
      'pageSize': 6,
      'step': 'start'
    };
    // 初始化加载
    this.isLoadingOne = false;
    // 获取第一页的图片
    this.mainTainService.getImg(postData).then(res => {
      // 加载标识
      this.loadingFlag = false;
      // 数据处理
      this.imageData = res;
      this.imageData = this.imageData.result.data;
      // 分页处理
      this.total = res;
      this.total = this.total.result.count;
      // 展示图片分页栏和图片展示区域
      this.imageShow = true;
      this.pagination = true;
    });
    // 创建表单
    this.validateForm = this.fb.group({});
    for (const i of this.controlArray) {
      this.validateForm.addControl(i.contorl, new FormControl());
    }
    // 判断当前是什么模式
    if (this._mode === 'edit') {
      // 自动填写
      this.controlArray[0].target = this._data.goods_name;
      this.controlArray[1].target = this._data.goods_price / 100;
      this.controlArray[2].target = this._data.description;
      this.controlArray[3].target = this._data.spec;
      this.controlArray[4].target = this._data.img;
    }
  }
}


