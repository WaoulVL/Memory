import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

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

  @Output() dataEvent = new EventEmitter<any>();

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const jwtToken = params.get('jwtToken');
      this.isLoggedIn = !!jwtToken;
      this.loginMessage = this.isLoggedIn ? 'Welcome, you are logged in.' : 'You are not logged in.';

      if (jwtToken) {
        this.dataService.getAggregatedData(jwtToken)
          .subscribe(
            (response: any) => {
              this.aggregatedData = response;
              this.dataService.sortAggregatedData(this.aggregatedData);
              console.log('Aggregated Data:', this.aggregatedData);
              
              const chosenApi = this.dataService.getApiWithHighestAantal(this.aggregatedData);
              console.log('Most popular API:', chosenApi);
            }
          );

        this.dataService.getPlayersOverview(jwtToken)
          .subscribe(
            (response: any) => {
              this.playerOverview = response;
              console.log('Players Overview:', this.playerOverview);
              // Handle the players' overview data here
            }
          );

        this.dataService.getGameCountsPerDay(jwtToken)
          .subscribe(
            (response: any) => {
              this.gameCount = response;
              console.log('Game Counts per Day:', this.gameCount);
            }
          );
      }
    });
  }

  sendDataToParent() {
    this.dataEvent.emit('Data to be sent to parent'); // Emit the event with data
  }
}
