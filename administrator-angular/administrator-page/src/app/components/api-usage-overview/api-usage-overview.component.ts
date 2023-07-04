import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-api-usage-overview',
  templateUrl: './api-usage-overview.component.html',
  styleUrls: ['./api-usage-overview.component.css']
})
export class ApiUsageOverviewComponent implements OnChanges {
  @Input() aggregatedData: any;
  chartData: any[] = [{ name: 'empty', value: 0 }];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['aggregatedData'] && changes['aggregatedData'].currentValue) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    if (!this.aggregatedData || !this.aggregatedData[2]) {
      this.chartData = [{ name: 'empty', value: 0 }];
    } else {
      this.chartData = this.aggregatedData[2].map((item: { api: any; aantal: any; }) => {
        return {
          name: item.api,
          value: item.aantal
        };
      });
    }
  }
}
