import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuItem } from '../types/menu.item';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the received input', () => {
    const mockItems: MenuItem[] = [{ label: 'Test', path: 'Test' }];
    component.items = mockItems;
    fixture.detectChanges();
    const aElement: HTMLElement = debugElement.query(By.css('a')).nativeElement;
    expect(aElement.innerText).toBe(mockItems[0].label);
  });
});
