import { 
  Component, 
  Input, 
  Output, 
  EventEmitter 
} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  template: `
    <mat-sidenav #sidenav [opened]="open" (keydown.escape)="sidenav.close(); closeSidenav.emit()" disableClose>
      <mat-nav-list>
        <ng-content></ng-content>
      </mat-nav-list>
    </mat-sidenav>
  `,
  styles: [`
      mat-sidenav {
        width: 300px;
      }
  `]
})
export class SidenavComponent {
  @Input() open = false;
  @Output() closeSidenav = new EventEmitter();
}
