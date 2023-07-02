import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-players-overview',
  templateUrl: './players-overview.component.html',
  styleUrls: ['./players-overview.component.css']
})
export class PlayersOverviewComponent {
  @Input() playerOverview: any;
}
