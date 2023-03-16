import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the received input', () => {
    const mockInput = 'Test title';
    component.title = mockInput;
    fixture.detectChanges();
    const headerElement: HTMLHeadingElement = debugElement.query(
      By.css('h1')
    ).nativeElement;
    expect(headerElement.innerText).toBe(mockInput);
  });
});
