import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckgoodsComponent } from './checkgoods/checkgoods.component';
import { EditGoodsComponent } from './edit-goods/edit-goods.component';
import { LogsComponent } from './logs/logs.component';
import { NoticeComponent } from './notice/notice.component';
import { PublicComponent } from './public/public.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CheckgoodsComponent, EditGoodsComponent, LogsComponent, NoticeComponent, PublicComponent]
})
export class MaintainModule { }
