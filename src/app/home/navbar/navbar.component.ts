import { Component, OnInit } from '@angular/core';
import {RoulettePlayerService} from '../../roulette-player.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(protected roulettePlayer: RoulettePlayerService, private router: Router) { }

  ngOnInit() {
  }
  logout() {
    this.roulettePlayer.logout()
    this.router.navigate(['']);
  }
}
