import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ProfileComponent } from './profile.component';

const noop = () => {
  // No operations
};

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should respond to user click', () => {
    component.handleProfile = noop;
    spyOn(component, 'handleProfile');
    const svgDebug = debugElement.query(By.css('svg'));
    svgDebug.triggerEventHandler('click');
    expect(component.handleProfile).toHaveBeenCalled();
  });
});
