import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { PlaygroundComponent } from './home/playground/playground.component';
import { NotFoundComponent } from './home/not-found/not-found.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import {RoulettePlayerService} from './roulette-player.service';
import {HttpModule} from '@angular/http';

const approutes = [
  {path: '', component: HomeComponent, children: [
    { path: '', component: LoginComponent },
    { path: 'play', component: PlaygroundComponent }
  ]},
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PlaygroundComponent,
    NotFoundComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(approutes)
  ],
  providers: [RoulettePlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
