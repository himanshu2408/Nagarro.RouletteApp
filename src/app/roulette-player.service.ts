import { Injectable, Output, EventEmitter } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RoulettePlayerService {
  @Output() loggedIn: EventEmitter<Object> = new EventEmitter<Object>();
  loggedInUser: Object;
  baseURL: string = 'http://localhost:57961/api/roulette/';
  constructor(private http: Http) { }
  login(uniqueId) {
    console.log('from service: ', uniqueId);
    this.http.get(`${this.baseURL}GetRoulettePlayer?id=${uniqueId}`)
      .map(res => res.json())
      .subscribe((user) => {
        this.loggedInUser = user;
        if (this.loggedInUser) {
          localStorage.setItem('user', JSON.stringify(this.loggedInUser));
        }
        this.loggedIn.emit(this.loggedInUser);
      });
  }
  logout() {
    this.loggedInUser = null;
    localStorage.removeItem('user');
  }
  isLoggedIn(): boolean {
    if (localStorage.getItem('user')) {
      return true;
    }
    return false;
  }
}
