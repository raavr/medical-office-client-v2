import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div style="margin: 15px 0">
      <a class="link link--light-primary" routerLink="/dashboard/visits/current">Wizyty</a>
      <a class="link link--light-primary" [style.marginLeft.px]="5" routerLink="/dashboard/schedule">Grafik</a>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
