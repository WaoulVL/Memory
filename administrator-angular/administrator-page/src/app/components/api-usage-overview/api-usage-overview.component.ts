import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-api-usage-overview',
  templateUrl: './api-usage-overview.component.html',
  styleUrls: ['./api-usage-overview.component.css']
})
export class ApiUsageOverviewComponent {
  @Input() aggregatedData: any;

  getChartData(): any[] {
    if (!this.aggregatedData || !this.aggregatedData[2]) {
      return [{ name: 'empty', value: 0 }];
    }

    return this.aggregatedData[2].map((item: { api: any; aantal: any; }) => {
      return {
        name: item.api,
        value: item.aantal
      };
    });
  }
}
