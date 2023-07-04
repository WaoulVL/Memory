import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-counts',
  templateUrl: './game-counts.component.html',
  styleUrls: ['./game-counts.component.css']
})
export class GameCountsComponent {
  @Input() gameCount: any;
  showGameCount = false;

  toggleGameCount() {
    this.showGameCount = !this.showGameCount;
  }
}
