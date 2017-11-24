import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RoulettePlayerService} from "../../roulette-player.service";

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  firstTwelve: number = 0;
  secondTwelve: number = 0;
  thirdTwelve: number = 0;
  zero: number = 0;
  oneToEighteen: number = 0;
  ninteenToThirtySix: number = 0;
  even: number = 0;
  odd: number = 0;

  constructor(private router: Router, private rouletteService: RoulettePlayerService) { }
  ngOnInit() {
    if (!JSON.parse(localStorage.getItem('user'))) {
      this.router.navigate(['']);
    } else {
      this.rouletteService.loggedInUser = JSON.parse(localStorage.getItem('user'));
    }
  }
  noNegativeBets(): boolean {
    return (this.firstTwelve >= 0 && this.secondTwelve >= 0
            && this.thirdTwelve >= 0 && this.zero >= 0
            && this.oneToEighteen >= 0 && this.ninteenToThirtySix >= 0
            && this.even >= 0 && this.odd >= 0);
  }
  noOfValidBets(): number {
    let noOfBets = 0;
    if (this.firstTwelve > 0 && this.firstTwelve % 500 === 0) {
      noOfBets++;
    }
    if (this.secondTwelve > 0 && this.secondTwelve % 500 === 0) {
      noOfBets++;
    }
    if (this.thirdTwelve > 0 && this.thirdTwelve % 500 === 0) {
      noOfBets++;
    }
    if (this.zero > 0 && this.zero % 500 === 0) {
      noOfBets++;
    }
    if (this.oneToEighteen > 0 && this.oneToEighteen % 500 === 0) {
      noOfBets++;
    }
    if (this.ninteenToThirtySix > 0 && this.ninteenToThirtySix % 500 === 0) {
      noOfBets++;
    }
    if (this.even > 0 && this.even % 500 === 0) {
      noOfBets++;
    }
    if (this.odd > 0 && this.odd % 500 === 0) {
      noOfBets++;
    }
    return noOfBets;
  }
  play() {
    if (!this.noNegativeBets()) {
      console.error('you cannot enter negative amount.');
    }
    if (this.noOfValidBets() === 0) {
      console.error('you must bet a valid amount on a tier before start playing.');
    }
    if (this.noOfValidBets() > 1) {
      console.error('you can only bet on one tier.');
    }
    if (this.noNegativeBets() && this.noOfValidBets() === 1) {
      if (Math.random() < 0.5) {
        alert('YOU WON!!! Hurrayyyyy...!');
      } else {
        alert('YOU LOST!!! Please try again!');
      }
    }
  }
}
