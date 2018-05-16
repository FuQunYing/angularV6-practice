import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivateComponent } from './activate/activate.component';
import { ActivateProductComponent } from './activate-product/activate-product.component';
import { BindComponent } from './bind/bind.component';
import { QueryComponent } from './query/query.component';
import { SpeedComponent } from './speed/speed.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ActivateComponent, ActivateProductComponent, BindComponent, QueryComponent, SpeedComponent]
})
export class DeviceModule { }
