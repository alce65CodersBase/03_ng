import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { TasksService } from '../tasks/services/tasks.service';
import { Task } from '../tasks/models/task.model';

const mockTask: Task = {
  id: 1,
  title: 'Test title',
  owner: 'Test owner',
  isCompleted: false,
};
const mockTasks: Task[] = [mockTask];

const noop = () => {
  // No operations
};

const mockTaskService: TasksService = {
  greetings: noop,
  tasks$: new BehaviorSubject([...mockTasks]),
} as TasksService;

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugElement: DebugElement;
  let service: TasksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {
          provide: TasksService,
          useValue: mockTaskService,
        },
      ],
    }).compileComponents();
    service = TestBed.inject(TasksService);
    spyOn(service, 'greetings').and.callThrough();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service method', () => {
    expect(service.greetings).toHaveBeenCalled();
  });

  it('should render the data of the service', () => {
    const pElement: HTMLParagraphElement = debugElement.query(
      By.css('p')
    ).nativeElement;
    expect(pElement.innerText).toContain(String(mockTasks.length));
  });
});
