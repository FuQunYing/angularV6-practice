import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {Routes, RouterModule, Router} from '@angular/router';
import { CheckgoodsComponent } from './checkgoods/checkgoods.component';
import { LogsComponent } from './logs/logs.component';
import { NoticeComponent } from './notice/notice.component';
import { PublicComponent } from './public/public.component';
import {AuthGuardService} from '../../service/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'logs', pathMatch: 'full', canActivate: [AuthGuardService]},
  {path: 'notice', component: NoticeComponent, canActivate: [AuthGuardService]},
  {path: 'checkgoods', component: CheckgoodsComponent, canActivate: [AuthGuardService]},
  {path: 'logs', component: LogsComponent, canActivate: [AuthGuardService]},
  {path: 'public', component: PublicComponent, canActivate: [AuthGuardService]}
];
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CheckgoodsComponent,
    LogsComponent,
    NoticeComponent,
    PublicComponent
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [
  ]
})
export class MaintainModule { }
