import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable()
export class PlayersOverviewService {
  constructor(private http: HttpClient, private dataService: DataService) {}

  getPlayersOverview(jwtToken: string) {
    const apiHeaders = this.dataService.createAPIHeaders(jwtToken);

    return this.http.get('http://localhost:8000/api/admin/players', { headers: apiHeaders });
  }
}