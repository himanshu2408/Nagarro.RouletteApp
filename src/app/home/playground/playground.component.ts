import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }
}
