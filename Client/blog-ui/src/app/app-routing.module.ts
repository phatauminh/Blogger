import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './administrator/home/home.component';
import { GameComponent } from './administrator/game/game.component';
import { LoginComponent } from './administrator/login/login.component';
import { DashBoardComponent } from './administrator/dashboard/dashboard.component';
import { AuthGuardService } from './services/api-authorization/auth-guard.service';
import { AuthenticationTabGroupComponent } from './client/authentication-tab-group/authentication-tab-group.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'game',
    component: GameComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'dashboard',
    component: DashBoardComponent
  },
  {
    path: 'otaku/login',
    component: AuthenticationTabGroupComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
