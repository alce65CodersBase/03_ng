import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material.module';
import { RegisterComponent } from './register/register.component';
import { CoreModule } from '../core/core.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, RegisterComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModule,
        CoreModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click for select a lesson', () => {
    spyOn(component, 'selectLesson').and.callThrough();
    const debugButtons = debugElement.queryAll(By.css('[role="button"]'));
    debugButtons[0].triggerEventHandler('click');
    expect(component.selectLesson).toHaveBeenCalled();
  });
});
