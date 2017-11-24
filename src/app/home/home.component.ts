import { Component, OnInit } from '@angular/core';
import {RoulettePlayerService} from '../roulette-player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private roulettePlayer: RoulettePlayerService) { }

  ngOnInit() {
  }
}
