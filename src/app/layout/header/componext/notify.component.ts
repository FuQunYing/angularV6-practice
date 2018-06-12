import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-notify',
  template: `
    <nz-badge [nzCount]="">
        <i class="anticon anticon-bell" style="color:#fff;font-size: 16px;"></i>
    </nz-badge>
  `
})
export class HeaderNotifyComponent implements OnInit {
  constructor() {}
  ngOnInit () {}
}
