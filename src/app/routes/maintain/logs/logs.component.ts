import {Component} from '@angular/core';

@Component({
  selector: 'app-logs',
  template: `
    <nz-card [nzBordered]="false" [nzHoverable]="true">
      <nz-tabset>
        <nz-tab *ngFor="let tab of tabs">
          <ng-template #nzTabHeading>
            {{tab.name}}
          </ng-template>
          <markdown path="{{tab.content}}"></markdown>
        </nz-tab>
      </nz-tabset>
    </nz-card>
  `
})
export class LogsComponent {
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
