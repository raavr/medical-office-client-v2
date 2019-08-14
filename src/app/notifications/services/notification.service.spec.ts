import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ENDPOINT } from 'src/app/app.constant';
import { NotificationService } from './notification.service';
import { VisitStatus } from 'src/app/visits/models/visit';

describe('NotificationService', () => {
  let service: NotificationService;
  let httpClient: HttpClient;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: {
            get: () => {},
            put: () => {}
          }
        }
      ]
    })
  );

  beforeEach(() => {
    service = TestBed.get(NotificationService);
    httpClient = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpClient.get with the specific URL and params', () => {
    spyOn(httpClient, 'get');
    service.getNotifications();

    expect(httpClient.get).toHaveBeenCalledWith(
      `${ENDPOINT}/api/notifications`
    );
  });

  it('should call httpClient.put with the specific URL and params when service.markAsRead is called', () => {
    spyOn(httpClient, 'put');
    service.markAsRead({
      createDate: '2019-08-13T07:30:00.000Z',
      description: 'Zapis',
      id: 124,
      status: VisitStatus.CANCELED,
      visitDate: '2019-08-13T08:30:00.000Z',
      doctor: {
        id: '1',
        name: 'John',
        surname: 'Doe'
      },
      rejectReason: 'Rejected',
      notification: { id: 111, status: 'read', type: 'danger' }
    });

    expect(httpClient.put).toHaveBeenCalledWith(
      `${ENDPOINT}/api/notifications/`,
      { notificationId: 111 }
    );
  });

  it('should call httpClient.put with the specific URL and params when service.markAllAsRead is called', () => {
    spyOn(httpClient, 'put');
    service.markAllAsRead();

    expect(httpClient.put).toHaveBeenCalledWith(
      `${ENDPOINT}/api/notifications`,
      {}
    );
  });
});
