import { Component, OnInit } from '@angular/core';
import {RoulettePlayerService} from '../../roulette-player.service';
import {Router} from "@angular/router";
import {uniqueByName} from "@angular/language-service/src/utils";
import {log} from "util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private roulettePlayer: RoulettePlayerService, private router: Router) { }
  showError = false;
  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user'))['CasinoId']) {
        this.router.navigate(['play']);
        this.roulettePlayer.loggedInUser = JSON.parse(localStorage.getItem('user'));
    }
    this.roulettePlayer.loggedIn.subscribe((loggedInUser) => {
      if (loggedInUser) {
        this.router.navigate(['play']);
      } else {
        this.showError = true;
      }

    });
  }
  login (uniqueId) {
    this.roulettePlayer.login(uniqueId);
  }
}
