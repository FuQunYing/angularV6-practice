import { NgModule } from '@angular/core';
import {LayoutComponent} from './layout.component';
import {SharedModule} from '../shared/shared.module';
import {HeaderComponent} from './header/header.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {HeaderNotifyComponent} from './header/componext/notify.component';
import {HeaderUserComponent} from './header/componext/user.component';

const HEADERCOMPONENTS = [
  HeaderNotifyComponent,
  HeaderUserComponent
];

const COMPONENTS = [
  LayoutComponent,
  HeaderComponent,
  SidenavComponent
];

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [],
  declarations: [
    ...HEADERCOMPONENTS,
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})

export class LayoutModule {
}
