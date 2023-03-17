// import { DebugElement } from '@angular/core';
// import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { LayoutComponent } from 'projects/core/src/lib/layout/layout.component';
import { UserService } from './services/user.service';

const noop = () => {
  // No operations
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  // let debugElement: DebugElement;
  let service: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, LayoutComponent, HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: UserService,
          useValue: {
            loadProfile: noop,
          },
        },
      ],
    }).compileComponents();

    service = TestBed.inject(UserService);
    spyOn(service, 'loadProfile').and.callThrough();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    // debugElement = fixture.debugElement;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should use service', () => {
    component.handleProfile();
    expect(service.loadProfile).toHaveBeenCalled();
  });
});
