import { Component, OnInit } from '@angular/core';
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
          console.log('Aggregated Data:', this.aggregatedData);
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
  
  // ...

  getApiWithHighestAantal(): string | null {
    // if (this.aggregatedData && this.aggregatedData.length > 0) {
    //   let maxAantal = this.aggregatedData[0].aantal;
    //   let apiWithMaxAantal = this.aggregatedData[0].api;
  
    //   for (let i = 1; i < this.aggregatedData.length; i++) {
    //     if (this.aggregatedData[i].aantal > maxAantal) {
    //       maxAantal = this.aggregatedData[i].aantal;
    //       apiWithMaxAantal = this.aggregatedData[i].api;
    //     }
    //   }
  
    //   console.log(`API with highest aantal: ${apiWithMaxAantal}`);
    //   return apiWithMaxAantal;
    // }
    console.log("Aggregated data below:")
    console.log(this.aggregatedData)
    let data = this.aggregatedData
    data.sort((a: { aantal: number; }, b: { aantal: number; }) => b.aantal - a.aantal);
    return data[data.length - 1];
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
}