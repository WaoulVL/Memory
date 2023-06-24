import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['./visualisation.component.css']
})
export class VisualisationComponent implements OnInit {
  isLoggedIn = false;
  aggregatedData: any;
  playerOverview: any;
  gameCount: any;
  loginMessage: string | undefined;

  @Input() inputData: any; 

  @Output() dataEvent = new EventEmitter<any>(); // Example


  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const jwtToken = params.get('jwtToken');
      this.isLoggedIn = !!jwtToken;
      this.loginMessage = this.isLoggedIn ? 'Welcome, you are logged in.' : 'You are not logged in.';

      if (jwtToken) {
        this.getAggregatedData(jwtToken);
        this.getPlayersOverview(jwtToken);
        this.getGameCountsPerDay(jwtToken);
      }
    });
  }

  getAggregatedData(jwtToken: string) {
    const apiHeaders = this.createAPIHeaders(jwtToken);

    this.http.get('http://localhost:8000/api/admin/aggregate', { headers: apiHeaders })
      .subscribe(
        (response: any) => {
          this.aggregatedData = response;
          this.sortAggregatedData();
          console.log('Aggregated Data:', this.aggregatedData);
          
          const chosenApi = this.getApiWithHighestAantal();
          console.log('Chosen API:', chosenApi);
        },
        (error: any) => {
          console.error('Error fetching aggregated data:', error);
        }
      );
  }

  getPlayersOverview(jwtToken: string) {
    const apiHeaders = this.createAPIHeaders(jwtToken);

    this.http.get('http://localhost:8000/api/admin/players', { headers: apiHeaders })
      .subscribe(
        (response: any) => {
          this.playerOverview = response
          console.log('Players Overview:', this.playerOverview);
          // Handle the players' overview data here
        },
        (error: any) => {
          console.error('Error fetching players overview:', error);
          // Handle the error here
        }
      );
  }

  getGameCountsPerDay(jwtToken: string) {
    const apiHeaders = this.createAPIHeaders(jwtToken);

    this.http.get('http://localhost:8000/api/admin/dates', { headers: apiHeaders })
      .subscribe(
        (response: any) => {
          this.gameCount = response
          console.log('Game Counts per Day:', this.gameCount);
          // Handle the game counts per day data here
        },
        (error: any) => {
          console.error('Error fetching game counts per day:', error);
          // Handle the error here
        }
      );
  }

  getApiWithHighestAantal(): string | null {
    let apiData = this.aggregatedData[2]
    if (apiData && apiData.length > 0) {
      let maxAantal = apiData[0].aantal;
      let apiWithMaxAantal = apiData[0].api;

      for (let i = 1; i < apiData.length; i++) {
        if (apiData[i].aantal > maxAantal) {
          maxAantal = apiData[i].aantal;
          apiWithMaxAantal = apiData[i].api;
        }
      }

      console.log(`API with highest aantal: ${apiWithMaxAantal}`);
      return apiWithMaxAantal;
    }

    return null;
  }

  createAPIHeaders(jwtToken: string | null): { 'Content-Type': string; Authorization?: string } {
    const headers: { 'Content-Type': string; Authorization?: string } = {
      'Content-Type': 'application/json'
    };

    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    }

    return headers;
  }

  sortAggregatedData() {
    if (this.aggregatedData && this.aggregatedData[2]) {
      this.aggregatedData[2].sort((a: any, b: any) => b.aantal - a.aantal);
    }
  }

  sendDataToParent() {
    this.dataEvent.emit('Data to be sent to parent'); // Emit the event with data
  }
}
