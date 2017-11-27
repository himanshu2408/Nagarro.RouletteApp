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
    this.bets.forEach((bet) => {
      if (bet < 0) {
        return false;
      }
    });
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
    console.log('no of bets...', noOfBets);
    return noOfBets;
  }
  play() {
    const wantToPlay = confirm(`Are you sure you want to try your luck with your current selection?`);
    if (wantToPlay) {
      this.rouletteService.login(this.rouletteService.loggedInUser['CasinoId']);
      const validBets = this.noOfValidBets();
      if (this.betAmount > this.rouletteService.loggedInUser['AccountBalance']) {
        alert(`Sorry ${this.rouletteService.loggedInUser['Name']} \n\n You have insufficient balance for your selections...`);
      } else if (this.noNegativeBets()) {
        alert('you cannot enter negative amount.');
      } else if (validBets === 0) {
        alert('you must bet on a tier before start playing.');
      } else if (validBets > 1) {
        alert('you can only bet on one tier.');
      } else if (!(this.betAmount % 500 === 0)) {
        alert('Bet should be multiple of 500.');
      } else if (validBets === 1) {
        //console.log('bet amount: ', this.betAmount, 'winfactor: ', this.winFactor);
        const counter = Math.random();
        if (counter < 0.5) {
          alert(`The Roulette Result is: ${counter} \n\n YOU WON Rs. ${this.betAmount * this.winFactor}!!!`);
          this.rouletteService.updateAmount((this.betAmount * this.winFactor) - this.betAmount, true);
        } else {
          alert(`The Roulette Result is: ${counter} \n\n YOU LOST Rs. ${this.betAmount}!!! Please try again!`);
          this.rouletteService.updateAmount(this.betAmount, false);
        }
      }
      this.initializeVariables();
    }
  }
}
