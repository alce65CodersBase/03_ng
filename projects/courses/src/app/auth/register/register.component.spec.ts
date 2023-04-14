import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { CoreModule } from '../../core/core.module';
import { AuthService } from '../../services/auth.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [HttpClientModule, ReactiveFormsModule, CoreModule],
      providers: [{ provide: AuthService, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should include a file in the form data', () => {
    spyOn(component, 'handleFile').and.callThrough();
    const debugForm = debugElement.query(By.css('sdi-file-input'));
    debugForm.triggerEventHandler('fileEvent');
    fixture.detectChanges();
    expect(component.handleFile).toHaveBeenCalled();
  });

  it('should send form data', () => {
    spyOn(component, 'handleSubmit').and.callThrough();
    const debugForm = debugElement.query(By.css('form'));
    debugForm.triggerEventHandler('submit');
    fixture.detectChanges();
    expect(component.handleSubmit).toHaveBeenCalled();
  });
});
