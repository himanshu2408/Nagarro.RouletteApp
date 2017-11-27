import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RoulettePlayerService} from "../../roulette-player.service";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  bets: Array<number>;
  betAmount: number;
  winFactor: number;
  winFactor1: number = 1.5;
  winFactor2: number = 10;
  winFactor3: number = 1.25;
  constructor(private router: Router, private rouletteService: RoulettePlayerService) {
    this.initializeVariables();
  }
  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user['CasinoId']) {
      this.rouletteService.login(user['CasinoId']);
    }
    if (!JSON.parse(localStorage.getItem('user'))) {
      this.router.navigate(['']);
    } else {
      this.rouletteService.loggedInUser = JSON.parse(localStorage.getItem('user'));
    }
  }
  initializeVariables() {
    this.bets = [0, 0, 0, 0, 0, 0, 0, 0];
    this.betAmount = 0;
    this.winFactor = 0;
  }
  noNegativeBets(): boolean {
    for (let i = 0; i < this.bets.length; i++ ) {
      if (this.bets[i] < 0) {
        return false;
      }
    }
    return true;
  }
  noOfValidBets(): number {
    let noOfBets = 0;
    this.bets.forEach((value, index) => {
      if (value > 0) {
        noOfBets++;
        this.betAmount = value;
        if (index < 3) {
          this.winFactor = 1.5;
        } else if (index === 3) {
          this.winFactor = 10;
        } else if (index > 3) {
          this.winFactor = 1.25;
        }
      }
    });
    if (noOfBets > 1) {
      this.initializeVariables();
    }
    return noOfBets;
  }
  play() {
    const wantToPlay = confirm(`Are you sure you want to try your luck with your current selection?`);
    if (wantToPlay) {
      this.rouletteService.login(this.rouletteService.loggedInUser['CasinoId']);
      const validBets = this.noOfValidBets();
      if (this.betAmount > this.rouletteService.loggedInUser['AccountBalance']) {
        alert(`Sorry ${this.rouletteService.loggedInUser['Name']} \n\n You have insufficient balance for your selections...`);
      } else if (!this.noNegativeBets()) {
        alert('you cannot enter negative amount.');
      } else if (validBets === 0) {
        alert('you must bet on a tier before start playing.');
      } else if (validBets > 1) {
        alert('you can only bet on one tier.');
      } else if (!(this.betAmount % 500 === 0)) {
        alert('Bet should be multiple of 500.');
      } else if (validBets === 1) {
        let win = false;
        const rolledNumber = (Math.floor(Math.random() * 100)) % 37;
        if (rolledNumber >= 1 && rolledNumber <= 12 && this.bets[0] > 0) {
          this.winFactor = this.winFactor1;
          win = true;
        } else if (rolledNumber >= 13 && rolledNumber <= 24 && this.bets[1] > 0) {
          this.winFactor = this.winFactor1;
          win = true;
        } else if (rolledNumber >= 25 && rolledNumber <= 36 && this.bets[2] > 0) {
          this.winFactor = this.winFactor1;
          win = true;
        } else if (rolledNumber === 0 && this.bets[3] > 0) {
          this.winFactor = this.winFactor2;
          win = true;
        } else if (rolledNumber >= 1 && rolledNumber <= 18 && this.bets[4] > 0) {
          this.winFactor = this.winFactor3;
          win = true;
        } else if (rolledNumber >= 19 && rolledNumber <= 36 && this.bets[5] > 0) {
          this.winFactor = this.winFactor3;
          win = true;
        } else if (rolledNumber % 2 === 1 && this.bets[6] > 0) {
          this.winFactor = this.winFactor3;
          win = true;
        } else if (rolledNumber % 2 === 0 && this.bets[7] > 0) {
          this.winFactor = this.winFactor3;
          win = true;
        }
        if (win === true) {
          alert(`The Roulette Result is: ${rolledNumber} \n\n YOU WON Rs. ${this.betAmount * this.winFactor}!!!`);
          this.rouletteService.updateAmount((this.betAmount * this.winFactor) - this.betAmount, win);
        } else {
          alert(`The Roulette Result is: ${rolledNumber} \n\n YOU LOST Rs. ${this.betAmount}!!! Please try again!`);
          this.rouletteService.updateAmount(this.betAmount, win);
        }
      }
      this.initializeVariables();
    }
  }
}
