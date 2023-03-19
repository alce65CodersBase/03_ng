import { TestBed } from '@angular/core/testing';
import { HomeService } from './home.service';

describe('HomeService', () => {
  let service: HomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use greetings()', () => {
    console.log = jasmine.createSpy('log');
    service.greetings();
    expect(console.log).toHaveBeenCalledWith('Hola');
  });
});
