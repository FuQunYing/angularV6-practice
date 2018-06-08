import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {Routes, RouterModule} from '@angular/router';
import { ActivateComponent } from './activate/activate.component';
import { ActivateProductComponent } from './activate-product/activate-product.component';
import { BindComponent } from './bind/bind.component';
import { QueryComponent } from './query/query.component';
import { SpeedComponent } from './speed/speed.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {DefaultInterceptor} from '../../core/net/default.interceptor';
import {AuthGuardService} from '../../service/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'query', pathMatch: 'full', canActivate: [AuthGuardService]},
  {path: 'query', component: QueryComponent, canActivate: [AuthGuardService]},
  {path: 'activate', component: ActivateComponent, canActivate: [AuthGuardService]},
  {path: 'speed', component: SpeedComponent, canActivate: [AuthGuardService]},
  {path: 'activate_product', component: ActivateProductComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ActivateComponent,
    ActivateProductComponent,
    BindComponent,
    QueryComponent,
    SpeedComponent
  ],
  exports: [
    RouterModule
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DefaultInterceptor,
      multi: true
    }
  ]
})
export class DeviceModule { }
