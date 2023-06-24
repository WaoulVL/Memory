import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AggregatedDataService {
  constructor(private http: HttpClient) {}

  getAggregatedData(jwtToken: string) {
    const apiHeaders = this.createAPIHeaders(jwtToken);

    return this.http.get('http://localhost:8000/api/admin/aggregate', { headers: apiHeaders });
  }

  private createAPIHeaders(jwtToken: string | null): { 'Content-Type': string; Authorization?: string } {
    const headers: { 'Content-Type': string; Authorization?: string } = {
        'Content-Type': 'application/json'
      };
  
      if (jwtToken) {
        headers['Authorization'] = `Bearer ${jwtToken}`;
      }
  
      return headers;
  }
}
