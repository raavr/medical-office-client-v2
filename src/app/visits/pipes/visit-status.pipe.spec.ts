import { VisitStatusPipe } from './visit-status.pipe';
import { VisitStatus } from '../models/visit';

describe('VisitStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new VisitStatusPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return "Zaakceptowano"', () => {
    const pipe = new VisitStatusPipe();
    expect(pipe.transform(VisitStatus.ACCEPTED)).toBe("Zaakceptowano");
  });

  it('should return "Odrzucono"', () => {
    const pipe = new VisitStatusPipe();
    expect(pipe.transform(VisitStatus.CANCELED)).toBe("Odrzucono");
  });
  
  it('should return "Oczekuje"', () => {
    const pipe = new VisitStatusPipe();
    expect(pipe.transform(VisitStatus.RESERVED)).toBe("Oczekuje");
  });

  it('should return "undefined"', () => {
    const pipe = new VisitStatusPipe();
    expect(pipe.transform('anything')).toBe(undefined);
  });
});
