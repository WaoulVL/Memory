import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getAggregatedData(jwtToken: string) {
    const apiHeaders = this.createAPIHeaders(jwtToken);
    return this.http.get('http://localhost:8000/api/admin/aggregate', { headers: apiHeaders });
  }

  sortAggregatedData(aggregatedData: any) {
    if (aggregatedData && aggregatedData[2]) {
      aggregatedData[2].sort((a: any, b: any) => b.aantal - a.aantal);
    }
  }

  getPlayersOverview(jwtToken: string) {
    const apiHeaders = this.createAPIHeaders(jwtToken);
    return this.http.get('http://localhost:8000/api/admin/players', { headers: apiHeaders });
  }

  getGameCountsPerDay(jwtToken: string) {
    const apiHeaders = this.createAPIHeaders(jwtToken);
    return this.http.get('http://localhost:8000/api/admin/dates', { headers: apiHeaders });
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