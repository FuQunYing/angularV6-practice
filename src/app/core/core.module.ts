import { NgModule, Optional, SkipSelf } from '@angular/core';
import {ServiceModule} from '../service/service.module';

@NgModule({
  imports: [
    ServiceModule.forRoot()
  ],
  providers: [
    {
      provide: 'BASE_CONFIG',
      useValue: {
        uri: 'api'
      }
    }
  ],
  declarations: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule已经装载，请仅在AppModule中引入该模块');
    }
  }
}
