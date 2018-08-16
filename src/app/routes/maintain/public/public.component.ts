import {Component, OnInit, ElementRef, Input} from '@angular/core';
import { MaintainService } from '../../../service/service.module';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EditGoodsComponent } from '../edit-goods/edit-goods.component';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
  providers: [MaintainService]
})
export class PublicComponent implements OnInit {

  // 编辑或者添加商品用
  // 双向绑定的数据
  goods_id: any;
  goods_type: any;
  goods_name: any;
  goods_price: any;
  desc: any;
  spec: any;
  duration: any;
  imgUrl: any;
  // 公有图片数据获取
  imageData: any;

  // 展示图片
  imageShow: Boolean;
  // 提交加载提示
  isLoadingOne: Boolean;
  // 选取的图片
  selectData: any;
  editModal = false;

  name = '互帮云库';
  isVisible = false;
  // 用来存储总个数
  total: any;
  validateForm: FormGroup;
  oldIndex: any;
  index: any;
  loadingFlag: Boolean;
  editLoadingFlag: Boolean;
  editTitle: string;
  mode: any;


  // 刷新标志;
  reflash = false;
  // 用来存储
  public goodsData: any;

  // 控制展示
  public showFlag: Boolean;
  controlArray = [
    { name: '货物名称', contorl: 'goods_name', type: 'ninput' },
    { name: '货物价格', contorl: 'goods_price', type: 'pinput' },
    { name: '货物描述', contorl: 'desc', type: 'dinput' },
    { name: '货物规格', contorl: 'spec', type: 'sinput' },
    { name: '货物图片', contorl: 'img', type: 'img' }
  ];

  constructor(private mainTainService: MaintainService,
              private fb: FormBuilder,
              private modalService: NzModalService,
              private _message: NzMessageService,
              private el: ElementRef) { }

  currentModal;
  isConfirmLoading = false;

  ngOnInit() {
    this.init();
    // 构建表单
    this.validateForm = this.fb.group({
      goods_name: [null, [Validators.required]],
      goods_price: [null, [Validators.required]],
      desc: [null, [Validators.required]],
      spec: [null, [Validators.required]],
      img: [null, [Validators.required]]
    });
    for (const i of this.controlArray) {
      this.validateForm.addControl(i.contorl, new FormControl());
    }
  }
  init() {
    this.oldIndex = 1;
    this.index = 1;
    this.showFlag = false;
    const body = {
      'pageNum': 1,
      'pageSize': 9,
      'step': 'start'
    };
    this.loadingFlag = true;
    this.mainTainService.getGoods(body).then(res => {
      // 展示数据
      this.showFlag = true;
      this.goodsData = res.result;
      this.total = this.goodsData.count;
      this.loadingFlag = false;
    });
  }

  // 点击取消
  handleCancel() {
    this.editModal = false;
  }

  // 新增商品
  add() {
    this.showModal('add', '添加货物', '1');
  }

  // 展示编辑框
  showModal(mode, title, data) {
    console.log(data);
    this.editTitle = title;
    this.mode = mode;
    if (mode === 'edit') {
      this.validateForm.value.goods_name = data.goods_name;
      this.validateForm.value.goods_price = data.goods_price;
      this.validateForm.value.desc = data.description;
      this.validateForm.value.spec = data.spec;
      this.validateForm.value.img = data.img;
      this.goods_name = data.goods_name;
      this.goods_price = data.goods_price;
      this.desc = data.description;
      this.spec = data.spec;
      this.imgUrl = data.img;
      this.goods_id = data.goods_id;
    }
    this.editModal = true;
  }

  // 编辑完成
  confirmEdit() {
    this.editModal = false;
    let body;
    if (this.mode === 'edit') {
      body = {
        'description': this.validateForm.value.desc,
        'duration': this.duration ? this.duration : 0,
        'goods_id': this.goods_id,
        'goods_name': this.validateForm.value.goods_name,
        'goods_price': this.validateForm.value.goods_price,
        'goods_type': this.goods_type,
        'img': this.imgUrl,
        'spec': this.validateForm.value.spec
      };
    } else if (this.mode === 'add') {
      body = {
        'description': this.validateForm.value.desc,
        'duration': this.duration ? this.duration : 0,
        'goods_name': this.validateForm.value.goods_name,
        'goods_price': this.validateForm.value.goods_price,
        'goods_type': this.goods_type,
        'img': this.imgUrl,
        'spec': this.validateForm.value.spec
      };
    }
    console.log(body);
    this.modalService.confirm({
      nzTitle: '确认编辑完毕吗？',
      nzOnOk: () => {
        if (this.mode === 'add') {
          this.mainTainService.addGoods(body).then( res => {
            console.log(res);
            if ( res.rcode === 0) {
              this._message.create('success', '添加成功');
              this.init();
            } else {
              this._message.create('error', '添加失败');
            }
          });
        } else if (this.mode === 'edit') {
          this.mainTainService.editGoods(body).then( res => {
            if ( res.rcode === 0) {
              this._message.create('success', '编辑成功');
              this.init();
            } else {
              this._message.create('error', '编辑失败');
            }
          });
        }
      },
      nzOnCancel: () => {
        this._message.create('info', '已取消');
      }
    });
  }
  clickIndex() {
    // 点击了分页栏
    if (this.index !== this.oldIndex || this.reflash) {
      this.oldIndex = this.index;
      this.showFlag = false;
      const body = {
        'pageNum': this.index,
        'pageSize': 9,
        'step': 'start'
      };
      this.loadingFlag = true;
      this.mainTainService.getGoods(body).then(res => {
        // 展示数据
        this.showFlag = true;
        this.goodsData = res.result;
        this.total = this.goodsData.count;
        this.loadingFlag = false;
      });
      this.reflash = false;
    }
  }


  // 选择图片
  selectImg(e, select) {
    const img = this.el.nativeElement.querySelectorAll('img');
    for (let i = 0; i < img.length; i++) {
      img[i].style.border = 'none';
    }
    e.target.style.border = '1px solid #7DA8D2';
    e.target.style.borderRadius = '3%';
    this.selectData = select.url;
    // this.controlArray[4].target = select.url;
  }
  handleOk(e) {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.currentModal.destroy('onOk');
      this.isConfirmLoading = false;
      this.currentModal = null;
    }, 1000);
  }
}
