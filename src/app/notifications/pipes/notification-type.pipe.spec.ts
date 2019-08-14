import { NotificationTypePipe } from './notification-type.pipe';

describe('NotificationTypePipe', () => {
  it('create an instance', () => {
    const pipe = new NotificationTypePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return "zaakceptowana"', () => {
    const pipe = new NotificationTypePipe();
    expect(pipe.transform('success')).toBe("zaakceptowana");
  });

  it('should return "odrzucona"', () => {
    const pipe = new NotificationTypePipe();
    expect(pipe.transform('danger')).toBe("odrzucona");
  });
  
  it('should return "undefined"', () => {
    const pipe = new NotificationTypePipe();
    expect(pipe.transform('anything')).toBe(undefined);
  });
});
