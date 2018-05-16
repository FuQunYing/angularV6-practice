import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplainComponent } from './complain/complain.component';
import { QueryComponent } from './query/query.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ComplainComponent, QueryComponent]
})
export class OrderModule { }
