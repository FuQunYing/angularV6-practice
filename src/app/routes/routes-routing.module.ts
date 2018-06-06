import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from '../layout/layout.component';
import {environment} from '../../environments/environment';
import {LoginComponent} from './pages/login/login.component';
import {AuthGuardService} from '../service/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [AuthGuardService]},
      {path: 'device', loadChildren: './device/device.module#DeviceModule'},
      {path: 'order', loadChildren: './order/order.module#OrderModule'},
      {path: 'cardno', loadChildren: './cardno/consumer.module#ConsumerModule'},
      {path: 'maintain', loadChildren: './maintain/maintain.module#MaintainModule'},
      {path: 'power', loadChildren: './power/power.module#PowerModule'}
    ]
  },
  {path: 'login', component: LoginComponent, canActivate: [AuthGuardService]}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: environment.useHash})
  ],
  exports: [RouterModule]
})
export class RoutesRoutingModule {}
