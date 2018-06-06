import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {PagesModule} from './pages/pages.module';
import {RoutesRoutingModule} from './routes-routing.module';

@NgModule({
  imports: [
    SharedModule,
    RoutesRoutingModule,
    PagesModule
  ],
  declarations: []
})
export class RoutesModule { }
