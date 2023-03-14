import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { User } from '../models/user.model';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let debugElement: DebugElement;

  const mockUser: User = {
    id: 1,
    firstName: '',
    surname: '',
    isAdmin: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.user = mockUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update a user', () => {
    // Arrange
    spyOn(component, 'handleChange').and.callThrough();
    component.user.isAdmin = false;
    component.changed.subscribe((user) => {
      component.user = user;
      expect(component.user.isAdmin).toBeTrue();
    });
    const check = debugElement.query(By.css('input'));
    // Act
    check.triggerEventHandler('change');
    fixture.detectChanges();
    // Assert
    expect(component.handleChange).toHaveBeenCalled();
  });

  it('should delete a user', () => {
    // Arrange
    let deletedId = 0;
    component.user.id = 1;
    spyOn(component, 'handleDelete').and.callThrough();
    const deleteButton = debugElement.query(By.css('button'));
    component.deleted.subscribe((id) => {
      deletedId = id;
      expect(deletedId).toBe(1);
    });
    // Act
    deleteButton.triggerEventHandler('click');
    fixture.detectChanges();
    // Assert
    expect(component.handleDelete).toHaveBeenCalled();
  });
});
