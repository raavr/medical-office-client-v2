import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let mockToken = 'some_token';
  let mockStorage;
  let service: TokenService;

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    const storage = {};
    mockStorage = {
      getItem(key: string) {
        return storage[key] || null;
      },
      setItem(key: string, value: string) {
        storage[key] = value;
      },
      removeItem(key: string) {
        delete storage[key]
      }
    }
  });

  beforeEach(() => {
    service = TestBed.get(TokenService);
    spyOn(localStorage, 'getItem').and.callFake(mockStorage.getItem)
    spyOn(localStorage, 'setItem').and.callFake(mockStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockStorage.removeItem);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call localStorage.getItem with a default key', () => {
    service.getToken();
    expect(localStorage.getItem).toHaveBeenCalledWith('access_token');
  });

  it('should return a token from localStorage', () => {
    mockStorage.setItem('access_token', mockToken);
    expect(service.getToken()).toEqual(localStorage.getItem('access_token'));
  });

  it('should store the token in localStorage', () => {
      service.setToken(mockToken);
      expect(localStorage.getItem('access_token')).toEqual(mockToken);
  });

  it('should remove a token', () => {
    mockStorage.setItem('access_token', mockToken);
    expect(localStorage.getItem('access_token')).toEqual(mockToken);
    service.removeToken();
    expect(localStorage.getItem('access_token')).toEqual(null);
  });
});
