import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable()
export class GameCountsService {
  constructor(private http: HttpClient, private dataService: DataService) {}

  getGameCountsPerDay(jwtToken: string) {
    const apiHeaders = this.dataService.createAPIHeaders(jwtToken);

    return this.http.get('http://localhost:8000/api/admin/dates', { headers: apiHeaders });
  }
}