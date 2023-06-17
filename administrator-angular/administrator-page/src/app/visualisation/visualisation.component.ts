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
  loginMessage: string | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const jwtToken = params.get('jwtToken');
      this.isLoggedIn = !!jwtToken;
      this.loginMessage = this.isLoggedIn ? 'Welcome, you are logged in.' : 'You are not logged in.';

      if (jwtToken) {
        this.getAggregatedData(jwtToken);
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