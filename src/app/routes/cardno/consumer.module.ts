import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {Routes, RouterModule} from '@angular/router';
import {QueryComponent} from '../order/query/query.component';
import {RechargeComponent} from './recharge/recharge.component';
import {AuthGuardService} from '../../service/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'query', pathMatch: 'full', canActivate: [AuthGuardService]},
  {path: 'query', component: QueryComponent, canActivate: [AuthGuardService]},
  {path: 'recharge', component: RechargeComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    QueryComponent,
    RechargeComponent
  ],
  exports: [
    RouterModule
  ]
})

export class ConsumerModule {}
