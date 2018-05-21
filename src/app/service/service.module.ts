import { NgModule, ModuleWithProviders } from '@angular/core';
import {AuthGuardService} from './auth-guard.service';
import {ConsumerManagementService} from './consumer-management.service';
import {CookieService} from './cookie.service';
import {DeviceService} from './device.service';
import {LoginService} from './login.service';
import {MaintainService} from './maintain.service';
import {OrderService} from './order.service';
import {PowerService} from './power.service';
import {SpeedService} from './speed.service';

export {
  AuthGuardService,
  ConsumerManagementService,
  CookieService,
  DeviceService,
  LoginService,
  MaintainService,
  OrderService,
  PowerService,
  SpeedService
};
@NgModule()
export class ServiceModule {
  static forRoot(): ModuleWithProviders {
  return {
    ngModule: ServiceModule,
    providers: [
      AuthGuardService,
      ConsumerManagementService,
      CookieService,
      DeviceService,
      LoginService,
      MaintainService,
      OrderService,
      PowerService,
      SpeedService
    ]
  };
  }
}

