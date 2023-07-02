import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisualisationComponent } from './components/visualisation/visualisation.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'visualisation', component: VisualisationComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
