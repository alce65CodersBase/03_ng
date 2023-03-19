import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import { ControlsComponent } from 'projects/core/src/lib/controls/controls.component';
import { UserRepoService } from '../../services/user.repo.service';

const mockService: UserRepoService = {
  createRegister: () => of({}),
} as unknown as UserRepoService;

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let debugElement: DebugElement;
  let service: UserRepoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        ControlsComponent,
      ],
      providers: [
        {
          provide: UserRepoService,
          useValue: mockService,
        },
      ],
    }).compileComponents();

    service = TestBed.inject(UserRepoService);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the 4 inputs in the form', () => {
    const debugInputs = debugElement.queryAll(By.css('input'));
    expect(debugInputs.length).toBe(4);
  });

  it('should call the service method for register when all data are OK', () => {
    spyOn(service, 'createRegister').and.callThrough();
    component.form.value.firstName = 'test';
    component.form.value.surname = 'test';
    component.form.value.email = 'test';
    component.form.value.passwd = '1234';
    const debugForm = debugElement.query(By.css('form'));
    debugForm.triggerEventHandler('submit');
    expect(service.createRegister).toHaveBeenCalled();
  });

  it('should NOT call the service method for register when all data NOT are OK', () => {
    spyOn(service, 'createRegister');
    component.form.value.firstName = 'test';
    component.form.value.surname = 'test';
    component.form.value.email = 'test';
    component.form.value.passwd = '';
    const debugForm = debugElement.query(By.css('form'));
    debugForm.triggerEventHandler('submit');
    expect(service.createRegister).not.toHaveBeenCalled();
  });
});
