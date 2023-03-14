import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { AddComponent } from '../add/add.component';
import { CardComponent } from '../card/card.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TasksService } from '../services/tasks.service';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

const noop = () => {
  // No operations
};

const mockTask: Task = {
  id: 1,
  title: 'Test title',
  owner: 'Test owner',
  isCompleted: false,
};
const mockTasks: Task[] = [mockTask];

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let debugElement: DebugElement;
  let mockTaskService: TasksService;

  beforeEach(async () => {
    mockTaskService = {
      greetings: noop,
      handleAdd: noop,
      tasks$: new BehaviorSubject([...mockTasks]),
    };

    await TestBed.configureTestingModule({
      declarations: [ListComponent, AddComponent, CardComponent],
      providers: [
        {
          provide: TasksService,
          useValue: mockTaskService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should start with an empty 'tasks' array`, () => {
    // Test component implementation: constructor
    expect(component.tasks.length).toEqual(0);
  });

  it(`should load a 2 items 'tasks' array`, async () => {
    // Test component implementation: ngOnInit
    fixture.detectChanges();
    expect(component.tasks.length).toEqual(1);
  });

  it('should render a title', () => {
    // Test component render
    fixture.detectChanges();
    // HTML based mode
    const rendered = fixture.nativeElement as HTMLElement;
    expect(rendered.querySelector('h2')?.textContent?.toLowerCase()).toContain(
      'tareas'
    );
    // Angular based mode
    const header: HTMLHeadElement = debugElement.query(
      By.css('h2')
    ).nativeElement;
    expect(header.textContent?.toLowerCase()).toContain('tareas');
  });

  it('should add new task to the array', () => {
    fixture.detectChanges();
    component.handleAdd({} as Task);
    expect(component.tasks.length).toBe(2);
  });

  it('should update a task from the array', () => {
    fixture.detectChanges();
    component.handleAdd({} as Task);
    component.handleChange({
      id: 1,
      isCompleted: true,
    } as Task);
    expect(component.tasks.length).toBe(2);
    expect(component.tasks[0].isCompleted).toBeTrue();
  });

  it('should delete a task from the array', () => {
    fixture.detectChanges();
    component.handleDelete(1);
    expect(component.tasks.length).toBe(0);
  });
});
