import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { HomeComponent } from './administrator/home/home.component';
import { GameComponent } from './administrator/game/game.component';
import { LoginComponent } from './administrator/login/login.component';
import { OtakuLoginComponent } from './client/otaku-login/otaku-login.component';
import { OtakuHomeComponent } from './client/otaku-home/otaku-home.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthenticationTabGroupComponent } from './client/authentication-tab-group/authentication-tab-group.component';
import { OtakuRegisterComponent } from './client/otaku-register/otaku-register.component';
import { DashBoardComponent } from './administrator/dashboard/dashboard.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { DetailDialogComponent } from './administrator/dialog/detail-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    LoginComponent,
    OtakuLoginComponent,
    OtakuHomeComponent,
    AuthenticationTabGroupComponent,
    OtakuRegisterComponent,
    DashBoardComponent,
    DetailDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-stevenau.us.auth0.com',
      clientId: 'rMVxVp0SGboMyAv4Bz24EYsag2Sqxrjj'
    }),
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
