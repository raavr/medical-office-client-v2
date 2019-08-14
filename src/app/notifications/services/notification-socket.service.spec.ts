import { TestBed } from '@angular/core/testing';
import { NotificationSocketService } from './notification-socket.service';
import * as socketIo from 'socket.io-client';

//@TODO: fix socketIo mocking
describe('NotificationSocketService', () => {
  let service: NotificationSocketService;
  let mockSocketIo = { emit: () => {}, on: () => {}, disconnect: () => {} };
  
  beforeEach(() => {
    service = TestBed.get(NotificationSocketService);
    // spyOn(socketIo, 'default').and.returnValue(mockSocketIo);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  // it('should call socketIo.on and socketIo.emit methods', () => {
  //   spyOn(mockSocketIo, 'on');
  //   spyOn(mockSocketIo, 'emit');
  //   service.init();

  //   expect(mockSocketIo.on).toHaveBeenCalled();
  // });
});
