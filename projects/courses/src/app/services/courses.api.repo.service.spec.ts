import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ApiResponse, CoursesApiRepoService } from './courses.api.repo.service';
import { Course } from '../../models/courses';
import { environment } from '../../environments/environment';

describe('CoursesApiRepoService', () => {
  let service: CoursesApiRepoService;
  let httpClientMock: HttpTestingController;
  const url = environment.apiUrlBase + '/courses';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesApiRepoService],
    });
    service = TestBed.inject(CoursesApiRepoService);
    httpClientMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpClientMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadItems load all the data', () => {
    const mockCoursesData: Course[] = [];
    const mockApiResponse: ApiResponse = { results: mockCoursesData };

    service.loadItems().subscribe((data) => {
      expect(data).toEqual(mockCoursesData);
    });

    const req = httpClientMock.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(mockApiResponse);
  });

  it('loadItems return an http error and NOT load all the data', () => {
    const mockErrorResponse = {
      status: 400,
      statusText: 'Bad Request',
    };

    const errorMessage = 'Something bad happened; Error 400: Invalid data';

    service.loadItems().subscribe({
      next: (data) => data,
      error: (error) => {
        expect(error).toEqual(errorMessage);
      },
    });

    const req = httpClientMock.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush('Invalid data', mockErrorResponse);
  });

  it('loadItems throw an error and NOT load all the data', () => {
    const mockErrorResponse = {
      status: 0,
      statusText: '',
    };

    const errorMessage = `Something bad happened; Http failure response for ${environment.apiUrlBase}/courses: 0 `;

    service.loadItems().subscribe({
      next: (data) => data,
      error: (error) => {
        expect(error).toEqual(errorMessage);
      },
    });

    const req = httpClientMock.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush('Invalid data', mockErrorResponse);
  });

  it('getItem find the item searched', () => {
    const mockNewCourse: Course = { id: '1' } as Course;
    service.getItem('1').subscribe((data) => {
      expect(data).toEqual(mockNewCourse);
    });

    const req = httpClientMock.expectOne(url + '/1');
    expect(req.request.method).toEqual('GET');
    req.flush({ results: [mockNewCourse] });
  });

  it('createItem send the new item data', () => {
    const mockNewCourse: Course = {} as Course;
    service.createItem(mockNewCourse).subscribe((data) => {
      expect(data).toEqual(mockNewCourse);
    });

    const req = httpClientMock.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush({ results: [mockNewCourse] });
  });

  it('updateItem send the updated item data', () => {
    const mockNewCourse: Course = { id: '1' } as Course;
    service.updateItem(mockNewCourse).subscribe((data) => {
      expect(data).toEqual(mockNewCourse);
    });

    const req = httpClientMock.expectOne(url + '/1');
    expect(req.request.method).toEqual('PATCH');
    req.flush({ results: [mockNewCourse] });
  });

  it('deleteItem delete the selected item', () => {
    // const mockDeleteResponse = null;
    service.deleteItem('1').subscribe((data) => {
      expect(data).toEqual(undefined);
    });

    const req = httpClientMock.expectOne(url + '/1');
    expect(req.request.method).toEqual('DELETE');
    req.flush({ results: [] });
  });
});
