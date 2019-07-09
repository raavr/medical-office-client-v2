import { TestBed } from '@angular/core/testing';

import { BookVisitService } from './book-visit.service';
import { HttpClient } from '@angular/common/http';
import { ENDPOINT } from 'src/app/app.constant';

describe('BookVisitService', () => {
  let service: BookVisitService;
  let httpClient: HttpClient;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: {
            get: () => {},
            post: () => {}
          }
        }
      ]
    })
  );

  beforeEach(() => {
    service = TestBed.get(BookVisitService);
    httpClient = TestBed.get(HttpClient);
    spyOn(httpClient, 'get');
    spyOn(httpClient, 'post');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpClient.get with the specific URL and request params when getUnavailableDates method is called', () => {
    service.getUnavailableDates('1');

    expect(httpClient.get).toHaveBeenCalledWith(
      `${ENDPOINT}/api/unavailable_dates`,
      { params: { doctorId: '1' } }
    );
  });

  it('should call httpClient.get with the specific URL and request params equals null when getUnavailableDates method is called', () => {
    service.getUnavailableDates();

    expect(httpClient.get).toHaveBeenCalledWith(
      `${ENDPOINT}/api/unavailable_dates`,
      { params: null }
    );
  });

  it('should call httpClient.get with the specific URL and request params when getAvailableTimes method is called', () => {
    const data = { date: '22/07/2019', doctorId: '1' };
    service.getAvailableTimes(data);

    expect(httpClient.get).toHaveBeenCalledWith(
      `${ENDPOINT}/api/available_times`,
      { params: { ...data } }
    );
  });

  it('should call httpClient.get with the specific URL and request params containing only date prop when getAvailableTimes method is called', () => {
    const data = { date: '22/07/2019', doctorId: null };
    service.getAvailableTimes(data);

    expect(httpClient.get).toHaveBeenCalledWith(
      `${ENDPOINT}/api/available_times`,
      { params: { date: data.date } }
    );
  });

  it('should call httpClient.get with the specific URL and request params when getPatientsByName method is called', () => {
    const name = 'Test';
    service.getPatientsByName(name);

    expect(httpClient.get).toHaveBeenCalledWith(`${ENDPOINT}/api/patients`, {
      params: { name }
    });
  });

  it('should call httpClient.get with the specific URL when getDoctors method is called', () => {
    service.getDoctors();

    expect(httpClient.get).toHaveBeenCalledWith(`${ENDPOINT}/api/doctors`);
  });

  it('should call httpClient.get with the specific URL when bookVisit method is called', () => {
    const reservation = {
      date: '22/07/2018',
      time: '11:30',
      userId: '1'
    };
    service.bookVisit(reservation);

    expect(httpClient.post).toHaveBeenCalledWith(
      `${ENDPOINT}/api/visits`,
      reservation
    );
  });
});
