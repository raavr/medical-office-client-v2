import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav-container',
  templateUrl: './sidenav-container.component.html',
  styleUrls: ['./sidenav-container.component.scss']
})
export class SidenavContainerComponent {
  @Input() showSidenav: boolean;
  @Input() loggedIn: boolean;
  @Output() closeSidenav = new EventEmitter<any>();
}
