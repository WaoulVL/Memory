import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisualisationComponent } from './components/visualisation/visualisation.component';
import { LoginComponent } from './components/login/login.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { PlayersOverviewComponent } from './components/players-overview/players-overview.component';
import { ApiUsageOverviewComponent } from './components/api-usage-overview/api-usage-overview.component';
import { GameCountsComponent } from './components/game-counts/game-counts.component';

@NgModule({
  declarations: [
    AppComponent,
    VisualisationComponent,
    LoginComponent,
    StatisticsComponent,
    PlayersOverviewComponent,
    ApiUsageOverviewComponent,
    GameCountsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
