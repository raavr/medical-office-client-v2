import socketIo from 'socket.io-client';
import { WS_ENDPOINT } from '../../app.constant';
import { TOKEN_NAME } from 'src/app/auth/constants/auth.constant';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationSocketService {
  private socket: any;
  notificationEvent$ = new EventEmitter<number>();

  private initEvents() {
    this.socket.emit('join', localStorage.getItem(TOKEN_NAME));
    this.socket.on('count', count => this.notificationEvent$.emit(count));
    this.socket.on('exception', () => this.disconnect());
  }

  init() {
    if (!this.socket) {
      this.socket = socketIo(WS_ENDPOINT);
    }
    this.initEvents();
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}
