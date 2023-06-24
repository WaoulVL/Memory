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

  getPlayersOverview(jwtToken: string) {
    const apiHeaders = this.createAPIHeaders(jwtToken);
    return this.http.get('http://localhost:8000/api/admin/players', { headers: apiHeaders });
  }

  getGameCountsPerDay(jwtToken: string) {
    const apiHeaders = this.createAPIHeaders(jwtToken);
    return this.http.get('http://localhost:8000/api/admin/dates', { headers: apiHeaders });
  }

  getApiWithHighestAantal(aggregatedData: any): string | null {
    let apiData = aggregatedData[2];
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

  sortAggregatedData(aggregatedData: any) {
    if (aggregatedData && aggregatedData[2]) {
      aggregatedData[2].sort((a: any, b: any) => b.aantal - a.aantal);
    }
  }
}