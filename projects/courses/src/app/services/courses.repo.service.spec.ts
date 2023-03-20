import { TestBed } from '@angular/core/testing';
import { CoursesRepoService } from './courses.repo.service';
import { Course } from '../../models/courses';
describe('CoursesRepoService', () => {
  let service: CoursesRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return courses', () => {
    service.getCoursesMock().subscribe((data) => {
      expect(data).toBeInstanceOf(Array);
      expect(typeof data[0].title).toBe('string');
    });
  });

  it('should return lessons', () => {
    service.getLessonsMock().subscribe((data) => {
      expect(data).toBeInstanceOf(Array);
      expect(typeof data[0].title).toBe('string');
    });
  });
});
