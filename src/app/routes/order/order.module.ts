import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import { ComplainComponent } from './complain/complain.component';
import { QueryComponent } from './query/query.component';
import {AuthGuardService} from '../../service/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'query', pathMatch: 'full', canActivate: [AuthGuardService]},
  {path: 'query', component: QueryComponent, canActivate: [AuthGuardService]},
  {path: 'complain', component: ComplainComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ComplainComponent,
    QueryComponent
  ],
  exports: [
    RouterModule
  ]
})
export class OrderModule { }
