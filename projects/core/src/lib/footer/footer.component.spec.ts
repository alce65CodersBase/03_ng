import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the received input', () => {
    const mockInput = 'Test brand';
    component.brand = mockInput;
    fixture.detectChanges();
    const addressElement: HTMLElement = debugElement.query(
      By.css('address')
    ).nativeElement;
    expect(addressElement.innerText).toBe(mockInput);
  });
});
