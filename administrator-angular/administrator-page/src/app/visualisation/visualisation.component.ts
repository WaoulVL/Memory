import { Component } from '@angular/core';

@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['./visualisation.component.css']
})
export class VisualisationComponent {
  isLoggedIn = false;

  constructor() {
    const jwtToken = localStorage.getItem('jwtToken');
    this.isLoggedIn = !!jwtToken;
  }
}