import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-notify',
  template: `
    <nz-badge [nzCount]="">
      <ng-template #content>
        <i class="anticon anticon-bell"></i>
      </ng-template>
    </nz-badge>
  `
})
export class HeaderNotifyComponenty implements OnInit {
  constructor() {}
  ngOnInit () {}
}
