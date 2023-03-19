import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { ControlsComponent } from 'projects/core/src/lib/controls/controls.component';
import { UserRepoService } from '../../services/user.repo.service';

const mockService: UserRepoService = {
  sendLoginData: () => of({}),
} as unknown as UserRepoService;

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;
  let service: UserRepoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the 4 inputs in the form', () => {
    const debugInputs = debugElement.queryAll(By.css('input'));
    expect(debugInputs.length).toBe(2);
  });

  it('should call the service method for login when all data are OK', () => {
    spyOn(service, 'sendLoginData').and.callThrough();
    component.form.value.email = 'test';
    component.form.value.passwd = '1234';
    const debugForm = debugElement.query(By.css('form'));
    debugForm.triggerEventHandler('submit');
    expect(service.sendLoginData).toHaveBeenCalled();
  });

  it('should NOT call the service method for register when all data NOT are OK', () => {
    spyOn(service, 'sendLoginData').and.callThrough();
    component.form.value.email = 'test';
    component.form.value.passwd = '';
    const debugForm = debugElement.query(By.css('form'));
    debugForm.triggerEventHandler('submit');
    expect(service.sendLoginData).not.toHaveBeenCalled();
  });
});
