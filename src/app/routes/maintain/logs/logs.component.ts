import {Component} from '@angular/core';

@Component({
  selector: 'app-logs',
  template: `
    <nz-card [nzBordered]="false" [nzHoverable]="true">
      <nz-tabset>
        <nz-tab *ngFor="let tab of tabs" [nzTitle]="tab.name">
          <markdown path="{{tab.content}}"></markdown>
        </nz-tab>
      </nz-tabset>
    </nz-card>
  `
})
export class LogsComponent {
  // TODO:目前内容一样
  tabs = [
    {
      name   : 'MDB',
      content: '/assets/logs/logs.md'
    },
    {
      name   : '脉冲',
      content: '/assets/logs/logs.md'
    },
    {
      name   : '云货道',
      content: '/assets/logs/logs.md'
    },
    {
      name   : '云钩哒',
      content: '/assets/logs/logs.md'
    }
  ];
}
