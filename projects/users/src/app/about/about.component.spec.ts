import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { TasksService } from '../tasks/services/tasks.service';

const noop = () => {
  // No operations
};

const mockTaskService: TasksService = {
  greetings: noop,
} as TasksService;

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let service: TasksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutComponent],
      providers: [
        {
          provide: TasksService,
          useValue: mockTaskService,
        },
      ],
    }).compileComponents();
    service = TestBed.inject(TasksService);
    spyOn(service, 'greetings').and.callThrough();
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service method', () => {
    expect(service.greetings).toHaveBeenCalled();
  });
});
