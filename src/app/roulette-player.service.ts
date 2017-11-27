import { Injectable, Output, EventEmitter } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

const baseURL = 'http://localhost:57961/api/roulette/';
const header = {
  headers: new Headers({'content-type': 'application/json'})
};

@Injectable()
export class RoulettePlayerService {
  @Output() loggedIn: EventEmitter<Object> = new EventEmitter<Object>();
  loggedInUser: Object;
  constructor(private http: Http) { }
  login(uniqueId) {
    this.http.get(`${baseURL}GetRoulettePlayer?id=${uniqueId}`)
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
  updateAmount(amount, isWin) {
    if (isWin) {
      amount = this.loggedInUser['AccountBalance'] + amount;
    } else {
      amount = this.loggedInUser['AccountBalance'] - amount;
    }
    this.http.put(`${baseURL}UpdateAmount?id=${this.loggedInUser['CasinoId']}&amount=${amount}`, '', header)
      .map(res => res.json())
      .subscribe((updatedUser) => {
        this.loggedInUser = updatedUser;
        localStorage.setItem('user', JSON.stringify(this.loggedInUser));
      });
  }
}
