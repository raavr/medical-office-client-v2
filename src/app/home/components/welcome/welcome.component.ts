import { Component, Input } from '@angular/core';
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  @Input() authUser: User;
  @Input() notificationCounter: number;

  counterTextMapping: { [k: string]: string } = {
    '=0': 'nieprzeczytanych powiadomień',
    '=1': 'nieprzeczytane powiadomienie',
    '=2': 'nieprzeczytane powiadomienia',
    '=3': 'nieprzeczytane powiadomienia',
    '=4': 'nieprzeczytane powiadomienia',
    'other': 'nieprzeczytanych powiadomień',
  };
}
