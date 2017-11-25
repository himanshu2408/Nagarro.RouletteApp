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
  firstTwelve: number = 0;
  secondTwelve: number = 0;
  thirdTwelve: number = 0;
  zero: number = 0;
  oneToEighteen: number = 0;
  nineteenToThirtySix: number = 0;
  even: number = 0;
  odd: number = 0;
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
    return (this.firstTwelve >= 0 && this.secondTwelve >= 0
            && this.thirdTwelve >= 0 && this.zero >= 0
            && this.oneToEighteen >= 0 && this.nineteenToThirtySix >= 0
            && this.even >= 0 && this.odd >= 0);
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
    this.rouletteService.login(this.rouletteService.loggedInUser['CasinoId']);
    const validBets = this.noOfValidBets();
    if (this.betAmount > this.rouletteService.loggedInUser['AccountBalance']) {
      alert('You dont have enough balance. Please Recharge.');
    } else if (!this.noNegativeBets()) {
      alert('you cannot enter negative amount.');
    } else if (validBets === 0) {
      alert('you must bet on a tier before start playing.');
    } else if (validBets > 1) {
      alert('you can only bet on one tier.');
    } else if (!(this.betAmount % 500 === 0)) {
      alert('Bet should be multiple of 500.');
    } else if (validBets === 1) {
      console.log('bet amount: ', this.betAmount, 'winfactor: ', this.winFactor);
      if (Math.random() < 0.5) {
        alert(`YOU WON ${this.betAmount * this.winFactor}!!! Hurrayyyyy...!`);
        this.rouletteService.updateAmount(this.betAmount * this.winFactor, true);
      } else {
        alert(`YOU LOST ${this.betAmount}!!! Please try again!`);
        this.rouletteService.updateAmount(this.betAmount, false);
      }
    }
    this.initializeVariables();
  }
}
