import { TestBed } from '@angular/core/testing';

import { CoursesRepoService } from './courses.repo.service';

describe('CoursesRepoService', () => {
  let service: CoursesRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
