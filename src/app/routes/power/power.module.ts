import { NgModule } from '@angular/core';
import { ManageComponent } from './manage/manage.component';
import {SharedModule} from '../../shared/shared.module';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from '../../service/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'query', pathMatch: 'full', canActivate: [AuthGuardService]},
  {path: 'manage', component: ManageComponent, canActivate: [AuthGuardService]}
];
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManageComponent],
  exports: [RouterModule]
})
export class PowerModule { }
